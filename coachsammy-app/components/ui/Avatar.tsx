import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { fraunces } from '@/constants/theme';
import { FrauncesText } from './FrauncesText';

interface Props {
  name?: string | null;
  photoUrl?: string | null;
  size?: number;
  style?: ViewStyle;
}

function initials(name?: string | null): string {
  if (!name) return '?';
  return name.split(' ').map((w) => w[0] || '').slice(0, 2).join('').toUpperCase() || '?';
}

export function Avatar({ name, photoUrl, size = 56, style }: Props) {
  const dim = { width: size, height: size, borderRadius: size / 2 };
  if (photoUrl) {
    return <Image source={{ uri: photoUrl }} style={[dim, style as any]} />;
  }
  return (
    <View style={[dim, styles.shell, style]}>
      <LinearGradient
        colors={[colors.gold, '#e8c96a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill as any}
      />
      <FrauncesText size={Math.round(size * 0.42)} color={'#000'} style={fraunces(Math.round(size * 0.42), '#000')}>
        {initials(name)}
      </FrauncesText>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
