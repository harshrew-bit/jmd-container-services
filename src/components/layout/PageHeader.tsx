import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  breadcrumbs = [],
  actions,
}) => {
  return (
    <section className="relative bg-charcoal-50 dark:bg-charcoal-900 border-b border-charcoal-200 dark:border-charcoal-800 pt-10 pb-12 sm:pb-16 overflow-hidden transition-colors">
      {/* Background industrial grid & crimson ambient accent */}
      <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-700/5 dark:bg-brand-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb row */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-charcoal-500 font-mono mb-4">
          <Link to="/" className="hover:text-brand-700 dark:hover:text-brand-400 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-charcoal-400 dark:text-charcoal-600" />
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-brand-700 dark:hover:text-brand-400 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-charcoal-900 dark:text-white font-semibold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Main Title & Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-3xl">
            {badge && (
              <span className="inline-block px-3 py-1 mb-3 text-xs font-mono font-bold tracking-wider uppercase text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800/60 rounded-md">
                {badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-950 dark:text-white tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 text-sm sm:text-base lg:text-lg text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex-shrink-0 flex items-center gap-3">
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
