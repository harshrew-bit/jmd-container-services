import React from 'react';
import { MessageSquare, Phone, ArrowRight, ShieldCheck, Box } from 'lucide-react';
import { Button } from '../common/Button';
import { getWhatsAppLink } from '../../config/businessInfo';
import { useBusinessInfo } from '../../hooks/useData';

export const ReadyToDiscussCTA: React.FC = () => {
  const { businessInfo } = useBusinessInfo();
  const phoneDisplay = businessInfo?.phone.display || '+91 87081 40861';
  const phoneRaw = businessInfo?.phone.raw || '+918708140861';
  const waNumber = businessInfo?.whatsapp.number || '918708140861';

  return (
    <section className="py-16 sm:py-20 bg-brand-900 text-white relative overflow-hidden">
      {/* Background industrial pattern & glow */}
      <div className="absolute inset-0 industrial-grid opacity-15 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-charcoal-950/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950/60 border border-brand-500/40 text-brand-200 text-xs font-mono font-bold uppercase tracking-wider">
            <Box className="w-3.5 h-3.5 text-brand-400" />
            <span>Ready to discuss your project?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Tell Us What You Need. We Build Around Your Requirements.
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-brand-100/90 leading-relaxed max-w-2xl mx-auto">
            Whether you need a raw ISO shipping container, a customized site cabin, or a fabricated structure built to order — our fabrication team is ready to assist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="dark"
            size="lg"
            href="/custom-solutions"
            rightIcon={<ArrowRight className="w-5 h-5 text-brand-400" />}
          >
            Custom Solutions Builder
          </Button>

          <Button
            variant="whatsapp"
            size="lg"
            href={getWhatsAppLink(undefined, waNumber)}
            target="_blank"
            leftIcon={<MessageSquare className="w-5 h-5" />}
          >
            Chat on WhatsApp
          </Button>

          <Button
            variant="outline"
            size="lg"
            href={`tel:${phoneRaw}`}
            leftIcon={<Phone className="w-5 h-5 text-white" />}
            className="text-white border-white/30 hover:bg-white/10"
          >
            Call {phoneDisplay}
          </Button>
        </div>
      </div>
    </section>
  );
};
