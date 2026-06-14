import React from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { colors } from '@/constants/colors';

export default function Index() {
  const { loading, session, role } = useAuth();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.gold} />
      </View>
    );
  }
  if (!session) return <Redirect href="/auth/login" />;
  if (role === 'coach') return <Redirect href="/(coach)/feed" />;
  if (role === 'client') return <Redirect href="/(client)/today" />;
  // Authenticated but no role match — send to login with an error context
  return <Redirect href="/auth/login" />;
}

const styles = StyleSheet.create({
  center: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' },
});
