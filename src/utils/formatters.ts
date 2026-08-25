/**
 * Utility helper functions for formatting text, badges, and dimensions
 */

import { ContainerCondition, ContainerStatus } from '../types';

export function getStatusBadgeVariant(status: ContainerStatus): {
  bg: string;
  text: string;
  dot: string;
} {
  switch (status) {
    case 'Available':
      return {
        bg: 'bg-emerald-950/80 border-emerald-500/40',
        text: 'text-emerald-300',
        dot: 'bg-emerald-400',
      };
    case 'Reserved':
      return {
        bg: 'bg-amber-950/80 border-amber-500/40',
        text: 'text-amber-300',
        dot: 'bg-amber-400',
      };
    case 'Sold':
      return {
        bg: 'bg-slate-900/80 border-slate-700/60',
        text: 'text-slate-400',
        dot: 'bg-slate-500',
      };
    default:
      return {
        bg: 'bg-slate-900 border-slate-700',
        text: 'text-slate-300',
        dot: 'bg-slate-400',
      };
  }
}

export function getConditionBadgeVariant(condition: ContainerCondition): {
  bg: string;
  text: string;
} {
  switch (condition) {
    case 'New / One-Trip':
      return {
        bg: 'bg-sky-950/70 border-sky-500/30 text-sky-300',
        text: 'New / One-Trip',
      };
    case 'Cargo Worthy (CW)':
      return {
        bg: 'bg-indigo-950/70 border-indigo-500/30 text-indigo-300',
        text: 'Cargo Worthy (CW)',
      };
    case 'Wind & Water Tight (WWT)':
      return {
        bg: 'bg-teal-950/70 border-teal-500/30 text-teal-300',
        text: 'Wind & Water Tight (WWT)',
      };
    case 'Custom Built':
      return {
        bg: 'bg-safety-950/70 border-safety-500/40 text-safety-300',
        text: 'Custom Built',
      };
    case 'As-Is / Used':
    default:
      return {
        bg: 'bg-slate-800/80 border-slate-600/40 text-slate-300',
        text: 'As-Is / Used',
      };
  }
}

export function formatDimensions(length?: string, width?: string, height?: string): string {
  if (!length && !width && !height) return 'Standard ISO Dimensions';
  return [length, width, height].filter(Boolean).join(' × ');
}
