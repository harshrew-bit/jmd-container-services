import React from 'react';
import { ArrowRight, CheckCircle2, MessageSquare, Phone, Box, ShieldCheck, Hammer, Layers } from 'lucide-react';
import { Button } from '../common/Button';
import { getWhatsAppLink } from '../../config/businessInfo';
import { useBusinessInfo, useSiteMedia } from '../../hooks/useData';

export const HeroSection: React.FC = () => {
  const { businessInfo } = useBusinessInfo();
  const { media } = useSiteMedia();

  const phoneDisplay = businessInfo?.phone.display || '+91 87081 40861';
  const phoneRaw = businessInfo?.phone.raw || '+918708140861';
  const waNumber = businessInfo?.whatsapp.number || '918708140861';

  const heroBg = media?.heroImageUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85';

  return (
    <section className="relative bg-charcoal-950 text-white min-h-[90vh] flex items-center overflow-hidden border-b border-charcoal-800">
      {/* Background Image with Dark Vignette & Industrial Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="JMD Container Services Yard & Facility"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/90 to-charcoal-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-charcoal-950/80" />
        <div className="absolute inset-0 industrial-grid opacity-25" />
      </div>

      {/* Ambient Crimson Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-brand-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl space-y-8">
          {/* Top capability badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-950/80 border border-brand-700/60 text-brand-300 text-xs font-mono font-bold tracking-wider uppercase shadow-lg shadow-brand-950/50 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
            <span>Industrial Container Sales & Custom Fabrication</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Custom Container Solutions.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-rose-400">
                Built Around Your Requirements.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-charcoal-300 font-normal leading-relaxed max-w-2xl">
              From certified raw shipping containers to turnkey site offices, security cabins, and custom modular fabrication — we engineer container solutions tailored to your exact specifications.
            </p>
          </div>

          {/* Core Value Proposition Quote Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-charcoal-900/90 border border-charcoal-700/80 backdrop-blur-md space-y-1.5 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-brand-400 font-bold tracking-wider">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              Our Core Value Proposition
            </div>
            <p className="text-sm sm:text-base font-semibold text-white italic">
              "Tell us what you need. We build the container solution around your requirements."
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              href="/custom-solutions"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Discuss Your Requirement
            </Button>

            <Button
              variant="outline"
              size="lg"
              href="/containers"
              leftIcon={<Box className="w-5 h-5 text-brand-400" />}
            >
              View Available Inventory
            </Button>

            <Button
              variant="whatsapp"
              size="lg"
              href={getWhatsAppLink(undefined, waNumber)}
              target="_blank"
              leftIcon={<MessageSquare className="w-5 h-5" />}
            >
              WhatsApp Direct
            </Button>
          </div>

          {/* Four Core Pillars Footer Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-charcoal-800/80 text-xs text-charcoal-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>Raw Container Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>Custom Modifications</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>Built-from-Scratch</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>Turnkey Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
