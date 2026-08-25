import React from 'react';
import { Sparkles, MessageSquare, ShieldCheck, Hammer, Layers, Ruler, CheckCircle2, Phone } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { PageHeader } from '../components/layout/PageHeader';
import { CustomSolutionForm } from '../components/forms/CustomSolutionForm';
import { getWhatsAppLink } from '../config/businessInfo';
import { useBusinessInfo } from '../hooks/useData';

export const CustomSolutionsPage: React.FC = () => {
  const { businessInfo } = useBusinessInfo();
  const phoneDisplay = businessInfo?.phone.display || '+91 87081 40861';
  const phoneRaw = businessInfo?.phone.raw || '+918708140861';
  const waNumber = businessInfo?.whatsapp.number || '918708140861';

  return (
    <div>
      <SEOHead
        title="Custom Container Solutions Builder & Quote"
        description="Design and configure your custom container solution. Select modifications, dimensions, insulation, and electrical provisions. We build around your requirements."
      />

      <PageHeader
        badge="Tailored Engineering"
        title="Custom Container Solutions"
        subtitle="Tell us what you need. From bespoke site offices to specialized industrial enclosures, our fabrication team builds container spaces engineered around your exact requirements."
        breadcrumbs={[{ label: 'Custom Solutions' }]}
        actions={
          <a
            href={getWhatsAppLink(undefined, waNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discuss on WhatsApp</span>
          </a>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
        {/* Core Value Proposition Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-brand-900 text-white shadow-xl relative overflow-hidden space-y-3">
          <div className="absolute inset-0 industrial-grid opacity-20 pointer-events-none" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-300">
            Guiding Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            "Tell us what you need. We build the container solution around your requirements."
          </h2>
          <p className="text-xs sm:text-sm text-brand-100/90 max-w-2xl leading-relaxed">
            Every site, business, and operation has unique constraints. We work collaboratively from floor plan sketches to structural steel fabrication and on-site delivery.
          </p>
        </div>

        {/* Main interactive form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <CustomSolutionForm />
          </div>

          {/* Right sidebar: What to expect */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-charcoal-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                What Happens Next?
              </h3>
              <ul className="space-y-3 text-xs text-charcoal-600 dark:text-charcoal-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-mono font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Our engineers review your requirements & modifications.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-mono font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>We confirm container sizing, structural feasibility, and layout.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-mono font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>You receive an itemized commercial quotation and estimated production timeline.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 space-y-3 text-xs">
              <h4 className="font-bold text-charcoal-950 dark:text-white uppercase font-mono tracking-wider">
                Direct Engineering Support
              </h4>
              <p className="text-charcoal-500">
                Have blueprints, architectural drawings, or technical specifications already prepared?
              </p>
              <div className="pt-2 space-y-2">
                <a
                  href={`tel:${phoneRaw}`}
                  className="flex items-center gap-2 font-bold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
