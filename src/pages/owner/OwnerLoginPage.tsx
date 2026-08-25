import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Box, Lock, Mail, ArrowRight, Shield, AlertCircle, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SEOHead } from '../../components/common/SEOHead';
import { Button } from '../../components/common/Button';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { isSupabaseConfigured } from '../../lib/supabase';

export const OwnerLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isDevMode = import.meta.env.DEV;
  const supabaseReady = isSupabaseConfigured();
  const from = (location.state as any)?.from?.pathname || '/owner';

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await signIn(email, password);
    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <SEOHead title="Owner Portal Login" />

      {/* Industrial ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 industrial-grid opacity-20 pointer-events-none" />

      {/* Top action bar */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 z-10">
        <ThemeToggle />
        <Link
          to="/"
          className="text-xs font-mono text-charcoal-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-charcoal-900 border border-charcoal-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Public Website</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-700/30">
            <Box className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            JMD Owner Portal
          </h2>
          <p className="text-xs font-mono text-charcoal-400 uppercase tracking-widest">
            Inventory & Content Management System
          </p>
        </div>

        {/* Login Box */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-charcoal-900 border border-charcoal-800 py-8 px-6 sm:px-10 shadow-2xl rounded-2xl space-y-6">
            {/* Production unconfigured warning */}
            {!supabaseReady && !isDevMode && (
              <div className="p-4 bg-amber-950/60 border border-amber-600/60 rounded-xl space-y-2 text-xs text-amber-200">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Backend Not Configured</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-200/90">
                  This production deployment requires Supabase environment variables (<code className="text-amber-100 font-mono">VITE_SUPABASE_URL</code> and <code className="text-amber-100 font-mono">VITE_SUPABASE_ANON_KEY</code>) before owner authentication can be enabled.
                </p>
              </div>
            )}

            {error && (
              <div className="p-3.5 bg-brand-950/80 border border-brand-700/60 rounded-xl flex items-start gap-2.5 text-xs text-brand-200">
                <AlertCircle className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-charcoal-300 uppercase tracking-wider mb-1.5">
                  Owner Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-charcoal-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    disabled={!supabaseReady && !isDevMode}
                    placeholder="owner@jmdcontainers.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-charcoal-950 border border-charcoal-700 rounded-xl text-sm text-white placeholder-charcoal-600 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-charcoal-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    disabled={!supabaseReady && !isDevMode}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-charcoal-950 border border-charcoal-700 rounded-xl text-sm text-white placeholder-charcoal-600 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={!supabaseReady && !isDevMode}
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Sign In to Dashboard
                </Button>
              </div>
            </form>

            {/* Backend status note */}
            <div className="pt-4 border-t border-charcoal-800 text-[11px] text-charcoal-400 space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-brand-500" />
                <span>
                  Backend Engine:{' '}
                  <strong className={supabaseReady ? 'text-emerald-400' : isDevMode ? 'text-amber-400' : 'text-rose-400'}>
                    {supabaseReady ? 'Supabase Live Connected' : isDevMode ? 'Local Dev Mode (Isolated)' : 'Unconfigured'}
                  </strong>
                </span>
              </div>
              {!supabaseReady && isDevMode && (
                <p className="text-[10px] text-charcoal-500 leading-normal">
                  <strong className="text-amber-300">Development mode active:</strong> You can test with any email and 6+ character password (e.g. <code className="text-charcoal-300">owner@jmd.com</code> / <code className="text-charcoal-300">jmd12345</code>). This fallback is automatically blocked in production builds.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
