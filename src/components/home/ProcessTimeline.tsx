import React from 'react';
import { MessageSquare, FileSpreadsheet, Hammer, Truck } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Requirement Consultation',
      description:
        'Tell us what you need. Share your dimensions, floor plan, intended site use, and required modifications.',
      icon: MessageSquare,
    },
    {
      step: '02',
      title: 'Solution Blueprint & Quote',
      description:
        'We determine the ideal container structure (raw or fabricated), engineer the layout, and prepare a transparent itemized quotation.',
      icon: FileSpreadsheet,
    },
    {
      step: '03',
      title: 'Precision Fabrication & Fitout',
      description:
        'Our fabrication bay executes all structural cutouts, reinforcements, thermal insulation, electrical wiring, and customized finishing.',
      icon: Hammer,
    },
    {
      step: '04',
      title: 'Quality Inspection & Delivery',
      description:
        'Every unit undergoes rigorous structural and weather-tightness inspection prior to yard dispatch and site delivery.',
      icon: Truck,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-charcoal-50 dark:bg-charcoal-950 border-b border-charcoal-200 dark:border-charcoal-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 px-3 py-1 rounded-md border border-brand-200 dark:border-brand-800/60 inline-block">
            Straightforward Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-950 dark:text-white tracking-tight">
            How We Build Your Container Solution
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300">
            A transparent four-step engineering workflow from initial concept discussion to turnkey delivery.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group hover:border-brand-500/50"
              >
                <div className="space-y-4">
                  {/* Step Number Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-brand-700 dark:text-brand-500">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 group-hover:bg-brand-700 group-hover:text-white transition-colors flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-charcoal-950 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-charcoal-100 dark:border-charcoal-800 text-[11px] font-mono text-charcoal-400">
                  Phase {idx + 1} of 4
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
