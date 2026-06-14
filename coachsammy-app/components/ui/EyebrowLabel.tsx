import React from 'react';
import { Text, TextStyle } from 'react-native';
import { eyebrow } from '@/constants/theme';
import { colors } from '@/constants/colors';

interface Props {
  children: string;
  color?: string;
  style?: TextStyle | TextStyle[];
}

export function EyebrowLabel({ children, color = colors.gold, style }: Props) {
  return <Text style={[eyebrow(color), style]}>{children}</Text>;
}
