import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/theme';
import { FrauncesText } from '@/components/ui/FrauncesText';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { GoldButton } from '@/components/ui/GoldButton';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';
import { sb } from '@/lib/supabase';
import type { ClientRequest } from '@/lib/types';

export default function RequestsScreen() {
  const { client } = useAuth();
  const toast = useToast();
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    if (!client) return;
    setLoading(true);
    const { data } = await sb.from('client_requests')
      .select('*').eq('client_id', client.id)
      .order('created_at', { ascending: false });
    setRequests((data as ClientRequest[]) || []);
    setLoading(false);
  }, [client]);
  useEffect(() => { load(); }, [load]);

  const send = async () => {
    if (!client || !text.trim()) return;
    setSending(true);
    try {
      const { error } = await sb.from('client_requests').insert({
        client_id: client.id,
        text: text.trim(),
        status: 'pending',
      });
      if (error) throw error;
      setText('');
      toast.show('Demande envoyée', 'success');
      await load();
    } catch (e: any) {
      toast.show(e?.message || 'Erreur', 'error');
    } finally { setSending(false); }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <EyebrowLabel>DEMANDES</EyebrowLabel>
        <FrauncesText size={30} style={{ marginTop: 6, marginBottom: spacing.lg }}>Envoyer une demande</FrauncesText>

        <View style={styles.card}>
          <TextInput
            value={text}
            onChangeText={setText}
            multiline
            placeholder="Décris ta demande pour ton coach…"
            placeholderTextColor={colors.textDim}
            style={styles.input}
          />
          <GoldButton label={sending ? 'Envoi…' : 'Envoyer'} loading={sending} onPress={send} style={{ marginTop: spacing.md }} />
        </View>

        <EyebrowLabel style={{ marginTop: spacing.xl, marginBottom: spacing.md }}>HISTORIQUE</EyebrowLabel>
        {loading ? <ActivityIndicator color={colors.gold} /> :
          requests.length === 0 ? (
            <Text style={styles.empty}>Aucune demande envoyée.</Text>
          ) : (
            requests.map((r) => (
              <View key={r.id} style={styles.itemCard}>
                <Text style={styles.itemText}>{r.text || '—'}</Text>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemStatus}>{r.status || 'pending'}</Text>
                  <Text style={styles.itemDate}>{new Date(r.created_at).toLocaleDateString('fr-FR')}</Text>
                </View>
              </View>
            ))
          )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.lg, paddingBottom: 100 },
  card: {
    backgroundColor: colors.surface, borderRadius: radius.xxl, padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
  },
  input: {
    backgroundColor: colors.surface2, borderRadius: 12, padding: 12, minHeight: 120,
    color: colors.white, fontSize: 14, textAlignVertical: 'top',
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
  },
  itemCard: {
    backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
  },
  itemText: { color: colors.white, fontSize: 14, lineHeight: 20 },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  itemStatus: { color: colors.gold, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  itemDate: { color: colors.textDim, fontSize: 11 },
  empty: { color: colors.textMuted, fontSize: 13, textAlign: 'center', padding: spacing.lg, fontStyle: 'italic' },
});
