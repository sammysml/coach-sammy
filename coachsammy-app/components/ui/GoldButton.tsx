import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { fontFamily, radius } from '@/constants/theme';

interface Props extends PressableProps {
  label: string;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
  haptic?: boolean;
}

export function GoldButton({ label, loading, style, haptic = true, onPress, ...rest }: Props) {
  return (
    <Pressable
      {...rest}
      onPress={(e) => {
        if (haptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        onPress?.(e);
      }}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style as ViewStyle]}
    >
      <LinearGradient
        colors={[colors.goldLight, colors.gold]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill as any}
      />
      <View style={styles.inner}>
        {loading ? (
          <ActivityIndicator color={'#000'} />
        ) : (
          <Text style={styles.label}>{label}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    minHeight: 50,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  inner: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#000',
    fontSize: 15,
    fontWeight: '800',
    fontFamily: fontFamily.ui,
    letterSpacing: 0.3,
  },
});
