import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  Box, LayoutDashboard, Database, Image, Settings, 
  Inbox, LogOut, ExternalLink, Menu, X, Shield, ChevronRight, AlertTriangle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { isSupabaseConfigured } from '../../lib/supabase';

export const OwnerLayout: React.FC = () => {
  const { user, signOut, isMockAuth } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const supabaseReady = isSupabaseConfigured();

  const handleSignOut = async () => {
    await signOut();
    navigate('/owner/login');
  };

  const navItems = [
    { label: 'Overview', path: '/owner', icon: LayoutDashboard, exact: true },
    { label: 'Available Containers', path: '/owner/containers', icon: Database },
    { label: 'Our Work / Projects', path: '/owner/projects', icon: Box },
    { label: 'Website Media', path: '/owner/media', icon: Image },
    { label: 'Business Information', path: '/owner/business-info', icon: Settings },
    { label: 'Customer Enquiries', path: '/owner/enquiries', icon: Inbox },
  ];

  return (
    <div className="min-h-screen bg-charcoal-50 dark:bg-charcoal-950 text-charcoal-900 dark:text-charcoal-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white dark:bg-charcoal-900 border-b border-charcoal-200 dark:border-charcoal-800 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-700 flex items-center justify-center text-white">
            <Box className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-display font-extrabold text-sm text-charcoal-950 dark:text-white block">
              JMD OWNER
            </span>
            <span className="text-[10px] font-mono text-charcoal-500 uppercase">Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <aside
        className={`w-full md:w-64 lg:w-72 bg-white dark:bg-charcoal-900 border-r border-charcoal-200 dark:border-charcoal-800 flex-shrink-0 flex flex-col justify-between p-5 md:min-h-screen ${
          isMobileMenuOpen ? 'block' : 'hidden md:flex'
        }`}
      >
        <div className="space-y-6">
          {/* Logo & Identity */}
          <div className="hidden md:flex items-center gap-3 pb-5 border-b border-charcoal-200 dark:border-charcoal-800">
            <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-700/20">
              <Box className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-display font-extrabold text-base text-charcoal-950 dark:text-white block">
                JMD CONTAINER
              </span>
              <span className="text-[10px] font-mono text-brand-600 dark:text-brand-400 font-bold uppercase tracking-widest">
                Owner Portal
              </span>
            </div>
          </div>

          {/* User pill */}
          <div className="p-3 rounded-xl bg-charcoal-100 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 text-xs">
            <div className="text-[11px] text-charcoal-500 font-mono uppercase">Logged In As</div>
            <div className="font-bold text-charcoal-900 dark:text-white truncate">
              {user?.email || 'Owner Admin'}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono">
              <span
                className={`w-2 h-2 rounded-full ${
                  supabaseReady ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
              <span className="text-charcoal-500 dark:text-charcoal-400">
                {supabaseReady ? 'Supabase Live Connected' : 'Local Dev Storage'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-700 text-white shadow-md shadow-brand-700/20'
                        : 'text-charcoal-600 dark:text-charcoal-400 hover:text-charcoal-950 dark:hover:text-white hover:bg-charcoal-100 dark:hover:bg-charcoal-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Action area */}
        <div className="pt-6 border-t border-charcoal-200 dark:border-charcoal-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-charcoal-500 font-mono">Theme Mode</span>
            <ThemeToggle />
          </div>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 hover:bg-charcoal-200 dark:hover:bg-charcoal-750 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-brand-600" />
            <span>Open Public Website</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-900/60 hover:bg-brand-100 dark:hover:bg-brand-900/60 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl">
        {/* Development Mode Notice Banner */}
        {!supabaseReady && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 rounded-2xl flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block font-bold">Local Development Storage Active</strong>
              <p className="text-[11px] text-amber-800 dark:text-amber-300/90 leading-relaxed">
                Supabase backend credentials (<code className="font-mono">VITE_SUPABASE_URL</code>) are not configured yet. All inventory additions, image previews, and edits are stored locally in your browser's <code className="font-mono">localStorage</code>. They will not be shared across devices or saved online until your Supabase project is connected.
              </p>
            </div>
          </div>
        )}

        <Outlet />
      </main>
    </div>
  );
};
