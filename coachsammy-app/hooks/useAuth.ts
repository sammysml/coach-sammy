import { useCallback, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { sb } from '@/lib/supabase';
import type { Client, Role } from '@/lib/types';

interface AuthState {
  user: User | null;
  session: Session | null;
  role: Role;
  client: Client | null;
  loading: boolean;
  error: string | null;
}

const INITIAL: AuthState = {
  user: null,
  session: null,
  role: null,
  client: null,
  loading: true,
  error: null,
};

/**
 * Determines role from Supabase user.
 * 1. Check profiles table for role === 'coach' → coach
 * 2. Else check clients table for matching email → client (loads full client row)
 * 3. Else → null (unauthorized for app)
 */
async function resolveRole(user: User): Promise<{ role: Role; client: Client | null }> {
  // Try profiles first (preferred when explicit role mapping exists)
  try {
    const { data: profile } = await sb
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();
    if (profile?.role === 'coach') return { role: 'coach', client: null };
  } catch (_) {}
  // Fall back: match clients by email
  if (user.email) {
    try {
      const { data: client } = await sb
        .from('clients')
        .select('*')
        .eq('email', user.email)
        .maybeSingle();
      if (client) return { role: 'client', client: client as Client };
    } catch (_) {}
  }
  return { role: null, client: null };
}

export function useAuth() {
  const [state, setState] = useState<AuthState>(INITIAL);

  const hydrate = useCallback(async (session: Session | null) => {
    if (!session?.user) {
      setState({ ...INITIAL, loading: false });
      return;
    }
    const { role, client } = await resolveRole(session.user);
    setState({
      user: session.user,
      session,
      role,
      client,
      loading: false,
      error: role ? null : 'No matching coach or client profile for this account.',
    });
  }, []);

  useEffect(() => {
    let active = true;
    sb.auth.getSession().then(({ data }) => {
      if (active) hydrate(data.session);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      if (active) hydrate(session);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [hydrate]);

  const signIn = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) {
      setState((s) => ({ ...s, loading: false, error: error.message }));
      return { ok: false, error: error.message };
    }
    return { ok: true };
  }, []);

  const signOut = useCallback(async () => {
    await sb.auth.signOut();
    setState({ ...INITIAL, loading: false });
  }, []);

  return { ...state, signIn, signOut };
}
