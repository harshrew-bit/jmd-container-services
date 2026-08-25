import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, Hammer, ShieldCheck, Layers, ArrowRight, 
  MessageSquare, Phone, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { HeroSection } from '../components/home/HeroSection';
import { TransformationIntro } from '../components/home/TransformationIntro';
import { ProcessTimeline } from '../components/home/ProcessTimeline';
import { ReadyToDiscussCTA } from '../components/home/ReadyToDiscussCTA';
import { ContainerCard } from '../components/containers/ContainerCard';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectDetailModal } from '../components/projects/ProjectDetailModal';
import { ContainerEnquiryModal } from '../components/forms/ContainerEnquiryModal';
import { Button } from '../components/common/Button';
import { useContainers, useProjects, useBusinessInfo } from '../hooks/useData';
import { ContainerItem, ProjectItem } from '../types';

export const HomePage: React.FC = () => {
  const { containers, loading: loadingContainers } = useContainers();
  const { projects, loading: loadingProjects } = useProjects();
  const { businessInfo } = useBusinessInfo();

  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);
  const [selectedContainer, setSelectedContainer] = React.useState<ContainerItem | null>(null);

  // Available containers (first 3)
  const featuredContainers = containers.slice(0, 3);
  // Completed projects (first 3)
  const featuredProjects = projects.slice(0, 3);

  const pillars = [
    {
      icon: Box,
      title: 'Raw Container Sales',
      description:
        'Standard ISO dry freight containers in 10ft, 20ft, 40ft, and 40ft High Cube. Sourced and inspected for structural wind-and-water tightness.',
      link: '/containers',
      linkText: 'Browse Stock',
    },
    {
      icon: Hammer,
      title: 'Container Modifications',
      description:
        'Upgrades to existing shipping containers including structural cutouts, security doors, insulated paneling, commercial vinyl floors, and electrical wiring.',
      link: '/services',
      linkText: 'Explore Modifications',
    },
    {
      icon: Layers,
      title: 'Custom Fabricated Solutions',
      description:
        'Engineered container solutions built from the ground up to match non-standard architectural designs, dimensional requirements, or specific site constraints.',
      link: '/custom-solutions',
      linkText: 'Build Custom Solution',
    },
    {
      icon: ShieldCheck,
      title: 'Purpose-Built Modular Units',
      description:
        'Turnkey site offices, security guard cabins, commercial kiosks, and workshop storage pods delivered ready for immediate site plug-and-play use.',
      link: '/our-work',
      linkText: 'View Case Studies',
    },
  ];

  return (
    <div>
      <SEOHead
        title="Custom Container Solutions & Sales"
        description="JMD Container Services provides raw shipping containers, structural modifications, and custom fabricated container solutions built around your exact requirements."
      />

      {/* Hero Section */}
      <HeroSection />

      {/* 4 Core Pillars Section */}
      <section className="py-16 sm:py-20 bg-charcoal-50 dark:bg-charcoal-950 border-b border-charcoal-200 dark:border-charcoal-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 px-3 py-1 rounded-md border border-brand-200 dark:border-brand-800/60 inline-block">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-950 dark:text-white tracking-tight">
              What We Do at JMD Container Services
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300">
              Whether you need a raw container unit or a customized fabricated space, we provide comprehensive end-to-end container engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:border-brand-500/50"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center border border-brand-200 dark:border-brand-900 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <h3 className="text-lg font-bold text-charcoal-950 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-charcoal-100 dark:border-charcoal-800 mt-4">
                    <Link
                      to={pillar.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 dark:text-brand-400 group-hover:text-brand-600 transition-colors"
                    >
                      <span>{pillar.linkText}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Transformation Showcase */}
      <TransformationIntro />

      {/* Featured Available Containers Section */}
      <section className="py-16 sm:py-24 bg-charcoal-50 dark:bg-charcoal-950 border-b border-charcoal-200 dark:border-charcoal-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 px-3 py-1 rounded-md border border-brand-200 dark:border-brand-800/60 inline-block mb-2">
                Current Yard Stock
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-950 dark:text-white tracking-tight">
                Available Containers in Stock
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 mt-1">
                Inspected cargo containers ready for direct dispatch or custom conversion.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              href="/containers"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Full Inventory
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredContainers.map((container) => (
              <ContainerCard
                key={container.id}
                container={container}
                onEnquireClick={(c) => setSelectedContainer(c)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Process */}
      <ProcessTimeline />

      {/* Featured Projects / Our Work */}
      <section className="py-16 sm:py-24 bg-white dark:bg-charcoal-900 border-b border-charcoal-200 dark:border-charcoal-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 px-3 py-1 rounded-md border border-brand-200 dark:border-brand-800/60 inline-block mb-2">
                Portfolio Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-950 dark:text-white tracking-tight">
                Completed Fabrication Projects
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 mt-1">
                Explore real custom conversions built to customer specifications.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              href="/our-work"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View All Projects
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelectProject={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <ReadyToDiscussCTA />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

      {/* Container Enquiry Modal */}
      <ContainerEnquiryModal
        container={selectedContainer}
        isOpen={Boolean(selectedContainer)}
        onClose={() => setSelectedContainer(null)}
      />
    </div>
  );
};
