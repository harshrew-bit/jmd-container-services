import React, { useState, useMemo } from 'react';
import { Database, Filter, Search, RotateCcw, Box, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { PageHeader } from '../components/layout/PageHeader';
import { ContainerCard } from '../components/containers/ContainerCard';
import { ContainerFilters, ContainerFilterState } from '../components/containers/ContainerFilters';
import { ContainerEnquiryModal } from '../components/forms/ContainerEnquiryModal';
import { Button } from '../components/common/Button';
import { useContainers } from '../hooks/useData';
import { ContainerItem } from '../types';

export const ContainersPage: React.FC = () => {
  const { containers, loading } = useContainers();
  const [selectedContainer, setSelectedContainer] = useState<ContainerItem | null>(null);

  const initialFilters: ContainerFilterState = {
    search: '',
    size: 'all',
    condition: 'all',
    status: 'all',
  };

  const [filters, setFilters] = useState<ContainerFilterState>(initialFilters);

  const filteredContainers = useMemo(() => {
    return containers.filter((item) => {
      // Search filter
      if (filters.search) {
        const query = filters.search.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesId = item.id.toLowerCase().includes(query);
        const matchesSize = item.size.toLowerCase().includes(query);
        const matchesType = item.type.toLowerCase().includes(query);
        if (!matchesTitle && !matchesId && !matchesSize && !matchesType) {
          return false;
        }
      }

      // Size filter
      if (filters.size !== 'all' && item.size !== filters.size) {
        return false;
      }

      // Condition filter
      if (filters.condition !== 'all' && item.condition !== filters.condition) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && item.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [containers, filters]);

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div>
      <SEOHead
        title="Available Containers for Sale & Conversion"
        description="Browse available 10ft, 20ft, 40ft, and High Cube shipping containers in stock at JMD Container Services yard. Inspected and ready for sale or custom fabrication."
      />

      <PageHeader
        badge="Current Yard Inventory"
        title="Available Containers"
        subtitle="Search and filter through our inspected stock of raw and modified shipping containers ready for direct sale, lease, or customized engineering."
        breadcrumbs={[{ label: 'Available Containers' }]}
        actions={
          <Button
            variant="primary"
            size="md"
            href="/custom-solutions"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Need a Custom Build?
          </Button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        {/* Filters and Search */}
        <ContainerFilters
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          totalResults={filteredContainers.length}
        />

        {/* Containers Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-3 border-brand-700 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-charcoal-400">Loading container stock...</p>
          </div>
        ) : filteredContainers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContainers.map((container) => (
              <ContainerCard
                key={container.id}
                container={container}
                onEnquireClick={(c) => setSelectedContainer(c)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 rounded-3xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-500 mx-auto flex items-center justify-center">
              <Box className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-charcoal-950 dark:text-white">
                No containers found
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-500 max-w-sm mx-auto">
                No inventory units match your current filter criteria. Try resetting your search or discuss a custom build with our team.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Button variant="outline" size="sm" onClick={handleResetFilters}>
                Reset Filters
              </Button>
              <Button variant="primary" size="sm" href="/custom-solutions">
                Request Custom Container
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Enquiry Modal */}
      <ContainerEnquiryModal
        container={selectedContainer}
        isOpen={Boolean(selectedContainer)}
        onClose={() => setSelectedContainer(null)}
      />
    </div>
  );
};
