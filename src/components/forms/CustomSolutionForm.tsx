import React, { useState } from 'react';
import { 
  Send, MessageSquare, CheckCircle2, AlertCircle, Phone, 
  User, Mail, Building, Check, Sparkles, Box, ShieldCheck, Ruler 
} from 'lucide-react';
import { CustomSolutionFormData } from '../../types';
import { Button } from '../common/Button';
import { getCustomSolutionWhatsAppLink } from '../../config/businessInfo';
import { DataService } from '../../services/dataService';
import { useBusinessInfo } from '../../hooks/useData';

const MODIFICATION_OPTIONS = [
  'Insulation (Rockwool / PUF / Glasswool)',
  'Internal Panelling & Gypsum / PVC Finish',
  'Commercial Vinyl / Anti-Skid Metal Flooring',
  'Steel Security Doors & Lock-Boxes',
  'Double Glazed Windows & Heavy-Duty Grills',
  'Concealed Electrical Wiring & MCB Distribution',
  'LED Spot Lighting & Power Points',
  'AC Provision (Split / Window AC Cutout)',
  'Restroom / Plumbing & Sanitary Integration',
  'Custom Industrial Exterior Epoxy Paint',
];

export const CustomSolutionForm: React.FC = () => {
  const { businessInfo } = useBusinessInfo();
  const waNumber = businessInfo?.whatsapp.number || '918708140861';

  const [formData, setFormData] = useState<CustomSolutionFormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    lookingFor: 'Site Office',
    containerSize: '20ft High Cube',
    intendedUse: '',
    quantity: '1 Unit',
    modifications: [],
    description: '',
    preferredTimeline: 'Standard (2-3 Weeks)',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleModification = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      modifications: prev.modifications.includes(item)
        ? prev.modifications.filter((m) => m !== item)
        : [...prev.modifications, item],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMessage('Please fill in your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await DataService.submitEnquiry({
        type: 'custom_solution',
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        company: formData.company || undefined,
        lookingFor: formData.lookingFor,
        containerSize: formData.containerSize,
        intendedUse: formData.intendedUse || undefined,
        quantity: formData.quantity,
        modifications: formData.modifications,
        message: formData.description || undefined,
      });

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit requirement. Please use WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = `Hi JMD Container Services, I would like a quote for a custom container solution:
• Purpose: ${formData.lookingFor}
• Container Size: ${formData.containerSize}
• Intended Use: ${formData.intendedUse || 'Site deployment'}
• Quantity: ${formData.quantity}
• Modifications Needed: ${formData.modifications.length > 0 ? formData.modifications.join(', ') : 'Standard custom package'}
• Customer: ${formData.name || 'Interested Client'}`;

  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  if (isSubmitted) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-xl text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-charcoal-950 dark:text-white">
            Custom Requirement Submitted!
          </h3>
          <p className="text-sm text-charcoal-600 dark:text-charcoal-300 max-w-md mx-auto leading-relaxed">
            Thank you, <strong>{formData.name}</strong>. Our engineering & sales team at JMD Container Services has received your custom specifications for a <strong>{formData.lookingFor}</strong> ({formData.containerSize}).
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="whatsapp"
            size="lg"
            href={whatsappUrl}
            target="_blank"
            leftIcon={<MessageSquare className="w-5 h-5" />}
          >
            Open in WhatsApp for Faster Response
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                company: '',
                phone: '',
                email: '',
                lookingFor: 'Site Office',
                containerSize: '20ft High Cube',
                intendedUse: '',
                quantity: '1 Unit',
                modifications: [],
                description: '',
                preferredTimeline: 'Standard (2-3 Weeks)',
              });
            }}
          >
            Submit Another Specification
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-xl space-y-8 transition-colors"
    >
      {errorMessage && (
        <div className="p-4 bg-brand-950/80 border border-brand-700/60 rounded-2xl flex items-center gap-3 text-xs text-brand-200">
          <AlertCircle className="w-5 h-5 text-brand-400 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Step 1: Solution Type & Size */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-charcoal-200 dark:border-charcoal-800">
          <span className="w-6 h-6 rounded-full bg-brand-700 text-white font-mono text-xs flex items-center justify-center font-bold">
            1
          </span>
          <h3 className="font-bold text-base text-charcoal-950 dark:text-white uppercase tracking-wider">
            Container Purpose & Size Requirements
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
              Intended Purpose / Category
            </label>
            <select
              value={formData.lookingFor}
              onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
            >
              <option value="Site Office">Site Office / Meeting Pod</option>
              <option value="Security / Guard Cabin">Security / Guard Cabin</option>
              <option value="Commercial Kiosk / Cafe">Commercial Kiosk / Cafe / Shop</option>
              <option value="Storage / Workshop Unit">Storage / Workshop Unit</option>
              <option value="Sanitary / Toilet Unit">Sanitary / Toilet Unit</option>
              <option value="Raw Shipping Container">Raw Shipping Container Sale</option>
              <option value="Custom Fabricated Modular">Custom Fabricated Modular</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
              Container Size
            </label>
            <select
              value={formData.containerSize}
              onChange={(e) => setFormData({ ...formData, containerSize: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
            >
              <option value="10ft Compact">10ft Compact (10 × 8 × 8.5 ft)</option>
              <option value="20ft Standard">20ft Standard (20 × 8 × 8.5 ft)</option>
              <option value="20ft High Cube">20ft High Cube (20 × 8 × 9.5 ft)</option>
              <option value="40ft Standard">40ft Standard (40 × 8 × 8.5 ft)</option>
              <option value="40ft High Cube">40ft High Cube (40 × 8 × 9.5 ft)</option>
              <option value="Custom Fabricated Dimensions">Custom Fabricated Dimensions</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
              Quantity Needed
            </label>
            <select
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
            >
              <option value="1 Unit">1 Unit</option>
              <option value="2-4 Units">2 – 4 Units</option>
              <option value="5-10 Units">5 – 10 Units</option>
              <option value="Bulk Project (10+ Units)">Bulk Project (10+ Units)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step 2: Custom Engineering & Modification Options */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-charcoal-200 dark:border-charcoal-800">
          <span className="w-6 h-6 rounded-full bg-brand-700 text-white font-mono text-xs flex items-center justify-center font-bold">
            2
          </span>
          <h3 className="font-bold text-base text-charcoal-950 dark:text-white uppercase tracking-wider">
            Select Required Modifications & Features
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MODIFICATION_OPTIONS.map((item) => {
            const isSelected = formData.modifications.includes(item);
            return (
              <label
                key={item}
                onClick={() => toggleModification(item)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                  isSelected
                    ? 'bg-brand-50 dark:bg-brand-950/50 border-brand-600 dark:border-brand-700/80 text-charcoal-950 dark:text-white'
                    : 'bg-charcoal-50 dark:bg-charcoal-950 border-charcoal-200 dark:border-charcoal-800 text-charcoal-700 dark:text-charcoal-300 hover:border-charcoal-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 transition-colors flex-shrink-0 ${
                    isSelected
                      ? 'bg-brand-700 border-brand-700 text-white'
                      : 'border-charcoal-400 bg-white dark:bg-charcoal-900'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-xs sm:text-sm font-medium">{item}</span>
              </label>
            );
          })}
        </div>

        <div>
          <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
            Describe Your Specific Requirements, Layout, or Site Challenges
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Need a 2-room layout with partition, 2 windows with grills, heavy insulation for outdoor heat, and delivery to Manesar industrial yard."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
          />
        </div>
      </div>

      {/* Step 3: Customer Contact Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-charcoal-200 dark:border-charcoal-800">
          <span className="w-6 h-6 rounded-full bg-brand-700 text-white font-mono text-xs flex items-center justify-center font-bold">
            3
          </span>
          <h3 className="font-bold text-base text-charcoal-950 dark:text-white uppercase tracking-wider">
            Your Contact Information for Quotation
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
              Company / Organization (Optional)
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Company or Construction Firm"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submission Row */}
      <div className="pt-4 border-t border-charcoal-200 dark:border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5 font-semibold"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Or send these specs instantly via WhatsApp</span>
        </a>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          rightIcon={<Send className="w-4 h-4" />}
        >
          Submit Custom Requirement
        </Button>
      </div>
    </form>
  );
};
