import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { colors } from '@/constants/colors';

type ToastType = 'success' | 'error' | 'info';
interface ToastCtx {
  show: (msg: string, type?: ToastType) => void;
}

const Ctx = createContext<ToastCtx>({ show: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const [type, setType] = useState<ToastType>('info');
  const opacity = useRef(new Animated.Value(0)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((m: string, t: ToastType = 'info') => {
    setMsg(m);
    setType(t);
    Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => setMsg(null));
    }, 2400);
  }, [opacity]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const color = type === 'success' ? colors.emerald : type === 'error' ? colors.rose : colors.white;
  const border = type === 'success' ? 'rgba(74,222,128,.3)' : type === 'error' ? 'rgba(251,113,133,.3)' : colors.borderStrong;

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      {msg && (
        <Animated.View pointerEvents="none" style={[styles.toast, { opacity, borderColor: border }]}>
          <Text style={[styles.text, { color }]}>{msg}</Text>
        </Animated.View>
      )}
    </Ctx.Provider>
  );
}

export function useToast() {
  return useContext(Ctx);
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 99,
    paddingHorizontal: 16,
    paddingVertical: 10,
    zIndex: 9999,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
});
