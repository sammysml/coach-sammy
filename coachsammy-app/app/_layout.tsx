import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Fraunces_300Light_Italic, Fraunces_400Regular } from '@expo-google-fonts/fraunces';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from '@/components/ui/Toast';
import { colors } from '@/constants/colors';
import { StyleSheet, View } from 'react-native';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [loaded] = useFonts({
    'Fraunces-Italic': Fraunces_300Light_Italic,
    'Fraunces-Regular': Fraunces_400Regular,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync().catch(() => {});
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={styles.root}>
      <ToastProvider>
        <View style={styles.root}>
          <StatusBar style="light" backgroundColor={colors.bg} />
          <Slot />
        </View>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
});
