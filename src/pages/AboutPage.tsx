import React from 'react';
import { Box, Hammer, ShieldCheck, Layers, MapPin, CheckCircle2, ArrowRight, Phone } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/common/Button';
import { ReadyToDiscussCTA } from '../components/home/ReadyToDiscussCTA';
import { useBusinessInfo, useSiteMedia } from '../hooks/useData';

export const AboutPage: React.FC = () => {
  const { businessInfo } = useBusinessInfo();
  const { media } = useSiteMedia();

  const yardPhoto = media?.yardImageUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80';
  const workshopPhoto = media?.workshopImageUrl || 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80';
  const fullAddress = businessInfo?.address.fullDisplay || 'Container Yard & Fabrication Facility, Bawal Road, Rewari, Haryana';

  return (
    <div>
      <SEOHead
        title="About JMD Container Services | Yard & Custom Fabrication"
        description="Learn about JMD Container Services: our container yard, structural fabrication bays, and customer-first approach to delivering bespoke container spaces."
      />

      <PageHeader
        badge="About Our Company"
        title="About JMD Container Services"
        subtitle="Specialists in shipping container supply, heavy-duty structural modifications, and custom container fabrication built to order."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
        {/* Section 1: Who We Are & Guiding Principle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 px-3 py-1 rounded-md border border-brand-200 dark:border-brand-800/60 inline-block">
              Our Identity & Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-950 dark:text-white tracking-tight">
              A Direct, Practical Approach to Container Engineering
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
              JMD Container Services is an industrial container solutions provider operating dedicated container yard and structural fabrication facilities. We source, inspect, modify, and custom-fabricate shipping container structures for construction, commercial, industrial, and site infrastructure applications.
            </p>
            <p className="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
              Our business operates on a simple, customer-first commitment:
            </p>

            <div className="p-5 rounded-2xl bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 border-l-4 border-l-brand-600 space-y-1">
              <span className="text-xs font-mono uppercase text-brand-600 dark:text-brand-400 font-bold">
                Core Value Proposition
              </span>
              <p className="text-base font-bold text-charcoal-950 dark:text-white italic">
                "{businessInfo?.coreValueProp || 'Tell us what you need. We build the container solution around your requirements.'}"
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 shadow-xl">
              <img
                src={yardPhoto}
                alt="JMD Container Services Yard Facility"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-sm border border-white/10 text-white text-xs">
                <div className="flex items-center gap-2 font-bold mb-0.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-500" />
                  <span>Yard Location</span>
                </div>
                <p className="text-charcoal-300 text-[11px]">{fullAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: What Sets Our Work Apart */}
        <div className="bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
              Our Engineering Standards
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-white">
              Built with Integrity & Practical Durability
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                <Hammer className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-charcoal-950 dark:text-white">
                Structural Steel Framing
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                All cutouts for doors and windows are boxed with structural steel channel headers to prevent roof sagging and preserve ISO corner-post load bearing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-charcoal-950 dark:text-white">
                Wind & Water Tight Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                Containers undergo physical light and leak inspections. Door gaskets and locking rods are tested for secure operational locking.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-charcoal-950 dark:text-white">
                Turnkey Custom Interiors
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                From high-density Rockwool insulation to commercial PVC panelling, MCB distribution, and heavy-duty vinyl flooring, we build spaces ready for immediate occupancy.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Workshop Fabrication Bay */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 lg:order-2 space-y-5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
              Fabrication Facility
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-white">
              In-House Welding, Fitting & Finishing
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
              Our workshop bays handle the complete fabrication cycle in-house: steel cutting, mig welding, primer application, insulation layering, internal framing, and electrical testing.
            </p>
            <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
              Customers and procurement managers are welcome to visit our yard to inspect available stock, review ongoing fabrication projects, or discuss architectural blueprints in person.
            </p>
            <div className="pt-2">
              <Button variant="primary" size="md" href="/contact" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Visit Our Yard / Contact Us
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 shadow-xl">
              <img
                src={workshopPhoto}
                alt="JMD Fabrication Bay"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <ReadyToDiscussCTA />
    </div>
  );
};
