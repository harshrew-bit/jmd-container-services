import React from 'react';
import { Link } from 'react-router-dom';
import { Ruler, MapPin, ArrowRight, MessageSquare, Box } from 'lucide-react';
import { ContainerItem } from '../../types';
import { StatusBadge, ConditionBadge } from '../common/Badge';
import { Button } from '../common/Button';
import { getContainerWhatsAppLink } from '../../config/businessInfo';
import { useBusinessInfo } from '../../hooks/useData';

interface ContainerCardProps {
  container: ContainerItem;
  onEnquireClick?: (container: ContainerItem) => void;
}

export const ContainerCard: React.FC<ContainerCardProps> = ({ container, onEnquireClick }) => {
  const { businessInfo } = useBusinessInfo();
  const waNumber = businessInfo?.whatsapp.number || '918708140861';
  const whatsappUrl = getContainerWhatsAppLink(container.id, container.title, container.size, waNumber);

  return (
    <div className="group bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 hover:border-brand-500/50 dark:hover:border-brand-700/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Image container with overlays */}
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-950">
        <img
          src={container.primaryImage}
          alt={container.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Status Badge top right */}
        <div className="absolute top-3 right-3">
          <StatusBadge status={container.status} />
        </div>

        {/* Container ID & Size tag top left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 text-xs font-mono font-bold bg-black/85 text-white rounded-lg backdrop-blur-sm border border-white/10">
            {container.size}
          </span>
          <span className="px-2 py-1 text-[11px] font-mono text-charcoal-300 bg-charcoal-900/90 rounded-lg backdrop-blur-sm border border-charcoal-700">
            {container.id}
          </span>
        </div>

        {/* Image count badge if multiple */}
        {container.images && container.images.length > 1 && (
          <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-white bg-black/70 px-2 py-0.5 rounded-md border border-white/10">
            {container.images.length} Photos
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Condition tag & Yard Location */}
          <div className="flex items-center justify-between text-xs gap-2">
            <ConditionBadge condition={container.condition} size="sm" />
            <span className="text-charcoal-500 dark:text-charcoal-400 font-mono flex items-center gap-1 truncate text-[11px]">
              <MapPin className="w-3 h-3 text-brand-600 dark:text-brand-500 flex-shrink-0" />
              {container.locationYard}
            </span>
          </div>

          {/* Container Title */}
          <h3 className="text-base sm:text-lg font-bold text-charcoal-950 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors leading-snug">
            <Link to={`/containers/${container.id}`}>{container.title}</Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 line-clamp-2 leading-relaxed">
            {container.shortDescription}
          </p>

          {/* Quick Specs Pill */}
          {container.specs.externalDimensions && (
            <div className="flex items-center gap-2 text-xs text-charcoal-600 dark:text-charcoal-400 bg-charcoal-100 dark:bg-charcoal-950 px-3 py-2 rounded-xl border border-charcoal-200 dark:border-charcoal-800">
              <Ruler className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 flex-shrink-0" />
              <span className="font-mono truncate">
                {container.specs.externalDimensions.length} × {container.specs.externalDimensions.width} × {container.specs.externalDimensions.height}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-charcoal-100 dark:border-charcoal-800 grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            href={`/containers/${container.id}`}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            View Specs
          </Button>

          <Button
            variant="whatsapp"
            size="sm"
            href={whatsappUrl}
            target="_blank"
            leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
          >
            Enquire
          </Button>
        </div>
      </div>
    </div>
  );
};
