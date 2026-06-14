import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface Props {
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Toggle({ value, onChange, disabled, style }: Props) {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => onChange(!value)}
      style={[styles.track, value && styles.trackOn, style]}
    >
      <View style={[styles.thumb, value && styles.thumbOn]} />
    </Pressable>
  );
}

const TRACK_W = 46;
const TRACK_H = 26;
const THUMB = 22;
const styles = StyleSheet.create({
  track: {
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    padding: 2,
  },
  trackOn: {
    backgroundColor: colors.gold,
  },
  thumb: {
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    backgroundColor: colors.white,
  },
  thumbOn: {
    transform: [{ translateX: TRACK_W - THUMB - 4 }],
  },
});
