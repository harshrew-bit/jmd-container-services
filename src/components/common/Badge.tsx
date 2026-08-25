import React from 'react';
import { ContainerStatus, ContainerCondition } from '../../types';

interface StatusBadgeProps {
  status: ContainerStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs font-semibold';

  const variants = {
    Available: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300',
      dot: 'bg-emerald-500',
    },
    Reserved: {
      bg: 'bg-amber-50 dark:bg-amber-950/80 border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-300',
      dot: 'bg-amber-500',
    },
    Sold: {
      bg: 'bg-charcoal-100 dark:bg-charcoal-900 border-charcoal-300 dark:border-charcoal-700 text-charcoal-600 dark:text-charcoal-400',
      dot: 'bg-charcoal-400',
    },
  };

  const current = variants[status] || variants.Available;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${current.bg} ${sizeClasses} tracking-wide uppercase font-mono`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${current.dot} animate-pulse`} />
      {status}
    </span>
  );
};

interface ConditionBadgeProps {
  condition: ContainerCondition;
  size?: 'sm' | 'md';
}

export const ConditionBadge: React.FC<ConditionBadgeProps> = ({ condition, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span
      className={`inline-flex items-center rounded-md border bg-charcoal-100 dark:bg-charcoal-900/80 border-charcoal-200 dark:border-charcoal-750 text-charcoal-800 dark:text-charcoal-300 ${sizeClasses}`}
    >
      {condition}
    </span>
  );
};

interface TagProps {
  children: React.ReactNode;
  variant?: 'slate' | 'amber' | 'blue' | 'crimson' | 'emerald';
}

export const Tag: React.FC<TagProps> = ({ children, variant = 'crimson' }) => {
  const variants = {
    crimson: 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800/60',
    slate: 'bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 border-charcoal-200 dark:border-charcoal-700',
    amber: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    blue: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/60',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-lg border ${variants[variant]}`}>
      {children}
    </span>
  );
};
