import React from 'react';
import { Phone, MessageSquare, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '../../config/businessInfo';
import { useBusinessInfo } from '../../hooks/useData';

export const MobileStickyBar: React.FC = () => {
  const { businessInfo } = useBusinessInfo();

  const phoneRaw = businessInfo?.phone.raw || '+918708140861';
  const waNumber = businessInfo?.whatsapp.number || '918708140861';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-charcoal-950/95 backdrop-blur-md border-t border-charcoal-200 dark:border-charcoal-800 p-2 shadow-2xl safe-area-pb transition-colors">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Us Button */}
        <a
          href={`tel:${phoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-charcoal-100 dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 text-charcoal-900 dark:text-charcoal-100 active:bg-charcoal-200 dark:active:bg-charcoal-800 active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4 text-brand-600 dark:text-brand-400 mb-0.5" />
          <span className="text-[11px] font-bold">Call Us</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={getWhatsAppLink(undefined, waNumber)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 text-white active:bg-emerald-700 active:scale-95 transition-all text-center shadow-sm shadow-emerald-600/30"
        >
          <MessageSquare className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[11px] font-bold">WhatsApp</span>
        </a>

        {/* Custom Quote Link */}
        <Link
          to="/custom-solutions"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-brand-700 hover:bg-brand-600 text-white active:bg-brand-800 active:scale-95 transition-all text-center font-extrabold shadow-sm shadow-brand-700/25"
        >
          <FileText className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[11px] font-bold">Get Quote</span>
        </Link>
      </div>
    </div>
  );
};
