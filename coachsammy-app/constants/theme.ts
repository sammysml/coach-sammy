import { Platform, StyleSheet, TextStyle } from 'react-native';
import { colors } from './colors';

export const fontFamily = {
  display: Platform.select({
    ios: 'Fraunces-Italic',
    android: 'Fraunces-Italic',
    default: 'Fraunces-Italic',
  })!,
  ui: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  })!,
};

export const radius = {
  sm: 10,
  md: 12,
  lg: 14,
  xl: 16,
  xxl: 18,
  pill: 99,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/**
 * fraunces(size, color?) — returns a TextStyle for big italic display numbers.
 * Matches the web app's pattern: font-family:'Fraunces'; font-style:italic; font-weight:300.
 */
export const fraunces = (size: number, color: string = colors.white): TextStyle => ({
  fontFamily: fontFamily.display,
  fontStyle: 'italic',
  fontWeight: '300',
  fontSize: size,
  color,
  lineHeight: size * 1,
});

/** eyebrow(color?) — small uppercase gold letterspaced label */
export const eyebrow = (color: string = colors.gold): TextStyle => ({
  fontFamily: fontFamily.ui,
  fontSize: 10,
  fontWeight: '700',
  letterSpacing: 2.5,
  textTransform: 'uppercase',
  color,
});

export const card: any = {
  backgroundColor: colors.surface,
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: colors.border,
  borderRadius: radius.xxl,
  padding: spacing.lg,
};

/** themed — convenience factory that returns a StyleSheet bound to design tokens. */
export function themed<T extends StyleSheet.NamedStyles<T>>(stylesFn: () => T): T {
  return StyleSheet.create(stylesFn());
}
