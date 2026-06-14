import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { fraunces, spacing, radius } from '@/constants/theme';
import { FrauncesText } from '@/components/ui/FrauncesText';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { useAuth } from '@/hooks/useAuth';
import { sb } from '@/lib/supabase';
import type { DailyLog, WeightLog } from '@/lib/types';
import { ProgressSparkline } from '@/components/client/ProgressSparkline';

interface TodayData {
  dlD: DailyLog | null;
  lw: number;
  wHist: WeightLog[];
  streak: number;
  weekDiet: number;
  weekTrain: number;
  weekSteps: number;
  weekLogged: number;
  weekDots: { log_date: string; menu_respected: boolean | null }[];
}

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function fetchToday(clientId: string, stepGoal: number): Promise<TodayData> {
  const todayISO = todayIso();
  const monday = new Date();
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  const wkISO = monday.toISOString().slice(0, 10);

  const [dlRes, wlLatestRes, wHistRes, wkLogsRes, streakRes] = await Promise.all([
    sb.from('daily_logs').select('*').eq('client_id', clientId).eq('log_date', todayISO).maybeSingle(),
    sb.from('weight_logs').select('weight').eq('client_id', clientId).order('logged_at', { ascending: false }).limit(1),
    sb.from('weight_logs').select('weight,logged_at').eq('client_id', clientId).order('logged_at', { ascending: true }).limit(60),
    sb.from('daily_logs').select('menu_respected,training_done,steps,log_date').eq('client_id', clientId).gte('log_date', wkISO),
    sb.from('daily_logs').select('log_date').eq('client_id', clientId).order('log_date', { ascending: false }).limit(30),
  ]);

  const dlD = (dlRes.data as DailyLog | null) || null;
  const lw = (wlLatestRes.data as any)?.[0]?.weight || 0;
  const wHist = (wHistRes.data as WeightLog[]) || [];
  const wk = (wkLogsRes.data as any[]) || [];
  const weekDiet = wk.filter((l) => l.menu_respected).length;
  const weekTrain = wk.filter((l) => l.training_done).length;
  const weekSteps = wk.filter((l) => (l.steps || 0) >= stepGoal * 0.9).length;
  const weekLogged = wk.length;
  // Streak — consecutive days from today backwards with any log
  const allDates = new Set(((streakRes.data as any[]) || []).map((l) => l.log_date));
  let streak = 0;
  for (let i = 0; i < 60; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    if (allDates.has(iso)) streak++;
    else if (i > 0) break;
  }
  return {
    dlD, lw, wHist, streak, weekDiet, weekTrain, weekSteps, weekLogged,
    weekDots: wk.map((l) => ({ log_date: l.log_date, menu_respected: l.menu_respected })),
  };
}

