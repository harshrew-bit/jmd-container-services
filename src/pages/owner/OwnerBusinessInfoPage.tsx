import React, { useState, useEffect } from 'react';
import { Settings, Check, AlertCircle, Phone, MessageSquare, Mail, MapPin, Clock } from 'lucide-react';
import { DataService } from '../../services/dataService';
import { BusinessContactInfo } from '../../types';
import { SEOHead } from '../../components/common/SEOHead';
import { Button } from '../../components/common/Button';

export const OwnerBusinessInfoPage: React.FC = () => {
  const [info, setInfo] = useState<BusinessContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadInfo = async () => {
    setLoading(true);
    try {
      const data = await DataService.fetchBusinessInfo();
      setInfo(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInfo();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!info) return;

    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);

    try {
      await DataService.saveBusinessInfo(info);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || 'Failed to save business settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !info) {
    return (
      <div className="py-12 text-center text-xs font-mono text-charcoal-400">
        Loading business settings...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <SEOHead title="Manage Business Information" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-200 dark:border-charcoal-800">
        <div>
          <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Configuration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-white">
            Business Information & Contact
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">
            Update phone numbers, WhatsApp links, business hours, and yard address without code deployments.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl flex items-center gap-3 text-xs text-emerald-200">
          <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>Business settings updated successfully! Public website reflects new contact details immediately.</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-brand-950/80 border border-brand-700/60 rounded-xl flex items-center gap-3 text-xs text-brand-200">
          <AlertCircle className="w-5 h-5 text-brand-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Business Identity */}
        <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-charcoal-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-brand-600" />
            Company Identity & Tagline
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                Full Business Name
              </label>
              <input
                type="text"
                required
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                Short Name / Brand
              </label>
              <input
                type="text"
                required
                value={info.shortName}
                onChange={(e) => setInfo({ ...info, shortName: e.target.value })}
                className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
              Tagline
            </label>
            <input
              type="text"
              required
              value={info.tagline}
              onChange={(e) => setInfo({ ...info, tagline: e.target.value })}
              className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
              Core Value Proposition
            </label>
            <input
              type="text"
              required
              value={info.coreValueProp}
              onChange={(e) => setInfo({ ...info, coreValueProp: e.target.value })}
              className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white font-medium"
            />
          </div>
        </div>

        {/* Section 2: Contact Numbers */}
        <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-charcoal-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-brand-600" />
            Phone, WhatsApp & Email Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                Display Phone Number
              </label>
              <input
                type="text"
                required
                value={info.phone.display}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    phone: { ...info.phone, display: e.target.value, isPlaceholder: false },
                  })
                }
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                Raw Tel String (e.g. +919876543210)
              </label>
              <input
                type="text"
                required
                value={info.phone.raw}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    phone: { ...info.phone, raw: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                WhatsApp Display Number
              </label>
              <input
                type="text"
                required
                value={info.whatsapp.display}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    whatsapp: { ...info.whatsapp, display: e.target.value, isPlaceholder: false },
                  })
                }
                className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                WhatsApp E.164 Number (no + or spaces, e.g. 919876543210)
              </label>
              <input
                type="text"
                required
                value={info.whatsapp.number}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    whatsapp: { ...info.whatsapp, number: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
              Business Email Address
            </label>
            <input
              type="email"
              required
              value={info.email.address}
              onChange={(e) =>
                setInfo({
                  ...info,
                  email: { display: e.target.value, address: e.target.value, isPlaceholder: false },
                })
              }
              className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white"
            />
          </div>
        </div>

        {/* Section 3: Yard Address & Hours */}
        <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-charcoal-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-brand-600" />
            Yard Facility Address & Operating Hours
          </h3>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
              Full Formatted Yard Address (Shown in footer & contact page)
            </label>
            <input
              type="text"
              required
              value={info.address.fullDisplay}
              onChange={(e) =>
                setInfo({
                  ...info,
                  address: { ...info.address, fullDisplay: e.target.value, isPlaceholder: false },
                })
              }
              className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                Weekdays
              </label>
              <input
                type="text"
                value={info.operatingHours.weekdays}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    operatingHours: { ...info.operatingHours, weekdays: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-lg text-xs text-charcoal-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                Saturday
              </label>
              <input
                type="text"
                value={info.operatingHours.saturday}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    operatingHours: { ...info.operatingHours, saturday: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-lg text-xs text-charcoal-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                Sunday
              </label>
              <input
                type="text"
                value={info.operatingHours.sunday}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    operatingHours: { ...info.operatingHours, sunday: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-lg text-xs text-charcoal-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-charcoal-200 dark:border-charcoal-800">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSaving}
            rightIcon={<Check className="w-4 h-4" />}
          >
            Save Business Details
          </Button>
        </div>
      </form>
    </div>
  );
};
