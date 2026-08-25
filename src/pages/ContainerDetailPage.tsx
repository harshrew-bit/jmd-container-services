import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Ruler, MapPin, CheckCircle2, ArrowRight, MessageSquare, 
  Phone, ArrowLeft, ShieldCheck, Box, Hammer, Check 
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { PageHeader } from '../components/layout/PageHeader';
import { ImageGallery } from '../components/common/ImageGallery';
import { StatusBadge, ConditionBadge, Tag } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ContainerEnquiryModal } from '../components/forms/ContainerEnquiryModal';
import { getContainerWhatsAppLink } from '../config/businessInfo';
import { useContainer, useBusinessInfo } from '../hooks/useData';

export const ContainerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { container, loading, error } = useContainer(id);
  const { businessInfo } = useBusinessInfo();

  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const phoneRaw = businessInfo?.phone.raw || '+918708140861';
  const waNumber = businessInfo?.whatsapp.number || '918708140861';

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-brand-700 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-charcoal-400">Loading container specifications...</p>
        </div>
      </div>
    );
  }

  if (!container || error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-500 mx-auto flex items-center justify-center">
          <Box className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-charcoal-950 dark:text-white">
          Container Not Found
        </h2>
        <p className="text-sm text-charcoal-500 max-w-sm mx-auto">
          The container ID "{id}" could not be located in our current database. It may have been sold or updated.
        </p>
        <div className="pt-2">
          <Button variant="primary" size="md" href="/containers">
            Back to Available Inventory
          </Button>
        </div>
      </div>
    );
  }

  const allImages = [
    container.primaryImage,
    ...(container.images || [])
  ].filter((v, i, a) => a.indexOf(v) === i);

  const whatsappUrl = getContainerWhatsAppLink(container.id, container.title, container.size, waNumber);

  return (
    <div>
      <SEOHead
        title={`${container.title} (${container.id})`}
        description={container.shortDescription}
      />

      <PageHeader
        badge={`Stock Ref: ${container.id}`}
        title={container.title}
        subtitle={`${container.size} • ${container.type} • ${container.condition}`}
        breadcrumbs={[
          { label: 'Available Containers', href: '/containers' },
          { label: container.id },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <StatusBadge status={container.status} />
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        {/* Top Grid: Media Gallery & Buy/Enquiry Action Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 7 cols: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <ImageGallery images={allImages} title={container.title} />

            {container.inspectionNotes && (
              <div className="p-4 rounded-xl bg-charcoal-100 dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 text-xs text-charcoal-700 dark:text-charcoal-300 space-y-1">
                <span className="font-bold text-brand-700 dark:text-brand-400 uppercase font-mono tracking-wider block">
                  Yard Inspection Notes:
                </span>
                <p>{container.inspectionNotes}</p>
              </div>
            )}
          </div>

          {/* Right 5 cols: Purchasing & Action Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-lg space-y-6">
              {/* Header inside card */}
              <div className="space-y-3 pb-4 border-b border-charcoal-100 dark:border-charcoal-800">
                <div className="flex items-center justify-between">
                  <ConditionBadge condition={container.condition} />
                  <span className="text-xs font-mono text-charcoal-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-600 dark:text-brand-500" />
                    {container.locationYard}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-charcoal-950 dark:text-white">
                  {container.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                  {container.shortDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="whatsapp"
                  size="lg"
                  fullWidth
                  href={whatsappUrl}
                  target="_blank"
                  leftIcon={<MessageSquare className="w-5 h-5" />}
                >
                  Enquire via WhatsApp
                </Button>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => setIsEnquiryModalOpen(true)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Official Quotation
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  href={`tel:${phoneRaw}`}
                  leftIcon={<Phone className="w-4 h-4 text-brand-600" />}
                >
                  Call Yard Office
                </Button>
              </div>

              {/* Verified Points */}
              <div className="pt-4 border-t border-charcoal-100 dark:border-charcoal-800 space-y-2 text-xs text-charcoal-600 dark:text-charcoal-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Physical inspection available at our yard</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Custom modifications can be quoted on this unit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Transportation & crane offloading assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications & Suitability */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 cols: Specs Table */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-bold text-charcoal-950 dark:text-white flex items-center gap-2">
              <Ruler className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              Technical Specifications & Dimensions
            </h3>

            <div className="bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-charcoal-100 dark:divide-charcoal-800 text-xs sm:text-sm">
                {container.specs.externalDimensions && (
                  <div className="p-4 grid grid-cols-2">
                    <span className="text-charcoal-500 font-medium">External Dimensions</span>
                    <span className="font-mono text-charcoal-950 dark:text-white font-semibold">
                      {container.specs.externalDimensions.length} (L) × {container.specs.externalDimensions.width} (W) × {container.specs.externalDimensions.height} (H)
                    </span>
                  </div>
                )}

                {container.specs.tareWeight && (
                  <div className="p-4 grid grid-cols-2">
                    <span className="text-charcoal-500 font-medium">Tare Weight (Empty)</span>
                    <span className="font-mono text-charcoal-950 dark:text-white font-semibold">
                      {container.specs.tareWeight}
                    </span>
                  </div>
                )}

                {container.specs.maxGrossWeight && (
                  <div className="p-4 grid grid-cols-2">
                    <span className="text-charcoal-500 font-medium">Max Gross Weight</span>
                    <span className="font-mono text-charcoal-950 dark:text-white font-semibold">
                      {container.specs.maxGrossWeight}
                    </span>
                  </div>
                )}

                {container.specs.floorType && (
                  <div className="p-4 grid grid-cols-2">
                    <span className="text-charcoal-500 font-medium">Floor Specification</span>
                    <span className="text-charcoal-950 dark:text-white">
                      {container.specs.floorType}
                    </span>
                  </div>
                )}

                {container.specs.wallStructure && (
                  <div className="p-4 grid grid-cols-2">
                    <span className="text-charcoal-500 font-medium">Wall & Roof Steel</span>
                    <span className="text-charcoal-950 dark:text-white">
                      {container.specs.wallStructure}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Full description */}
            {container.fullDescription && (
              <div className="p-6 bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 rounded-2xl space-y-2">
                <h4 className="font-bold text-sm text-charcoal-950 dark:text-white uppercase tracking-wider">
                  Detailed Structural Overview
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
                  {container.fullDescription}
                </p>
              </div>
            )}
          </div>

          {/* Right 5 cols: Suitable Applications & Custom Modification Ideas */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-4">
              <h4 className="font-bold text-sm text-charcoal-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Hammer className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                Recommended Applications
              </h4>
              <ul className="space-y-2.5">
                {(container.suitableFor || ['Site storage', 'Security cabin conversion', 'Industrial transport']).map((app, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-charcoal-700 dark:text-charcoal-300">
                    <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Solution Card */}
            <div className="p-6 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 space-y-3">
              <h4 className="font-bold text-sm text-brand-900 dark:text-brand-200">
                Want this unit modified for your site?
              </h4>
              <p className="text-xs text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
                We can customize this exact container with insulation, doors, glass windows, flooring, and electrical wiring.
              </p>
              <Button
                variant="primary"
                size="sm"
                href="/custom-solutions"
                fullWidth
              >
                Configure Custom Modifications
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <ContainerEnquiryModal
        container={container}
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </div>
  );
};
