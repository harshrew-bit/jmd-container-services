import React, { useState, useEffect } from 'react';
import { Image, Upload, Check, AlertCircle, RefreshCw, Eye } from 'lucide-react';
import { DataService } from '../../services/dataService';
import { StorageService } from '../../services/storageService';
import { SiteMedia } from '../../types';
import { SEOHead } from '../../components/common/SEOHead';
import { Button } from '../../components/common/Button';

export const OwnerMediaPage: React.FC = () => {
  const [media, setMedia] = useState<SiteMedia>({
    heroImageUrl: '',
    yardImageUrl: '',
    workshopImageUrl: '',
    logoUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const data = await DataService.fetchSiteMedia();
      setMedia(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (key: keyof SiteMedia, file: File) => {
    try {
      const result = await StorageService.uploadImage(file, 'site-media', 'branding');
      setMedia((prev) => ({ ...prev, [key]: result.url }));
    } catch (err: any) {
      setError(err.message || 'Failed to upload media asset');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);

    try {
      await DataService.saveSiteMedia(media);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || 'Failed to save media changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <SEOHead title="Manage Website Media" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-200 dark:border-charcoal-800">
        <div>
          <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Brand Assets
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-white">
            Website Media Management
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">
            Update your homepage hero banner, yard inspection photos, and workshop images directly without editing code.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl flex items-center gap-3 text-xs text-emerald-200">
          <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>Website media settings saved successfully! Changes are live on the public website.</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-brand-950/80 border border-brand-700/60 rounded-xl flex items-center gap-3 text-xs text-brand-200">
          <AlertCircle className="w-5 h-5 text-brand-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Hero Banner Image */}
        <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-charcoal-950 dark:text-white">
                Homepage Hero Banner Image
              </h3>
              <p className="text-xs text-charcoal-500">
                Large background photo displayed behind the main headline on the homepage.
              </p>
            </div>
            <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-brand-700 hover:bg-brand-600 text-white text-xs font-bold flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              <span>Replace Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('heroImageUrl', e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>

          <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-charcoal-950 border border-charcoal-700">
            <img
              src={media.heroImageUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85'}
              alt="Hero Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Section 2: Yard & Workshop Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Yard Photo */}
          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-charcoal-950 dark:text-white">
                  Yard Facility Photo
                </h3>
                <p className="text-xs text-charcoal-500">About page & yard location showcase.</p>
              </div>
              <label className="cursor-pointer px-2.5 py-1.5 rounded-lg bg-charcoal-100 dark:bg-charcoal-800 hover:bg-charcoal-200 text-xs font-bold flex items-center gap-1">
                <Upload className="w-3 h-3 text-brand-600" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('yardImageUrl', e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-charcoal-950 border border-charcoal-700">
              <img
                src={media.yardImageUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80'}
                alt="Yard Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Workshop Photo */}
          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-charcoal-950 dark:text-white">
                  Fabrication Bay Photo
                </h3>
                <p className="text-xs text-charcoal-500">Services page & engineering visual.</p>
              </div>
              <label className="cursor-pointer px-2.5 py-1.5 rounded-lg bg-charcoal-100 dark:bg-charcoal-800 hover:bg-charcoal-200 text-xs font-bold flex items-center gap-1">
                <Upload className="w-3 h-3 text-brand-600" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('workshopImageUrl', e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-charcoal-950 border border-charcoal-700">
              <img
                src={media.workshopImageUrl || 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80'}
                alt="Workshop Preview"
                className="w-full h-full object-cover"
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
            Save Media Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
