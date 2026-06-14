import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { fraunces, radius, spacing } from '@/constants/theme';

interface Props {
  value: string | number;
  label: string;
  valueColor?: string;
  unit?: string;
  style?: ViewStyle;
  large?: boolean;
}

export function StatCell({ value, label, valueColor = colors.white, unit, style, large }: Props) {
  const valSize = large ? 26 : 20;
  return (
    <View style={[styles.cell, style]}>
      <Text style={fraunces(valSize, valueColor)}>
        {value}
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: 14,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unit: {
    fontFamily: undefined,
    fontStyle: 'normal',
    fontSize: 12,
    color: colors.textDim,
    fontWeight: '500',
  },
  label: {
    fontSize: 9,
    color: colors.textDim,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
});
