import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, User, Mail, MessageSquare } from 'lucide-react';
import { GeneralContactFormData } from '../../types';
import { Button } from '../common/Button';
import { DataService } from '../../services/dataService';
import { getWhatsAppLink } from '../../config/businessInfo';
import { useBusinessInfo } from '../../hooks/useData';

export const GeneralContactForm: React.FC = () => {
  const { businessInfo } = useBusinessInfo();
  const waNumber = businessInfo?.whatsapp.number || '918708140861';

  const [formData, setFormData] = useState<GeneralContactFormData>({
    name: '',
    phone: '',
    email: '',
    subject: 'Container Purchase & Fabrication Enquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setErrorMessage('Please fill in your name, phone number, and message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await DataService.submitEnquiry({
        type: 'general',
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        subject: formData.subject,
        message: formData.message,
      });

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit contact message. Please try WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = `Hi JMD Container Services, my name is ${formData.name || 'a customer'}. I would like to inquire about "${formData.subject}". Message: ${formData.message || 'Please contact me.'}`;
  const whatsappUrl = getWhatsAppLink(whatsappMessage, waNumber);

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-xl text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-charcoal-950 dark:text-white">
          Message Sent Successfully!
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 max-w-sm mx-auto">
          Thank you for reaching out to JMD Container Services. We will respond to your query as soon as possible.
        </p>
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                phone: '',
                email: '',
                subject: 'Container Purchase & Fabrication Enquiry',
                message: '',
              });
            }}
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-xl space-y-5 transition-colors"
    >
      {errorMessage && (
        <div className="p-3.5 bg-brand-950/80 border border-brand-700/60 rounded-xl flex items-center gap-2.5 text-xs text-brand-200">
          <AlertCircle className="w-4 h-4 text-brand-400 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
          Your Name <span className="text-brand-600">*</span>
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full pl-10 pr-3.5 py-2.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
            Phone / WhatsApp Number <span className="text-brand-600">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
            Email Address (Optional)
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="you@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
          Subject
        </label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-3.5 py-2.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
          Your Message / Project Details <span className="text-brand-600">*</span>
        </label>
        <textarea
          rows={4}
          required
          placeholder="How can we assist you with shipping containers or custom fabrication?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
        />
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5 font-semibold"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Need immediate assistance? Chat on WhatsApp</span>
        </a>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          rightIcon={<Send className="w-4 h-4" />}
        >
          Send Message
        </Button>
      </div>
    </form>
  );
};
