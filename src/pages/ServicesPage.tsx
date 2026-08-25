import React from 'react';
import { 
  Box, Hammer, Layers, ShieldCheck, CheckCircle2, ArrowRight, 
  MessageSquare, Settings, Ruler, Wrench, Truck 
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/common/Button';
import { ReadyToDiscussCTA } from '../components/home/ReadyToDiscussCTA';
import { getWhatsAppLink } from '../config/businessInfo';
import { useBusinessInfo, useSiteMedia } from '../hooks/useData';

export const ServicesPage: React.FC = () => {
  const { businessInfo } = useBusinessInfo();
  const { media } = useSiteMedia();
  const waNumber = businessInfo?.whatsapp.number || '918708140861';

  const services = [
    {
      id: 'raw-sales',
      title: 'Raw Shipping Container Sales',
      tagline: 'Standard ISO dry freight cargo containers inspected and certified',
      icon: Box,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
      description:
        'We stock and supply standard shipping containers in 10ft, 20ft, 40ft, and 40ft High Cube specifications. Every unit is inspected for structural squareness, floor integrity, locking gear condition, and wind-and-water tightness.',
      offerings: [
        '10ft Compact Cargo Containers',
        '20ft Standard Dry Van Units (8.5ft height)',
        '40ft Standard & 40ft High Cube Units (9.5ft height)',
        'Cargo Worthy (CW) and New / One-Trip conditions',
        'Physical yard inspection before delivery',
      ],
      ctaText: 'Browse Available Containers',
      ctaLink: '/containers',
    },
    {
      id: 'modifications',
      title: 'Container Structural Modifications',
      tagline: 'Upgrading standard steel containers into custom functional spaces',
      icon: Hammer,
      image: media?.workshopImageUrl || 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
      description:
        'Transform standard shipping containers with heavy-duty structural steel cutouts, box-channel frame reinforcement, security doors, insulated interior panelling, and integrated electrical distribution.',
      offerings: [
        'Box steel reinforced door & window cutouts',
        'Rockwool & PUF thermal/acoustic insulation',
        'PVC / Gypsum / Fiber cement internal panelling',
        'Commercial vinyl & anti-skid metal flooring',
        'Concealed wiring, MCB boards & LED lighting',
        'AC cutouts & weatherhood ventilation',
      ],
      ctaText: 'Explore Custom Solutions',
      ctaLink: '/custom-solutions',
    },
    {
      id: 'custom-fabrication',
      title: 'Built-From-Scratch Container Solutions',
      tagline: 'Engineered modular container solutions designed around your dimensions',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      description:
        'When standard container dimensions or configurations do not meet your site requirements, our fabrication shop builds fully customized modular units from the ground up using heavy steel framing and corrugated panels.',
      offerings: [
        'Non-standard dimensions & custom multi-unit modular joins',
        'Multi-room layouts with internal partition walls',
        'Heavy-duty floor loading capacities',
        'Custom exterior color palettes & industrial coatings',
        'Site-ready plug-and-play hookups',
      ],
      ctaText: 'Request Custom Fabrication Quote',
      ctaLink: '/custom-solutions',
    },
    {
      id: 'purpose-built',
      title: 'Purpose-Built Modular Units',
      tagline: 'Ready-to-deploy site offices, guard cabins, and commercial pods',
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
      description:
        'Specialized turnkey container buildings constructed for construction sites, security checkpoints, commercial pop-up cafes, and on-site industrial workshops.',
      offerings: [
        'Turnkey Site Offices with meeting areas',
        'Security Guard Cabins with 360-degree vision',
        'Commercial Kiosks, Retail Pods & Cafes',
        'Secure Site Storage & Tool Workshop Units',
        'Sanitary & Restroom Container Modules',
      ],
      ctaText: 'View Project Portfolio',
      ctaLink: '/our-work',
    },
  ];

  return (
    <div>
      <SEOHead
        title="Our Container Services & Fabrication Capabilities"
        description="Explore JMD Container Services: raw container sales, structural modifications, custom fabrication from scratch, and turnkey modular site offices."
      />

      <PageHeader
        badge="What We Deliver"
        title="Our Services & Capabilities"
        subtitle="From certified raw shipping containers to fully engineered custom modular buildings, we construct solutions tailored around your exact operational needs."
        breadcrumbs={[{ label: 'Our Services' }]}
        actions={
          <Button
            variant="whatsapp"
            size="md"
            href={getWhatsAppLink(undefined, waNumber)}
            target="_blank"
            leftIcon={<MessageSquare className="w-4 h-4" />}
          >
            Chat with Engineer
          </Button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
        {/* Core Capabilities Loop */}
        <div className="space-y-16">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isEven = idx % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 rounded-3xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Image */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-750 shadow-md">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-brand-700 text-white flex items-center justify-center shadow-lg shadow-brand-700/30">
                      <Icon className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>

                {/* Content details */}
                <div className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-1' : ''}`}>
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
                      Capability 0{idx + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-white">
                      {service.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-charcoal-500">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bullet offerings */}
                  <div className="space-y-2 pt-2 border-t border-charcoal-100 dark:border-charcoal-800">
                    <h4 className="text-xs font-bold font-mono uppercase text-charcoal-700 dark:text-charcoal-300">
                      Key Highlights & Offerings:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.offerings.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-charcoal-700 dark:text-charcoal-300">
                          <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      href={service.ctaLink}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      {service.ctaText}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ReadyToDiscussCTA />
    </div>
  );
};