export default function TodayScreen() {
  const { client } = useAuth();
  const [data, setData] = useState<TodayData | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    if (!client) return;
    const stepGoal = client.step_goal || 8000;
    try {
      const d = await fetchToday(client.id, stepGoal);
      setData(d);
    } catch (e) {
      console.error('[today] load', e);
    }
  }, [client]);

  useEffect(() => { load(); }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  if (!client) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.center}><ActivityIndicator color={colors.gold} /></View>
      </SafeAreaView>
    );
  }
  if (!data) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.center}><ActivityIndicator color={colors.gold} /></View>
      </SafeAreaView>
    );
  }

  const firstName = (client.name || '').split(' ')[0];
  const todayLabel = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  const dateLabel = todayLabel.charAt(0).toUpperCase() + todayLabel.slice(1);
  const calTarget = client.kcal_training || 2200;
  const protTarget = client.protein_g || 125;
  const carbTarget = client.carbs_g || 180;
  const fatTarget = client.fat_g || 60;
  const lw = data.lw || client.current_weight || client.weight || 0;
  const startWeight = data.wHist[0]?.weight || client.start_weight || client.weight || lw;
  const goalWeight = client.goal_weight || client.target_weight || 0;
  const remaining = goalWeight && lw ? Math.abs(lw - goalWeight).toFixed(1) : null;
  const isLossGoal = goalWeight > 0 && goalWeight < startWeight;
  const onTrack = goalWeight > 0 ? (isLossGoal ? lw < startWeight : lw > startWeight) : true;

  const weekCompliance = data.weekLogged > 0
    ? Math.round((data.weekDiet + data.weekTrain + data.weekSteps) / (data.weekLogged * 3) * 100)
    : null;
  const compColor =
    weekCompliance === null ? colors.textMuted
    : weekCompliance >= 80 ? colors.emerald
    : weekCompliance >= 50 ? colors.amber
    : colors.rose;

  const logged = !!(data.dlD && (data.dlD.calories_eaten || data.dlD.body_weight || data.dlD.training_done));

  const remainingColor = remaining ? (onTrack ? colors.emerald : colors.rose) : colors.textMuted;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl tintColor={colors.gold} refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Top bar */}
        <View style={styles.topbar}>
          <View>
            <FrauncesText size={30}>Bonjour, <FrauncesText size={30} color={colors.gold}>{firstName}.</FrauncesText></FrauncesText>
            <Text style={styles.date}>{dateLabel}</Text>
          </View>
          <Pressable style={styles.bell} hitSlop={8}>
            <Ionicons name="notifications-outline" size={18} color={colors.white} />
          </Pressable>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCell}>
            <FrauncesText size={26} color={colors.gold}>{String(data.streak)}</FrauncesText>
            <Text style={styles.statLbl}>Série</Text>
          </View>
          <View style={styles.statCell}>
            <FrauncesText size={26}>{lw || '—'}</FrauncesText>
            <Text style={styles.statLbl}>Poids kg</Text>
          </View>
          <View style={styles.statCell}>
            <FrauncesText size={26} color={remainingColor}>{remaining || '—'}</FrauncesText>
            <Text style={styles.statLbl}>Restant kg</Text>
          </View>
        </View>

        {/* Compliance card */}
        {data.weekLogged > 0 && weekCompliance !== null && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <EyebrowLabel>COMPLIANCE CETTE SEMAINE</EyebrowLabel>
              <Text style={[fraunces(32, compColor), { lineHeight: 32 }]}>
                {weekCompliance}<Text style={{ fontSize: 14, color: colors.textMuted }}>%</Text>
              </Text>
            </View>
            <View style={styles.threeGrid}>
              <View style={styles.miniCell}>
                <FrauncesText size={20} color={data.weekDiet >= 5 ? colors.emerald : data.weekDiet >= 3 ? colors.amber : colors.rose}>{`${data.weekDiet}/7`}</FrauncesText>
                <Text style={styles.miniLbl}>🍽 Diète</Text>
              </View>
              <View style={styles.miniCell}>
                <FrauncesText size={20} color={data.weekTrain >= (client.weekly_training_target || 3) ? colors.emerald : data.weekTrain >= 1 ? colors.amber : colors.rose}>{`${data.weekTrain}/${client.weekly_training_target || 3}`}</FrauncesText>
                <Text style={styles.miniLbl}>💪 Séances</Text>
              </View>
              <View style={styles.miniCell}>
                <FrauncesText size={20} color={data.weekSteps >= 5 ? colors.emerald : data.weekSteps >= 3 ? colors.amber : colors.rose}>{`${data.weekSteps}/7`}</FrauncesText>
                <Text style={styles.miniLbl}>👟 Pas</Text>
              </View>
            </View>
          </View>
        )}

        {/* Calories card */}
        <View style={styles.card}>
          <EyebrowLabel>OBJECTIF DU JOUR</EyebrowLabel>
          <Text style={[fraunces(48, colors.white), { marginTop: spacing.sm, lineHeight: 48 }]}>
            {calTarget}<Text style={styles.calUnit}>kcal</Text>
          </Text>
          <Text style={styles.macros}>{`${protTarget}g protéines · ${carbTarget}g glucides · ${fatTarget}g lipides`}</Text>
        </View>

        {/* Progression chart */}
        <View style={styles.card}>
          <EyebrowLabel>PROGRESSION</EyebrowLabel>
          <View style={{ marginTop: spacing.md }}>
            <ProgressSparkline
              points={data.wHist.map((w) => ({ x: w.logged_at, y: Number(w.weight) }))}
              goalWeight={goalWeight}
            />
          </View>
        </View>

        {/* Check-in CTA */}
        <Pressable style={({ pressed }) => [styles.cta, pressed && { transform: [{ scale: 0.99 }] }]} onPress={() => router.push('/(client)/journal')}>
          <LinearGradient
            colors={logged ? ['rgba(74,222,128,0.08)', 'rgba(74,222,128,0.03)'] : ['rgba(201,168,76,0.1)', 'rgba(201,168,76,0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill as any}
          />
          <View style={[styles.ctaInner, { borderColor: logged ? 'rgba(74,222,128,0.25)' : 'rgba(201,168,76,0.25)' }]}>
            <View style={{ flex: 1 }}>
              <FrauncesText size={22}>{logged ? 'Check-in fait !' : 'Check-in du jour'}</FrauncesText>
              <Text style={styles.ctaSub}>{logged ? 'Ta journée est enregistrée.' : 'Pas encore enregistré'}</Text>
            </View>
            <View style={styles.ctaIcon}>
              <Ionicons name={logged ? 'checkmark' : 'arrow-forward'} size={20} color={colors.gold} />
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: spacing.xxl, paddingTop: 4 },
  date: { fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 },
  bell: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center', justifyContent: 'center',
  },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  statCell: {
    flex: 1, backgroundColor: colors.surface, borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.06)', borderRadius: radius.lg,
    paddingVertical: 14, paddingHorizontal: 6, alignItems: 'center',
  },
  statLbl: { fontSize: 9, color: colors.textDim, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: '700', marginTop: 4 },
  card: {
    backgroundColor: colors.surface, borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border, borderRadius: radius.xxl, padding: spacing.lg, marginBottom: 14,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  threeGrid: { flexDirection: 'row', gap: 8 },
  miniCell: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 12,
    paddingVertical: 10, paddingHorizontal: 6, alignItems: 'center',
  },
  miniLbl: { fontSize: 9, color: colors.textDim, textTransform: 'uppercase', letterSpacing: 1, fontWeight: '700', marginTop: 3 },
  calUnit: { fontFamily: undefined, fontStyle: 'normal', fontSize: 16, color: 'rgba(255,255,255,0.4)', marginLeft: 5 },
  macros: { fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 8 },
  cta: {
    borderRadius: 18, overflow: 'hidden', marginBottom: 14,
  },
  ctaInner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 18, borderWidth: 1, borderRadius: 18,
  },
  ctaSub: { fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 3 },
  ctaIcon: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(201,168,76,0.12)',
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
});
