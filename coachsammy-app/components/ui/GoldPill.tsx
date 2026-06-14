import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/constants/colors';

type Variant = 'gold' | 'emerald' | 'rose' | 'violet' | 'muted';

interface Props {
  label: string;
  variant?: Variant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const PALETTE: Record<Variant, { bg: string; fg: string; border: string }> = {
  gold:    { bg: 'rgba(201,168,76,.1)', fg: colors.gold, border: colors.borderGoldSoft },
  emerald: { bg: 'rgba(74,222,128,.1)', fg: colors.emerald, border: 'rgba(74,222,128,.2)' },
  rose:    { bg: 'rgba(251,113,133,.1)', fg: colors.rose, border: 'rgba(251,113,133,.2)' },
  violet:  { bg: 'rgba(167,139,250,.1)', fg: colors.violet, border: 'rgba(167,139,250,.2)' },
  muted:   { bg: 'rgba(255,255,255,.04)', fg: colors.textMuted, border: colors.border },
};

export function GoldPill({ label, variant = 'gold', style, textStyle }: Props) {
  const p = PALETTE[variant];
  return (
    <View style={[styles.pill, { backgroundColor: p.bg, borderColor: p.border }, style]}>
      <Text style={[styles.text, { color: p.fg }, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 99,
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
