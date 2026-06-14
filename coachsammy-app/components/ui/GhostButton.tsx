import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { fontFamily, radius } from '@/constants/theme';

interface Props extends PressableProps {
  label: string;
  style?: ViewStyle | ViewStyle[];
}

export function GhostButton({ label, style, ...rest }: Props) {
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style as ViewStyle]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },
  label: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: fontFamily.ui,
  },
});
