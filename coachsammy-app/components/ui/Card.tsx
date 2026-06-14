import React from 'react';
import { View, ViewStyle, ViewProps, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/theme';

interface Props extends ViewProps {
  style?: ViewStyle | ViewStyle[];
  padded?: boolean;
  children?: React.ReactNode;
}

export function Card({ style, padded = true, children, ...rest }: Props) {
  return (
    <View {...rest} style={[styles.card, padded && styles.padded, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.xxl,
    marginBottom: spacing.md,
  },
  padded: {
    padding: spacing.lg,
  },
});
