// Design tokens — mirror coach_sammy_v7 (2).html exactly
export const colors = {
  bg: '#050505',
  surface: '#111111',
  surface2: '#161616',
  gold: '#C9A84C',
  goldLight: '#D4B556',
  goldDark: '#9A7530',
  emerald: '#4ade80',
  rose: '#fb7185',
  violet: '#a78bfa',
  amber: '#f59e0b',
  white: '#ffffff',
  textMuted: 'rgba(255,255,255,0.5)',
  textDim: 'rgba(255,255,255,0.3)',
  textFaint: 'rgba(255,255,255,0.15)',
  border: 'rgba(255,255,255,0.05)',
  borderStrong: 'rgba(255,255,255,0.12)',
  borderGold: 'rgba(201,168,76,0.3)',
  borderGoldSoft: 'rgba(201,168,76,0.2)',
  goldFill: 'rgba(201,168,76,0.12)',
  goldFillSoft: 'rgba(201,168,76,0.06)',
  emeraldFill: 'rgba(74,222,128,0.1)',
  roseFill: 'rgba(251,113,133,0.1)',
} as const;

export type ColorKey = keyof typeof colors;
