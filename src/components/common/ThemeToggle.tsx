import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`p-2 rounded-lg text-charcoal-600 dark:text-charcoal-300 hover:text-brand-700 dark:hover:text-brand-400 bg-charcoal-100 dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 focus:outline-none focus:ring-2 focus:ring-brand-600 transition-all ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-charcoal-700 transition-transform" />
      )}
    </button>
  );
};
