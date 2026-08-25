import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Hammer, Layers, Cpu } from 'lucide-react';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { Button } from '../common/Button';

export const TransformationIntro: React.FC = () => {
  const sampleTransformation = {
    beforeImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    beforeLabel: 'Raw Cargo Container',
    afterLabel: 'Executive Site Office Solution',
    transformationSummary:
      'Raw 20ft high cube container converted with structural steel headers, 50mm insulation, commercial PVC interior paneling, wiring, and tinted double-glazed windows.',
  };

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-charcoal-900 border-b border-charcoal-200 dark:border-charcoal-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Transformation Story & Capabilities */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 px-3 py-1 rounded-md border border-brand-200 dark:border-brand-800/60 inline-block">
                Fabrication & Engineering Excellence
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-950 dark:text-white tracking-tight leading-tight">
                From Heavy-Duty Steel to Turnkey Functional Spaces
              </h2>
            </div>

            <p className="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
              We do not believe in one-size-fits-all containers. Whether you need a standard wind-and-water-tight cargo box for storage, or an engineered modular complex with full climate control, we construct every detail around your operational requirements.
            </p>

            {/* Feature Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-brand-200 dark:border-brand-900">
                  <Hammer className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal-950 dark:text-white">
                    Structural Steel Framing & Cutouts
                  </h4>
                  <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                    Box channel reinforcement on all window and door cutouts to preserve ISO structural strength.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-brand-200 dark:border-brand-900">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal-950 dark:text-white">
                    Thermal & Acoustic Insulation
                  </h4>
                  <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                    High-density Rockwool and PUF insulation fitted with fire-retardant interior wall panels.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-brand-200 dark:border-brand-900">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal-950 dark:text-white">
                    Electrical, HVAC & Interior Fitouts
                  </h4>
                  <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                    Concealed copper wiring, MCB distribution, LED panels, AC provisions, and commercial vinyl flooring.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <Button
                variant="primary"
                size="md"
                href="/our-work"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View More Transformation Projects
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive Before & After Slider */}
          <div className="lg:col-span-7">
            <div className="p-4 sm:p-6 rounded-3xl bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 shadow-xl">
              <BeforeAfterSlider
                data={sampleTransformation}
                title="Interactive Transformation Showcase"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
