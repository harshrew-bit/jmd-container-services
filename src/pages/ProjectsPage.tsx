import React, { useState } from 'react';
import { Sparkles, Box, ArrowRight, Filter } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { PageHeader } from '../components/layout/PageHeader';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectDetailModal } from '../components/projects/ProjectDetailModal';
import { ReadyToDiscussCTA } from '../components/home/ReadyToDiscussCTA';
import { Button } from '../components/common/Button';
import { useProjects } from '../hooks/useData';
import { ProjectItem, ProjectCategory } from '../types';

export const ProjectsPage: React.FC = () => {
  const { projects, loading } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: { label: string; value: string }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Site Offices', value: 'Site Offices' },
    { label: 'Security Cabins', value: 'Security & Guard Cabins' },
    { label: 'Commercial & Kiosks', value: 'Commercial & Kiosks' },
    { label: 'Storage & Workshops', value: 'Storage & Workshops' },
    { label: 'Custom Modular', value: 'Custom Modular' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <div>
      <SEOHead
        title="Our Work & Completed Container Projects"
        description="Explore completed container conversion projects by JMD Container Services: turnkey site offices, guard cabins, commercial kiosks, and custom modular fabrication."
      />

      <PageHeader
        badge="Fabrication Portfolio"
        title="Our Work & Project Showcase"
        subtitle="Explore real container transformations, architectural conversions, and bespoke industrial modular solutions delivered to client specifications."
        breadcrumbs={[{ label: 'Our Work' }]}
        actions={
          <Button
            variant="primary"
            size="md"
            href="/custom-solutions"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Start Your Project
          </Button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat.value
                  ? 'bg-brand-700 text-white shadow-md shadow-brand-700/20'
                  : 'bg-white dark:bg-charcoal-900 text-charcoal-700 dark:text-charcoal-300 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-3 border-brand-700 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-charcoal-400">Loading portfolio projects...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelectProject={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 rounded-3xl p-8 space-y-4">
            <p className="text-sm text-charcoal-500">No projects found in this category.</p>
            <Button variant="outline" size="sm" onClick={() => setSelectedCategory('all')}>
              Show All Projects
            </Button>
          </div>
        )}
      </div>

      <ReadyToDiscussCTA />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
