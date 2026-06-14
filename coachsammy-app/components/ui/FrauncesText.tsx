import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { fraunces } from '@/constants/theme';
import { colors } from '@/constants/colors';

interface Props extends TextProps {
  size?: number;
  color?: string;
  style?: TextStyle | TextStyle[];
}

export function FrauncesText({ size = 24, color = colors.white, style, children, ...rest }: Props) {
  return (
    <Text {...rest} style={[fraunces(size, color), style]}>
      {children}
    </Text>
  );
}
