import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/theme';
import { FrauncesText } from '@/components/ui/FrauncesText';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { GoldPill } from '@/components/ui/GoldPill';
import { useAuth } from '@/hooks/useAuth';
import { sb } from '@/lib/supabase';
import type { TrainingSession, MealPlan } from '@/lib/types';

type PlanView = 'training' | 'nutrition' | 'overload' | 'steps' | 'exchange';
const VIEWS: { id: PlanView; label: string }[] = [
  { id: 'training', label: '💪 Entraînement' },
  { id: 'nutrition', label: '🥗 Nutrition' },
  { id: 'overload', label: '📊 Charges' },
  { id: 'steps', label: '👟 Pas' },
  { id: 'exchange', label: '🔄 Échange' },
];

export default function PlanScreen() {
  const { client } = useAuth();
  const [view, setView] = useState<PlanView>('training');
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!client) return;
    setLoading(true);
    const [{ data: sess }, { data: mp }] = await Promise.all([
      sb.from('training_sessions').select('*').eq('client_id', client.id).order('created_at'),
      sb.from('meal_plans').select('*').eq('client_id', client.id).order('created_at', { ascending: false }).limit(1),
    ]);
    setSessions((sess as TrainingSession[]) || []);
    setMealPlan(((mp as MealPlan[]) || [])[0] || null);
    setLoading(false);
  }, [client]);
  useEffect(() => { load(); }, [load]);

  if (!client) return <SafeAreaView style={styles.root}><View style={styles.center}><ActivityIndicator color={colors.gold} /></View></SafeAreaView>;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <EyebrowLabel>MON PLAN</EyebrowLabel>
        <FrauncesText size={30} style={{ marginTop: 6, marginBottom: spacing.lg }}>Programme & nutrition</FrauncesText>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
          {VIEWS.map((vv) => (
            <Pressable key={vv.id} onPress={() => setView(vv.id)} style={[styles.tab, view === vv.id && styles.tabOn]}>
              <Text style={[styles.tabText, view === vv.id && styles.tabTextOn]}>{vv.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {loading ? (
          <View style={styles.center}><ActivityIndicator color={colors.gold} /></View>
        ) : view === 'training' ? (
          <View>
            {sessions.length === 0 ? (
              <Text style={styles.empty}>Ton coach prépare tes séances. Reviens bientôt.</Text>
            ) : sessions.map((s, idx) => (
              <View key={s.id} style={styles.card}>
                <View style={styles.sessHdr}>
                  <View style={{ flex: 1 }}>
                    <FrauncesText size={18}>{s.name}</FrauncesText>
                    <Text style={styles.sessSub}>{s.type || '—'} · {(s.exercises || []).length} exercices</Text>
                  </View>
                </View>
                {(s.exercises || []).map((e: any, i: number) => (
                  <View key={i} style={styles.exRow}>
                    <Text style={styles.exName}>{e.n || e.name}</Text>
                    <GoldPill label={e.sets || e.s || '—'} />
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : view === 'nutrition' ? (
          <View style={styles.card}>
            {!mealPlan ? (
              <Text style={styles.empty}>Pas encore de plan nutritionnel.</Text>
            ) : (
              <Text style={styles.body}>{
                typeof mealPlan.plan_data === 'string'
                  ? mealPlan.plan_data
                  : mealPlan.plan_data?.raw_text || JSON.stringify(mealPlan.plan_data, null, 2)
              }</Text>
            )}
          </View>
        ) : (
          <View style={styles.card}><Text style={styles.empty}>Cette section arrive bientôt.</Text></View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.lg, paddingBottom: 100 },
  center: { padding: 40, alignItems: 'center' },
  tabsRow: { gap: spacing.sm, paddingVertical: spacing.md },
  tab: {
    paddingHorizontal: 14, paddingVertical: 9, borderRadius: 99,
    backgroundColor: colors.surface, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
  },
  tabOn: { backgroundColor: 'rgba(201,168,76,0.15)', borderColor: 'rgba(201,168,76,0.4)' },
  tabText: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  tabTextOn: { color: colors.gold, fontWeight: '700' },
  card: {
    backgroundColor: colors.surface, borderRadius: radius.xxl, padding: spacing.lg,
    marginBottom: spacing.md, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
  },
  sessHdr: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  sessSub: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  exRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border,
  },
  exName: { color: colors.white, fontSize: 14, fontWeight: '600', flex: 1, marginRight: 8 },
  empty: { color: colors.textMuted, fontSize: 13, textAlign: 'center', padding: spacing.lg, fontStyle: 'italic' },
  body: { color: colors.white, fontSize: 13, lineHeight: 20 },
});
