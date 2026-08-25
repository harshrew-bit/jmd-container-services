import React, { useState } from 'react';
import { Send, MessageSquare, CheckCircle2, AlertCircle, Phone, User, Mail, MapPin } from 'lucide-react';
import { ContainerItem, ContainerEnquiryFormData } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { getContainerWhatsAppLink } from '../../config/businessInfo';
import { DataService } from '../../services/dataService';
import { useBusinessInfo } from '../../hooks/useData';

interface ContainerEnquiryModalProps {
  container: ContainerItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContainerEnquiryModal: React.FC<ContainerEnquiryModalProps> = ({
  container,
  isOpen,
  onClose,
}) => {
  const { businessInfo } = useBusinessInfo();
  const waNumber = businessInfo?.whatsapp.number || '918708140861';

  const [formData, setFormData] = useState<ContainerEnquiryFormData>({
    containerId: '',
    containerTitle: '',
    name: '',
    phone: '',
    email: '',
    company: '',
    deliveryLocation: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (container) {
      setFormData((prev) => ({
        ...prev,
        containerId: container.id,
        containerTitle: container.title,
      }));
      setIsSubmitted(false);
      setErrorMessage(null);
    }
  }, [container]);

  if (!container) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMessage('Please fill in your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Save enquiry to database/local service
      await DataService.submitEnquiry({
        type: 'container',
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        company: formData.company || undefined,
        containerId: container.id,
        containerTitle: container.title,
        containerSize: container.size,
        deliveryLocation: formData.deliveryLocation || undefined,
        message: formData.message || undefined,
      });

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit enquiry. Please try WhatsApp instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = getContainerWhatsAppLink(container.id, container.title, container.size, waNumber);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Container Enquiry & Quotation"
      subtitle={`Enquiring about: ${container.title} (${container.id})`}
      maxWidth="lg"
    >
      {isSubmitted ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-charcoal-950 dark:text-white">
              Enquiry Received!
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 max-w-sm mx-auto">
              Our team at JMD Container Services has received your request for <strong>{container.id}</strong>. We will review availability and contact you shortly.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="whatsapp"
              size="md"
              href={whatsappUrl}
              target="_blank"
              leftIcon={<MessageSquare className="w-4 h-4" />}
            >
              Continue on WhatsApp Now
            </Button>
            <Button variant="outline" size="md" onClick={onClose}>
              Close Window
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3 bg-brand-950/80 border border-brand-700/60 rounded-xl flex items-center gap-2 text-xs text-brand-200">
              <AlertCircle className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Quick container thumbnail info */}
          <div className="flex items-center gap-3 p-3 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 rounded-xl text-xs">
            <img
              src={container.primaryImage}
              alt={container.title}
              className="w-14 h-11 object-cover rounded-lg bg-charcoal-800 flex-shrink-0"
            />
            <div>
              <span className="font-bold text-charcoal-950 dark:text-white block">{container.title}</span>
              <span className="text-charcoal-500 font-mono">
                {container.id} • {container.size} • {container.condition}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                Your Full Name <span className="text-brand-600">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                Phone / WhatsApp Number <span className="text-brand-600">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                Delivery Location (City/Area)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Gurgaon, Haryana"
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
              Custom Requirements or Questions
            </label>
            <textarea
              rows={2}
              placeholder="Do you need any modifications (e.g. extra doors, paint, insulation) or specific delivery timelines?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Prefer chatting on WhatsApp directly?
            </a>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isSubmitting}
                rightIcon={<Send className="w-3.5 h-3.5" />}
              >
                Send Enquiry
              </Button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
};
