import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, FlatList, KeyboardAvoidingView, Platform,
  Pressable, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/theme';
import { FrauncesText } from '@/components/ui/FrauncesText';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { useAuth } from '@/hooks/useAuth';
import { sb } from '@/lib/supabase';
import type { Post } from '@/lib/types';

export default function MessagesScreen() {
  const { client } = useAuth();
  const [messages, setMessages] = useState<Post[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const listRef = useRef<FlatList>(null);

  const load = useCallback(async () => {
    if (!client) return;
    setLoading(true);
    const { data } = await sb.from('posts')
      .select('*').eq('client_id', client.id)
      .order('created_at', { ascending: true }).limit(200);
    setMessages((data as Post[]) || []);
    setLoading(false);
    setTimeout(() => listRef.current?.scrollToEnd({ animated: false }), 100);
  }, [client]);

  useEffect(() => { load(); }, [load]);

  // Realtime subscription
  useEffect(() => {
    if (!client) return;
    const channel = sb
      .channel('client_posts_' + client.id)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts', filter: `client_id=eq.${client.id}` }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Post]);
        setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
      })
      .subscribe();
    return () => { sb.removeChannel(channel); };
  }, [client]);

  const send = async () => {
    if (!client || !text.trim()) return;
    setSending(true);
    const body = text.trim();
    setText('');
    try {
      await sb.from('posts').insert({
        client_id: client.id,
        content: body,
        sender: 'client',
        is_read: false,
      });
    } catch (e) { console.error('[messages] send', e); }
    setSending(false);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.header}>
          <EyebrowLabel>MESSAGES</EyebrowLabel>
          <FrauncesText size={28} style={{ marginTop: 6 }}>Mon coach</FrauncesText>
        </View>
        {loading ? (
          <View style={styles.center}><ActivityIndicator color={colors.gold} /></View>
        ) : (
          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={(m) => m.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={[styles.bubble, item.sender === 'coach' ? styles.bubbleCoach : styles.bubbleClient]}>
                <Text style={item.sender === 'coach' ? styles.coachText : styles.clientText}>{item.content}</Text>
                <Text style={styles.ts}>{new Date(item.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</Text>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.empty}>Aucun message encore.</Text>}
          />
        )}
        <View style={styles.composer}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Écris un message…"
            placeholderTextColor={colors.textDim}
            style={styles.input}
            multiline
          />
          <Pressable disabled={!text.trim() || sending} onPress={send} style={[styles.sendBtn, (!text.trim() || sending) && { opacity: 0.5 }]}>
            <Ionicons name="send" size={18} color={'#000'} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { padding: spacing.lg, paddingBottom: spacing.md },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { padding: spacing.lg, gap: spacing.sm, paddingBottom: 20 },
  bubble: { borderRadius: 16, padding: 12, maxWidth: '82%' },
  bubbleCoach: { alignSelf: 'flex-start', backgroundColor: colors.surface, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  bubbleClient: { alignSelf: 'flex-end', backgroundColor: 'rgba(201,168,76,0.12)', borderWidth: StyleSheet.hairlineWidth, borderColor: colors.borderGoldSoft },
  coachText: { color: colors.white, fontSize: 14, lineHeight: 20 },
  clientText: { color: colors.white, fontSize: 14, lineHeight: 20 },
  ts: { color: colors.textDim, fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  empty: { color: colors.textMuted, fontSize: 13, textAlign: 'center', padding: spacing.xl, fontStyle: 'italic' },
  composer: {
    flexDirection: 'row', gap: spacing.sm, padding: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  input: {
    flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: 12,
    color: colors.white, fontSize: 14, maxHeight: 100,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
});
