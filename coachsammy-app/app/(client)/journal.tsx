import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/theme';
import { FrauncesText } from '@/components/ui/FrauncesText';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { GoldButton } from '@/components/ui/GoldButton';
import { GhostButton } from '@/components/ui/GhostButton';
import { Toggle } from '@/components/ui/Toggle';
import { MoodPicker } from '@/components/client/MoodPicker';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';
import { sb } from '@/lib/supabase';
import type { DailyLog } from '@/lib/types';

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

type DayType = 'training' | 'rest';

export default function JournalScreen() {
  const { client } = useAuth();
  const toast = useToast();
  const [date] = useState(todayIso());
  const [log, setLog] = useState<DailyLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [more, setMore] = useState(false);

  // form
  const [dayType, setDayType] = useState<DayType>('training');
  const [weight, setWeight] = useState('');
  const [menuOk, setMenuOk] = useState(false);
  const [trainDone, setTrainDone] = useState(false);
  const [steps, setSteps] = useState('');
  const [mood, setMood] = useState<number | null>(null);
  const [cal, setCal] = useState('');
  const [prot, setProt] = useState('');
  const [carb, setCarb] = useState('');
  const [fat, setFat] = useState('');
  const [water, setWater] = useState('');
  const [sleep, setSleep] = useState('');
  const [hunger, setHunger] = useState('');
  const [energy, setEnergy] = useState('');
  const [notes, setNotes] = useState('');

  const load = useCallback(async () => {
    if (!client) return;
    setLoading(true);
    const { data } = await sb
      .from('daily_logs').select('*')
      .eq('client_id', client.id).eq('log_date', date).maybeSingle();
    const l = (data as DailyLog | null) || null;
    setLog(l);
    if (l) {
      setDayType((l.day_type as DayType) || 'training');
      setWeight(l.body_weight != null ? String(l.body_weight) : '');
      setMenuOk(!!l.menu_respected);
      setTrainDone(!!l.training_done);
      setSteps(l.steps != null ? String(l.steps) : '');
      setMood(l.mood_score ?? null);
      setCal(l.calories_eaten != null ? String(l.calories_eaten) : '');
      setProt(l.protein_eaten != null ? String(l.protein_eaten) : '');
      setCarb(l.carbs_eaten != null ? String(l.carbs_eaten) : '');
      setFat(l.fat_eaten != null ? String(l.fat_eaten) : '');
      setWater(l.water_ml != null ? String(l.water_ml) : '');
      setSleep(l.sleep_hours != null ? String(l.sleep_hours) : '');
      setHunger(l.hunger_score != null ? String(l.hunger_score) : '');
      setEnergy(l.energy_score != null ? String(l.energy_score) : '');
      setNotes(l.client_notes || '');
    }
    setLoading(false);
  }, [client, date]);

  useEffect(() => { load(); }, [load]);

  /** Autofill calories/macros from profile when menu is respected. */
  const onMenuToggle = (next: boolean) => {
    setMenuOk(next);
    if (!next || !client) return;
    const isTraining = dayType === 'training';
    const calT = isTraining
      ? (client.kcal_training || 2200)
      : (client.kcal_rest || Math.round((client.kcal_training || 2200) * 0.85));
    const protT = client.protein_g || 125;
    const carbT = isTraining ? (client.carbs_g || 180) : Math.round((client.carbs_g || 180) * 0.7);
    const fatT = client.fat_g || 60;
    if (!cal) setCal(String(calT));
    if (!prot) setProt(String(protT));
    if (!carb) setCarb(String(carbT));
    if (!fat) setFat(String(fatT));
    setMore(true);
  };

  const save = async () => {
    if (!client) return;
    setSaving(true);
    try {
      const weightNum = parseFloat(weight) || null;
      const calNum = parseInt(cal) || null;
      const calTarget = dayType === 'rest'
        ? (client.kcal_rest || Math.round((client.kcal_training || 2200) * 0.85))
        : (client.kcal_training || 2200);
      const payload: any = {
        client_id: client.id,
        log_date: date,
        day_type: dayType,
        menu_respected: menuOk,
        calories_eaten: calNum || (menuOk ? calTarget : null),
        protein_eaten: parseInt(prot) || null,
        carbs_eaten: parseInt(carb) || null,
        fat_eaten: parseInt(fat) || null,
        water_ml: parseInt(water) || null,
        body_weight: weightNum,
        steps: parseInt(steps) || null,
        training_done: trainDone,
        sleep_hours: parseFloat(sleep) || null,
        hunger_score: parseInt(hunger) || null,
        energy_score: parseInt(energy) || null,
        mood_score: mood,
        client_notes: notes.trim() || null,
      };
      const { error: dlErr } = await sb.from('daily_logs').upsert(payload, { onConflict: 'client_id,log_date' });
      if (dlErr) throw dlErr;

      // Mirror weight to weight_logs (one entry per day)
      if (weightNum) {
        const { data: existW } = await sb
          .from('weight_logs').select('id')
          .eq('client_id', client.id)
          .gte('logged_at', date + 'T00:00:00')
          .lte('logged_at', date + 'T23:59:59')
          .limit(1);
        if (existW && existW.length) {
          await sb.from('weight_logs').update({ weight: weightNum }).eq('id', (existW[0] as any).id);
        } else {
          await sb.from('weight_logs').insert({ client_id: client.id, weight: weightNum, logged_at: new Date().toISOString() });
        }
        // Mirror current_weight onto clients row
        await sb.from('clients').update({ current_weight: weightNum }).eq('id', client.id);
      }
      toast.show('Check-in enregistré', 'success');
      await load();
    } catch (e: any) {
      toast.show(e?.message || 'Erreur', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (!client || loading) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.center}><ActivityIndicator color={colors.gold} /></View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <EyebrowLabel>CHECK-IN DU JOUR</EyebrowLabel>
            <FrauncesText size={28} style={{ marginTop: 6 }}>{new Date(date + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</FrauncesText>
          </View>

          {/* Day type */}
          <View style={styles.row}>
            <Pressable onPress={() => setDayType('training')} style={[styles.pill, dayType === 'training' && styles.pillOn]}>
              <Text style={[styles.pillText, dayType === 'training' && styles.pillTextOn]}>💪 Training Day</Text>
            </Pressable>
            <Pressable onPress={() => setDayType('rest')} style={[styles.pill, dayType === 'rest' && styles.pillOn]}>
              <Text style={[styles.pillText, dayType === 'rest' && styles.pillTextOn]}>😴 Repos</Text>
            </Pressable>
          </View>

          {/* Weight */}
          <View style={styles.field}>
            <Text style={styles.label}>⚖️ Poids (kg)</Text>
            <TextInput
              value={weight}
              onChangeText={setWeight}
              placeholder="kg"
              placeholderTextColor={colors.textDim}
              keyboardType="decimal-pad"
              style={styles.input}
            />
          </View>

          {/* Menu respected */}
          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleLabel}>🍽 J'ai respecté mon menu</Text>
            </View>
            <Toggle value={menuOk} onChange={onMenuToggle} />
          </View>

          {/* Training done */}
          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleLabel}>🏋️ Entraînement complété</Text>
            </View>
            <Toggle value={trainDone} onChange={setTrainDone} />
          </View>

          {/* Steps */}
          <View style={styles.field}>
            <Text style={styles.label}>👟 Pas aujourd'hui</Text>
            <TextInput
              value={steps}
              onChangeText={setSteps}
              placeholder={String(client.step_goal || 8000)}
              placeholderTextColor={colors.textDim}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          {/* Mood */}
          <View style={styles.field}>
            <Text style={styles.label}>😊 Comment tu te sens aujourd'hui ?</Text>
            <MoodPicker value={mood} onChange={setMood} />
          </View>

          {/* More details toggle */}
          <Pressable onPress={() => setMore(!more)} style={styles.moreBtn}>
            <Text style={styles.moreBtnText}>{more ? 'Moins ↑' : 'Plus de détails →'}</Text>
          </Pressable>

          {more && (
            <View style={styles.moreSection}>
              <View style={styles.field}>
                <Text style={styles.label}>Calories (kcal)</Text>
                <TextInput value={cal} onChangeText={setCal} keyboardType="numeric" style={styles.input} placeholder={String(client.kcal_training || 2200)} placeholderTextColor={colors.textDim} />
              </View>
              <View style={styles.fieldRow}>
                <View style={[styles.field, { flex: 1 }]}>
                  <Text style={styles.label}>Protéines g</Text>
                  <TextInput value={prot} onChangeText={setProt} keyboardType="numeric" style={styles.input} placeholderTextColor={colors.textDim} />
                </View>
                <View style={[styles.field, { flex: 1 }]}>
                  <Text style={styles.label}>Glucides g</Text>
                  <TextInput value={carb} onChangeText={setCarb} keyboardType="numeric" style={styles.input} placeholderTextColor={colors.textDim} />
                </View>
              </View>
              <View style={styles.fieldRow}>
                <View style={[styles.field, { flex: 1 }]}>
                  <Text style={styles.label}>Lipides g</Text>
                  <TextInput value={fat} onChangeText={setFat} keyboardType="numeric" style={styles.input} placeholderTextColor={colors.textDim} />
                </View>
                <View style={[styles.field, { flex: 1 }]}>
                  <Text style={styles.label}>Eau (ml)</Text>
                  <TextInput value={water} onChangeText={setWater} keyboardType="numeric" style={styles.input} placeholderTextColor={colors.textDim} />
                </View>
              </View>
              <View style={styles.fieldRow}>
                <View style={[styles.field, { flex: 1 }]}>
                  <Text style={styles.label}>Sommeil (h)</Text>
                  <TextInput value={sleep} onChangeText={setSleep} keyboardType="decimal-pad" style={styles.input} placeholderTextColor={colors.textDim} />
                </View>
                <View style={[styles.field, { flex: 1 }]}>
                  <Text style={styles.label}>Faim (1-5)</Text>
                  <TextInput value={hunger} onChangeText={setHunger} keyboardType="numeric" style={styles.input} placeholderTextColor={colors.textDim} />
                </View>
                <View style={[styles.field, { flex: 1 }]}>
                  <Text style={styles.label}>Énergie (1-5)</Text>
                  <TextInput value={energy} onChangeText={setEnergy} keyboardType="numeric" style={styles.input} placeholderTextColor={colors.textDim} />
                </View>
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Notes du jour</Text>
                <TextInput
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
                  placeholder="Comment s'est passée ta journée ?"
                  placeholderTextColor={colors.textDim}
                />
              </View>
            </View>
          )}

          <View style={{ height: spacing.lg }} />
          <GoldButton
            label={saving ? 'Enregistrement…' : log ? '💾 Enregistrer les modifications' : '✅ Enregistrer le check-in'}
            loading={saving}
            onPress={save}
          />
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.lg, paddingBottom: 100 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { marginBottom: spacing.xl },
  row: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  pill: {
    flex: 1, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    alignItems: 'center',
  },
  pillOn: { backgroundColor: 'rgba(201,168,76,0.15)', borderColor: 'rgba(201,168,76,0.4)' },
  pillText: { color: colors.textMuted, fontSize: 14, fontWeight: '600' },
  pillTextOn: { color: colors.gold, fontWeight: '700' },
  field: { marginBottom: spacing.md },
  fieldRow: { flexDirection: 'row', gap: spacing.sm },
  label: {
    color: colors.gold, fontSize: 11, fontWeight: '700',
    letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    color: colors.white,
    fontSize: 15,
  },
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    paddingVertical: 14, paddingHorizontal: spacing.md,
    backgroundColor: colors.surface, borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    marginBottom: spacing.md,
  },
  toggleLabel: { color: colors.white, fontSize: 14, fontWeight: '500' },
  moreBtn: {
    alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 18,
    marginTop: spacing.sm,
  },
  moreBtnText: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  moreSection: { marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
});
