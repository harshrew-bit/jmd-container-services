import React from 'react';
import { Layers, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../../types';
import { Modal } from '../common/Modal';
import { Tag } from '../common/Badge';
import { ImageGallery } from '../common/ImageGallery';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { Button } from '../common/Button';
import { getWhatsAppLink } from '../../config/businessInfo';
import { useBusinessInfo } from '../../hooks/useData';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const { businessInfo } = useBusinessInfo();
  if (!project) return null;

  const allImages = [
    project.primaryImage,
    ...(project.galleryImages || [])
  ].filter((v, i, a) => a.indexOf(v) === i);

  const waNumber = businessInfo?.whatsapp.number || '918708140861';
  const whatsappMessage = `Hi JMD Container Services, I saw your project "${project.title}" (${project.category}). I have a similar container requirement and would like to discuss feasibility and quote.`;
  const whatsappUrl = getWhatsAppLink(whatsappMessage, waNumber);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      subtitle={`Category: ${project.category} • Base: ${project.baseContainerType}`}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Visual Showcase: Before/After or Multi-Image Gallery */}
        {project.beforeAfter ? (
          <div className="space-y-4">
            <BeforeAfterSlider
              data={project.beforeAfter}
              title="Container Transformation"
            />
            {allImages.length > 1 && (
              <div className="pt-2">
                <h4 className="text-xs uppercase font-mono tracking-wider text-charcoal-500 font-bold mb-2">
                  Additional Project Photos
                </h4>
                <ImageGallery images={allImages} title={project.title} />
              </div>
            )}
          </div>
        ) : (
          <ImageGallery images={allImages} title={project.title} />
        )}

        {/* Project Description & Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-charcoal-200 dark:border-charcoal-800">
          {/* Left 2 cols: Overview & Modifications */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-charcoal-950 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded bg-brand-600" />
                Project Overview & Execution
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {project.modificationsMade && project.modificationsMade.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-mono tracking-wider text-charcoal-500 font-bold">
                  Custom Engineering & Modifications Implemented:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.modificationsMade.map((mod, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-charcoal-800 dark:text-charcoal-300 bg-charcoal-100 dark:bg-charcoal-950 p-2.5 rounded-xl border border-charcoal-200 dark:border-charcoal-800 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right col: Intended Use & CTAs */}
          <div className="space-y-4 bg-charcoal-50 dark:bg-charcoal-950 p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-500 block mb-1">
                  Category
                </span>
                <Tag variant="crimson">{project.category}</Tag>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-500 block mb-1">
                  Base Container
                </span>
                <div className="text-xs font-semibold text-charcoal-900 dark:text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                  {project.baseContainerType}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-500 block mb-1">
                  Intended Application
                </span>
                <p className="text-xs text-charcoal-700 dark:text-charcoal-300">
                  {project.intendedUse}
                </p>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="space-y-2 pt-4 border-t border-charcoal-200 dark:border-charcoal-800">
              <p className="text-[11px] text-charcoal-500 text-center">
                Need a similar container built for your site?
              </p>
              <Button
                variant="whatsapp"
                size="sm"
                fullWidth
                href={whatsappUrl}
                target="_blank"
                leftIcon={<MessageSquare className="w-4 h-4" />}
              >
                Discuss This Build on WhatsApp
              </Button>
              <Button
                variant="primary"
                size="sm"
                fullWidth
                href="/custom-solutions"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Request Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
