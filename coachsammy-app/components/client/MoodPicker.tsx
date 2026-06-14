import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';

const EMOJIS = ['😴', '😐', '🙂', '💪', '🔥'];

interface Props {
  value: number | null;
  onChange: (v: number) => void;
}

export function MoodPicker({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {EMOJIS.map((emoji, i) => {
        const idx = i + 1;
        const selected = value === idx;
        return (
          <Pressable
            key={idx}
            onPress={() => onChange(idx)}
            style={[
              styles.btn,
              selected && styles.btnSelected,
            ]}
          >
            <Text style={[styles.emoji, selected && { transform: [{ scale: 1.1 }] }]}>{emoji}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  btn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSelected: {
    backgroundColor: 'rgba(201,168,76,0.2)',
    borderColor: 'rgba(201,168,76,0.4)',
  },
  emoji: { fontSize: 22 },
});
