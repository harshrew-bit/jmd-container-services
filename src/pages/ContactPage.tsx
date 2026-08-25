import React from 'react';
import { Phone, MessageSquare, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck, Box } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { PageHeader } from '../components/layout/PageHeader';
import { GeneralContactForm } from '../components/forms/GeneralContactForm';
import { Button } from '../components/common/Button';
import { getWhatsAppLink } from '../config/businessInfo';
import { useBusinessInfo } from '../hooks/useData';

export const ContactPage: React.FC = () => {
  const { businessInfo } = useBusinessInfo();

  const phoneDisplay = businessInfo?.phone.display || '+91 87081 40861';
  const phoneRaw = businessInfo?.phone.raw || '+918708140861';
  const waDisplay = businessInfo?.whatsapp.display || '+91 87081 40861';
  const waNumber = businessInfo?.whatsapp.number || '918708140861';
  const emailDisplay = businessInfo?.email.display || 'jmdcontainer@gmail.com';
  const emailAddress = businessInfo?.email.address || 'jmdcontainer@gmail.com';
  const fullAddress = businessInfo?.address.fullDisplay || 'Container Yard & Fabrication Facility, Bawal Road, Rewari, Haryana - 123401';
  const weekdays = businessInfo?.operatingHours.weekdays || 'Monday – Friday: 9:00 AM – 7:00 PM';
  const saturday = businessInfo?.operatingHours.saturday || 'Saturday: 9:00 AM – 5:00 PM';
  const sunday = businessInfo?.operatingHours.sunday || 'Sunday: Closed / By Appointment';

  return (
    <div>
      <SEOHead
        title="Contact JMD Container Services | Yard & Phone"
        description="Contact JMD Container Services for container sales, modification quotes, or yard visits. Reach us via phone, WhatsApp, or visit our facility."
      />

      <PageHeader
        badge="Direct Communication"
        title="Contact & Yard Location"
        subtitle="Get in touch with our container engineering & sales team. Visit our yard facility, call directly, or submit your project details below."
        breadcrumbs={[{ label: 'Contact Us' }]}
        actions={
          <Button
            variant="whatsapp"
            size="md"
            href={getWhatsAppLink(undefined, waNumber)}
            target="_blank"
            leftIcon={<MessageSquare className="w-4 h-4" />}
          >
            Chat on WhatsApp
          </Button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left 5 cols: Direct Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
                  Direct Inquiries
                </span>
                <h3 className="text-xl font-bold text-charcoal-950 dark:text-white">
                  Get In Touch Directly
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Phone Call */}
                <a
                  href={`tel:${phoneRaw}`}
                  className="p-4 rounded-2xl bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 flex items-start gap-3 hover:border-brand-500 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-charcoal-500 block">Phone Support</span>
                    <strong className="text-charcoal-950 dark:text-white text-sm">{phoneDisplay}</strong>
                    <span className="text-xs text-charcoal-500 block mt-0.5">Direct line to yard manager</span>
                  </div>
                </a>

                {/* WhatsApp Chat */}
                <a
                  href={getWhatsAppLink(undefined, waNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3 hover:border-emerald-500 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-700 dark:text-emerald-400 font-bold block">
                      WhatsApp Quick Response
                    </span>
                    <strong className="text-charcoal-950 dark:text-white text-sm">{waDisplay}</strong>
                    <span className="text-xs text-emerald-700 dark:text-emerald-300 block mt-0.5">
                      Send photos, sketches & voice notes
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${emailAddress}`}
                  className="p-4 rounded-2xl bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 flex items-start gap-3 hover:border-brand-500 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-charcoal-500 block">Email Inquiries</span>
                    <strong className="text-charcoal-950 dark:text-white text-sm break-all">{emailDisplay}</strong>
                    <span className="text-xs text-charcoal-500 block mt-0.5">For formal tender requests & RFQs</span>
                  </div>
                </a>

                {/* Yard Address */}
                <div className="p-4 rounded-2xl bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-charcoal-500 block">Yard Facility</span>
                    <p className="text-xs sm:text-sm text-charcoal-900 dark:text-white font-medium leading-relaxed">
                      {fullAddress}
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="p-4 rounded-2xl bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-mono uppercase text-charcoal-500 block">Operating Hours</span>
                    <div className="text-charcoal-900 dark:text-white font-semibold">{weekdays}</div>
                    <div className="text-charcoal-600 dark:text-charcoal-400">{saturday}</div>
                    <div className="text-charcoal-500">{sunday}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 cols: Contact Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
                Online Message
              </span>
              <h3 className="text-2xl font-extrabold text-charcoal-950 dark:text-white">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400">
                Fill out the form below and our team will get back to you with container availability or custom fabrication guidance.
              </p>
            </div>

            <GeneralContactForm />
          </div>
        </div>

        {/* Map / Yard Directions Section */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-charcoal-950 dark:text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                Yard Location & Directions
              </h3>
              <p className="text-xs text-charcoal-500">
                {fullAddress}
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Rewari+Haryana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-brand-700 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>Open in Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800">
            <iframe
              title="JMD Container Services Yard Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112345.54589234857!2d76.55!3d28.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d4021ef3765ff%3A0xb3bc87e91404cbb8!2sRewari%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
