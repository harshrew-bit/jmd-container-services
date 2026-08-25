import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

export interface ContainerFilterState {
  search: string;
  size: string;
  condition: string;
  status: string;
}

interface ContainerFiltersProps {
  filters: ContainerFilterState;
  onFilterChange: (filters: ContainerFilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const ContainerFilters: React.FC<ContainerFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  const sizes: { label: string; value: string }[] = [
    { label: 'All Sizes', value: 'all' },
    { label: '10ft Mini', value: '10ft' },
    { label: '20ft Standard', value: '20ft' },
    { label: '40ft Standard', value: '40ft' },
    { label: '40ft High Cube', value: '40ft HC' },
  ];

  const conditions: { label: string; value: string }[] = [
    { label: 'All Conditions', value: 'all' },
    { label: 'New / One-Trip', value: 'New / One-Trip' },
    { label: 'Cargo Worthy (CW)', value: 'Cargo Worthy (CW)' },
    { label: 'Wind & Water Tight', value: 'Wind & Water Tight (WWT)' },
    { label: 'Custom Built / Mod', value: 'Custom Built' },
  ];

  const statuses: { label: string; value: string }[] = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Available Only', value: 'Available' },
    { label: 'Reserved', value: 'Reserved' },
    { label: 'Sold', value: 'Sold' },
  ];

  const hasActiveFilters =
    filters.search || filters.size !== 'all' || filters.condition !== 'all' || filters.status !== 'all';

  return (
    <div className="bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 transition-colors">
      {/* Top Search Bar & Counter */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search by container name, ID (e.g. JMD-20), or size..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white placeholder-charcoal-500 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal-400 hover:text-charcoal-900 dark:hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs font-mono text-charcoal-600 dark:text-charcoal-400 bg-charcoal-100 dark:bg-charcoal-950 px-3 py-2 rounded-xl border border-charcoal-200 dark:border-charcoal-800">
            Showing <strong className="text-brand-700 dark:text-brand-400">{totalResults}</strong> units
          </span>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs text-charcoal-700 dark:text-charcoal-300 hover:text-brand-700 dark:hover:text-brand-400 px-3 py-2 rounded-xl bg-charcoal-100 dark:bg-charcoal-800 hover:bg-charcoal-200 dark:hover:bg-charcoal-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Select Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-charcoal-100 dark:border-charcoal-800/80">
        {/* Size Filter */}
        <div>
          <label className="block text-xs font-semibold text-charcoal-600 dark:text-charcoal-400 mb-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-brand-600 dark:text-brand-500" /> Size
          </label>
          <select
            value={filters.size}
            onChange={(e) => onFilterChange({ ...filters, size: e.target.value })}
            className="w-full px-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-700 rounded-xl text-xs text-charcoal-800 dark:text-charcoal-200 focus:outline-none focus:border-brand-600"
          >
            {sizes.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Condition Filter */}
        <div>
          <label className="block text-xs font-semibold text-charcoal-600 dark:text-charcoal-400 mb-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-brand-600 dark:text-brand-500" /> Condition Grade
          </label>
          <select
            value={filters.condition}
            onChange={(e) => onFilterChange({ ...filters, condition: e.target.value })}
            className="w-full px-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-700 rounded-xl text-xs text-charcoal-800 dark:text-charcoal-200 focus:outline-none focus:border-brand-600"
          >
            {conditions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-xs font-semibold text-charcoal-600 dark:text-charcoal-400 mb-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-brand-600 dark:text-brand-500" /> Availability
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="w-full px-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-700 rounded-xl text-xs text-charcoal-800 dark:text-charcoal-200 focus:outline-none focus:border-brand-600"
          >
            {statuses.map((st) => (
              <option key={st.value} value={st.value}>
                {st.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
