import React from 'react';
import { Box, Home, ArrowLeft } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-charcoal-50 dark:bg-charcoal-950 px-4 py-20 transition-colors">
      <SEOHead title="Page Not Found (404)" />

      <div className="max-w-md w-full bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-900 flex items-center justify-center text-brand-600 dark:text-brand-400">
          <Box className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="text-3xl font-extrabold text-charcoal-950 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-charcoal-600 dark:text-charcoal-300">
            The page or container listing you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            size="md"
            href="/"
            leftIcon={<Home className="w-4 h-4" />}
          >
            Go to Homepage
          </Button>
          <Button
            variant="outline"
            size="md"
            href="/containers"
            leftIcon={<Box className="w-4 h-4" />}
          >
            Browse Containers
          </Button>
        </div>
      </div>
    </div>
  );
};
