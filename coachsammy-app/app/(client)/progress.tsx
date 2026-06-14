import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { spacing, radius, fraunces } from '@/constants/theme';
import { FrauncesText } from '@/components/ui/FrauncesText';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { ProgressSparkline } from '@/components/client/ProgressSparkline';
import { useAuth } from '@/hooks/useAuth';
import { sb } from '@/lib/supabase';
import type { WeightLog, ClientPhoto } from '@/lib/types';

type Range = '1m' | '3m' | '6m' | 'all';
const RANGE_DAYS: Record<Range, number> = { '1m': 30, '3m': 90, '6m': 180, all: 3650 };

export default function ProgressScreen() {
  const { client } = useAuth();
  const [range, setRange] = useState<Range>('3m');
  const [weights, setWeights] = useState<WeightLog[]>([]);
  const [photos, setPhotos] = useState<ClientPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!client) return;
    setLoading(true);
    const since = new Date(Date.now() - RANGE_DAYS[range] * 24 * 3600 * 1000).toISOString().slice(0, 10);
    const [{ data: w }, { data: p }] = await Promise.all([
      sb.from('weight_logs').select('*').eq('client_id', client.id)
        .gte('logged_at', since).order('logged_at', { ascending: true }),
      sb.from('client_photos').select('*').eq('client_id', client.id)
        .order('created_at', { ascending: false }).limit(12),
    ]);
    setWeights((w as WeightLog[]) || []);
    setPhotos((p as ClientPhoto[]) || []);
    setLoading(false);
  }, [client, range]);
  useEffect(() => { load(); }, [load]);

  if (!client) return <SafeAreaView style={styles.root}><View style={styles.center}><ActivityIndicator color={colors.gold} /></View></SafeAreaView>;

  const startW = weights[0]?.weight || client.start_weight || client.weight || 0;
  const curW = weights[weights.length - 1]?.weight || client.current_weight || startW;
  const goalW = client.goal_weight || client.target_weight || 0;
  const delta = +(curW - startW).toFixed(1);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <EyebrowLabel>PROGRÈS</EyebrowLabel>
        <FrauncesText size={30} style={{ marginTop: 6, marginBottom: spacing.lg }}>Mon évolution</FrauncesText>

        <View style={styles.card}>
          <View style={styles.cardHdr}>
            <FrauncesText size={20}>Poids</FrauncesText>
            <Text style={styles.cardSub}>{weights.length} pesées</Text>
          </View>
          <View style={styles.rangeRow}>
            {(['1m','3m','6m','all'] as Range[]).map((r) => (
              <Pressable key={r} onPress={() => setRange(r)} style={[styles.rngBtn, range === r && styles.rngBtnOn]}>
                <Text style={[styles.rngText, range === r && styles.rngTextOn]}>{r === 'all' ? 'Tout' : r}</Text>
              </Pressable>
            ))}
          </View>
          {loading ? (
            <ActivityIndicator color={colors.gold} style={{ marginVertical: 30 }} />
          ) : (
            <ProgressSparkline
              points={weights.map((w) => ({ x: w.logged_at, y: Number(w.weight) }))}
              goalWeight={goalW}
              height={140}
            />
          )}
          <View style={styles.trio}>
            <View style={styles.trioCell}>
              <FrauncesText size={22}>{(startW || 0).toFixed(1)}<Text style={styles.kg}>kg</Text></FrauncesText>
              <Text style={styles.trioLbl}>Départ</Text>
            </View>
            <Text style={styles.trioArrow}>→</Text>
            <View style={styles.trioCell}>
              <FrauncesText size={22} color={colors.gold}>{(curW || 0).toFixed(1)}<Text style={styles.kg}>kg</Text></FrauncesText>
              <Text style={styles.trioLbl}>Actuel</Text>
            </View>
            <Text style={styles.trioArrow}>→</Text>
            <View style={styles.trioCell}>
              <FrauncesText size={22}>{goalW ? goalW.toFixed(1) : '—'}{goalW ? <Text style={styles.kg}>kg</Text> : null}</FrauncesText>
              <Text style={styles.trioLbl}>Objectif</Text>
            </View>
          </View>
          {weights.length > 1 && (
            <Text style={styles.delta}>
              {delta > 0 ? '+' : ''}{delta} kg depuis le début
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <View style={styles.cardHdr}>
            <FrauncesText size={20}>Photos</FrauncesText>
            <Text style={styles.cardSub}>{photos.length}</Text>
          </View>
          {photos.length === 0 ? (
            <Text style={styles.empty}>Aucune photo encore.</Text>
          ) : (
            <View style={styles.photoGrid}>
              {photos.map((p) => (
                <View key={p.id} style={styles.photo}>
                  {/* Image rendered via background-image-style — replace with <Image> when storage URL signed */}
                  <Text style={styles.photoDate}>{(p.created_at || '').slice(0, 10)}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.lg, paddingBottom: 100 },
  center: { padding: 40, alignItems: 'center' },
  card: {
    backgroundColor: colors.surface, borderRadius: radius.xxl, padding: spacing.lg,
    marginBottom: spacing.md, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
  },
  cardHdr: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  cardSub: { fontSize: 10, color: colors.textDim, textTransform: 'uppercase', letterSpacing: 1, fontWeight: '600' },
  rangeRow: {
    flexDirection: 'row', gap: 4, backgroundColor: colors.surface2, borderRadius: 10, padding: 3, marginBottom: spacing.md,
  },
  rngBtn: { flex: 1, paddingVertical: 7, alignItems: 'center', borderRadius: 7 },
  rngBtnOn: { backgroundColor: colors.surface },
  rngText: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  rngTextOn: { color: colors.white },
  trio: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.md },
  trioCell: { flex: 1, alignItems: 'center' },
  trioArrow: { color: colors.textDim, fontSize: 14 },
  trioLbl: { fontSize: 9, color: colors.textDim, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 3, fontWeight: '700' },
  kg: { fontFamily: undefined, fontStyle: 'normal', fontSize: 11, color: colors.textDim, marginLeft: 2 },
  delta: { textAlign: 'center', color: colors.textMuted, fontSize: 13, marginTop: spacing.md, fontWeight: '600' },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  photo: { width: '32%', aspectRatio: 1, borderRadius: 10, backgroundColor: colors.surface2, justifyContent: 'flex-end' },
  photoDate: { color: colors.white, fontSize: 10, fontWeight: '600', padding: 6, backgroundColor: 'rgba(0,0,0,0.6)' },
  empty: { color: colors.textMuted, fontSize: 13, textAlign: 'center', padding: spacing.md, fontStyle: 'italic' },
});
