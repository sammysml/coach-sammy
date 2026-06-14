import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Path, Circle, Line, Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';
import { colors } from '@/constants/colors';

interface Point { x: string | number; y: number }
interface Props {
  points: Point[];          // ordered ascending by time
  goalWeight?: number | null;
  width?: number;
  height?: number;
  lineColor?: string;
}

/**
 * Catmull-Rom-style cubic Bezier smoothing (matches web _smoothLinePath).
 */
function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  let d = `M${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }
  return d;
}

export function ProgressSparkline({
  points,
  goalWeight,
  width = 320,
  height = 90,
  lineColor,
}: Props) {
  if (!points || points.length < 2) {
    return (
      <View style={[styles.empty, { height }]}>
        <Text style={styles.emptyText}>Pas assez de données — pèse-toi quelques fois pour voir la courbe.</Text>
      </View>
    );
  }
  const padY = 8;
  const padX = 2;
  const vals = points.map((p) => Number(p.y) || 0).filter((v) => v > 0);
  let yMin = Math.min(...vals);
  let yMax = Math.max(...vals);
  if (goalWeight && goalWeight > 0) {
    yMin = Math.min(yMin, goalWeight);
    yMax = Math.max(yMax, goalWeight);
  }
  const yRange = yMax - yMin || 1;
  const mapY = (v: number) => padY + ((yMax - v) / yRange) * (height - padY * 2);
  const xs = points.map((_, i) => padX + (i / (points.length - 1)) * (width - padX * 2));
  const coords = points.map((p, i) => ({ x: xs[i], y: mapY(Number(p.y) || 0) }));
  const linePath = smoothPath(coords);
  const last = coords[coords.length - 1];
  const fillPath = linePath +
    ` L ${coords[coords.length - 1].x.toFixed(2)},${height}` +
    ` L ${coords[0].x.toFixed(2)},${height} Z`;

  // Direction detection for color choice
  const computedColor = lineColor || (() => {
    const first = vals[0];
    const lastV = vals[vals.length - 1];
    if (Math.abs(lastV - first) < 0.05) return colors.gold;
    if (goalWeight) {
      const goingDown = lastV < first;
      const goalDown = goalWeight < first;
      const onTrack = goingDown === goalDown;
      return onTrack ? colors.emerald : colors.rose;
    }
    return colors.gold;
  })();

  const goalLineY = goalWeight && goalWeight >= yMin && goalWeight <= yMax ? mapY(goalWeight) : null;

  return (
    <View>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={computedColor} stopOpacity={0.25} />
            <Stop offset="100%" stopColor={computedColor} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        {goalLineY !== null && (
          <>
            <Line x1={0} y1={goalLineY} x2={width} y2={goalLineY} stroke="rgba(255,255,255,0.15)" strokeDasharray="3 4" strokeWidth={1} />
            <SvgText
              x={width - 2}
              y={goalLineY - 4}
              fontSize={9}
              fill="rgba(255,255,255,0.4)"
              textAnchor="end"
              fontFamily="System"
            >{`OBJECTIF ${Number(goalWeight).toFixed(1)}KG`}</SvgText>
          </>
        )}
        <Path d={fillPath} fill="url(#sparkGrad)" stroke="none" />
        <Path d={linePath} fill="none" stroke={computedColor} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        <Circle cx={last.x} cy={last.y} r={10} fill={computedColor} opacity={0.18} />
        <Circle cx={last.x} cy={last.y} r={4} fill={computedColor} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  emptyText: {
    color: colors.textMuted,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
