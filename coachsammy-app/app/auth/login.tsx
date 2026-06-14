import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { fraunces, spacing } from '@/constants/theme';
import { FrauncesText } from '@/components/ui/FrauncesText';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { GoldButton } from '@/components/ui/GoldButton';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const { signIn, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const onSubmit = async () => {
    setLocalError(null);
    if (!email.trim() || !password) {
      setLocalError('Email et mot de passe requis');
      return;
    }
    setSubmitting(true);
    const res = await signIn(email.trim(), password);
    setSubmitting(false);
    if (res.ok) router.replace('/');
    else setLocalError(res.error || 'Erreur de connexion');
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.kbd}
      >
        <View style={styles.inner}>
          <View style={styles.brand}>
            <EyebrowLabel>COACH LAID SAMMY</EyebrowLabel>
            <FrauncesText size={42} style={{ marginTop: spacing.sm }}>
              Bienvenue.
            </FrauncesText>
            <Text style={styles.sub}>Connecte-toi pour continuer.</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              placeholder="ton@email.com"
              placeholderTextColor={colors.textDim}
              style={styles.input}
            />
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              secureTextEntry
              autoCapitalize="none"
              textContentType="password"
              autoComplete="password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.textDim}
              style={styles.input}
            />
            {(localError || error) && (
              <Text style={styles.error}>{localError || error}</Text>
            )}
            <GoldButton
              label={submitting || loading ? 'Connexion…' : 'Se connecter'}
              loading={submitting || loading}
              onPress={onSubmit}
              style={{ marginTop: spacing.lg }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  kbd: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 24, paddingTop: 60, justifyContent: 'flex-start' },
  brand: { marginBottom: 48 },
  sub: { color: colors.textMuted, fontSize: 14, marginTop: spacing.sm },
  form: { },
  label: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 6,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    color: colors.white,
    fontSize: 15,
  },
  error: {
    color: colors.rose,
    fontSize: 13,
    marginTop: spacing.md,
  },
});
