import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | { email: string; id: string } | null;
  session: Session | null;
  loading: boolean;
  isMockAuth: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_MOCK_USER_KEY = 'jmd_local_mock_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Security: Mock development auth is strictly allowed ONLY when running in local development mode (import.meta.env.DEV)
  // and when Supabase credentials are not yet configured.
  const isDevMode = import.meta.env.DEV;
  const isMock = !isSupabaseConfigured() && isDevMode;

  useEffect(() => {
    if (isSupabaseConfigured()) {
      // Real Supabase session validation
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      // Clear any stale mock user from storage if Supabase is configured
      localStorage.removeItem(LOCAL_MOCK_USER_KEY);

      return () => subscription.unsubscribe();
    } else {
      // If in production and Supabase is not configured, NEVER allow mock authentication
      if (!isDevMode) {
        localStorage.removeItem(LOCAL_MOCK_USER_KEY);
        setUser(null);
        setSession(null);
        setLoading(false);
        return;
      }

      // Local development only session restore
      const savedUser = localStorage.getItem(LOCAL_MOCK_USER_KEY);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (_) {
          localStorage.removeItem(LOCAL_MOCK_USER_KEY);
        }
      }
      setLoading(false);
    }
  }, [isMock, isDevMode]);

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    // 1. If Supabase is configured, use genuine Supabase authentication
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        return { error: error.message };
      }

      setUser(data.user);
      setSession(data.session);
      return {};
    }

    // 2. If in production and Supabase is not configured: strictly deny access
    if (!isDevMode) {
      return {
        error: 'Owner authentication is unavailable. Supabase backend credentials are not configured in this production deployment.',
      };
    }

    // 3. Local development only fallback (isolated to local dev server)
    if (email && password.length >= 6) {
      const mockUser = {
        id: 'owner-local-admin',
        email: email.trim().toLowerCase(),
        user_metadata: { role: 'owner' },
      };
      localStorage.setItem(LOCAL_MOCK_USER_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
      return {};
    }

    return { error: 'Invalid credentials. Password must be at least 6 characters.' };
  };

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Sign out error:', err);
      }
    }
    localStorage.removeItem(LOCAL_MOCK_USER_KEY);
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isMockAuth: isMock, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
