import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';

export interface DotLog {
  log_date: string;
  menu_respected?: boolean | null;
}

interface Props {
  logs: DotLog[];
  /** ISO date for Monday of the week to display. Defaults to current week Monday. */
  weekStart?: string;
  style?: ViewStyle;
}

function getCurrentMondayIso(): string {
  const d = new Date();
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}

export function WeekDots({ logs, weekStart, style }: Props) {
  const monday = weekStart ?? getCurrentMondayIso();
  const today = new Date().toISOString().slice(0, 10);

  const dots = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday + 'T12:00:00');
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const log = logs.find((l) => l.log_date === iso);
    const isFuture = iso > today;
    if (isFuture) return colors.border;
    if (!log) return 'rgba(255,255,255,0.1)';
    return log.menu_respected ? colors.emerald : colors.rose;
  });

  return (
    <View style={[styles.row, style]}>
      {dots.map((color, i) => (
        <View key={i} style={[styles.dot, { backgroundColor: color }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 4 },
  dot: { flex: 1, height: 6, borderRadius: 3 },
});
