import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Search, Upload, X, Check, 
  Sparkles, AlertCircle, Box, Layers, Eye 
} from 'lucide-react';
import { DataService } from '../../services/dataService';
import { StorageService } from '../../services/storageService';
import { ProjectItem, ProjectCategory } from '../../types';
import { SEOHead } from '../../components/common/SEOHead';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Tag } from '../../components/common/Badge';

export const OwnerProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState<{
    id: string;
    title: string;
    category: ProjectCategory;
    shortDescription: string;
    fullDescription: string;
    primaryImage: string;
    galleryImages: string[];
    baseContainerType: string;
    modificationsText: string;
    intendedUse: string;
    hasBeforeAfter: boolean;
    beforeImage: string;
    afterImage: string;
    transformationSummary: string;
  }>({
    id: '',
    title: '',
    category: 'Site Offices',
    shortDescription: '',
    fullDescription: '',
    primaryImage: '',
    galleryImages: [],
    baseContainerType: '20ft High Cube Container',
    modificationsText: 'Structural box frame window opening\n50mm Rockwool thermal insulation\nConcealed electrical distribution\nCommercial vinyl flooring',
    intendedUse: '',
    hasBeforeAfter: true,
    beforeImage: '',
    afterImage: '',
    transformationSummary: 'Transformed a raw shipping container into a turnkey insulated office.',
  });

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await DataService.fetchProjects();
      setProjects(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddModal = () => {
    const nextId = `PRJ-${Date.now().toString(36).toUpperCase()}`;
    setEditingProject(null);
    setFormError(null);
    setFormData({
      id: nextId,
      title: '',
      category: 'Site Offices',
      shortDescription: '',
      fullDescription: '',
      primaryImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
      ],
      baseContainerType: '20ft High Cube Container',
      modificationsText: 'Structural steel window cutout header\n50mm Rockwool insulation\nConcealed electricals & MCB panel\nCommercial vinyl flooring',
      intendedUse: 'On-site engineering team office',
      hasBeforeAfter: true,
      beforeImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
      afterImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      transformationSummary: 'Transformed a raw container into a climate-controlled site office.',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProjectItem) => {
    setEditingProject(p);
    setFormError(null);
    setFormData({
      id: p.id,
      title: p.title,
      category: p.category,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      primaryImage: p.primaryImage,
      galleryImages: p.galleryImages || [p.primaryImage],
      baseContainerType: p.baseContainerType,
      modificationsText: (p.modificationsMade || []).join('\n'),
      intendedUse: p.intendedUse || '',
      hasBeforeAfter: Boolean(p.beforeAfter),
      beforeImage: p.beforeAfter?.beforeImage || '',
      afterImage: p.beforeAfter?.afterImage || '',
      transformationSummary: p.beforeAfter?.transformationSummary || '',
    });
    setIsModalOpen(true);
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    setFormError(null);

    try {
      for (const file of Array.from(files)) {
        const result = await StorageService.uploadImage(file, 'project-images', 'projects');
        setFormData((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, result.url],
          primaryImage: prev.primaryImage || result.url,
        }));
      }
    } catch (err: any) {
      setFormError(err.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleBeforeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await StorageService.uploadImage(file, 'project-images', 'before-after');
      setFormData((prev) => ({ ...prev, beforeImage: result.url }));
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  const handleAfterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await StorageService.uploadImage(file, 'project-images', 'before-after');
      setFormData((prev) => ({ ...prev, afterImage: result.url }));
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.id) {
      setFormError('Please enter project title and unique ID.');
      return;
    }

    setIsSaving(true);
    setFormError(null);

    try {
      const mods = formData.modificationsText
        .split('\n')
        .map((m) => m.trim())
        .filter(Boolean);

      const updatedProject: ProjectItem = {
        id: formData.id.trim(),
        title: formData.title.trim(),
        category: formData.category,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        primaryImage: formData.primaryImage || formData.galleryImages[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
        galleryImages: formData.galleryImages.length > 0 ? formData.galleryImages : [formData.primaryImage],
        baseContainerType: formData.baseContainerType,
        modificationsMade: mods,
        keyFeatures: mods.slice(0, 3),
        intendedUse: formData.intendedUse || 'Commercial / Industrial Site Deployment',
        beforeAfter: formData.hasBeforeAfter && formData.beforeImage && formData.afterImage
          ? {
              beforeImage: formData.beforeImage,
              afterImage: formData.afterImage,
              beforeLabel: 'Raw Container',
              afterLabel: 'Completed Solution',
              transformationSummary: formData.transformationSummary,
            }
          : undefined,
        featured: editingProject?.featured || false,
      };

      await DataService.saveProject(updatedProject);
      await loadProjects();
      setIsModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to remove project "${title}"?`)) {
      return;
    }

    try {
      await DataService.deleteProject(id);
      await loadProjects();
    } catch (err: any) {
      alert(`Error deleting project: ${err.message}`);
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <SEOHead title="Manage Portfolio Projects" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-200 dark:border-charcoal-800">
        <div>
          <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Portfolio Showcase
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-white">
            Our Work / Projects
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">
            Publish completed site offices, kiosks, guard cabins, and before & after container transformations.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={openAddModal}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add New Project
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="p-4 rounded-xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-700 rounded-lg text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-700 rounded-lg text-xs text-charcoal-700 dark:text-charcoal-300 focus:outline-none focus:border-brand-600"
          >
            <option value="all">All Categories</option>
            <option value="Site Offices">Site Offices</option>
            <option value="Security & Guard Cabins">Security & Guard Cabins</option>
            <option value="Commercial & Kiosks">Commercial & Kiosks</option>
            <option value="Storage & Workshops">Storage & Workshops</option>
            <option value="Custom Modular">Custom Modular</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] bg-charcoal-950">
                <img src={project.primaryImage} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <Tag variant="amber">{project.category}</Tag>
                </div>
                {project.beforeAfter && (
                  <div className="absolute top-3 right-3 bg-charcoal-950/80 border border-brand-600 text-brand-400 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    Before & After
                  </div>
                )}
              </div>

              <div className="p-5 space-y-2.5">
                <h3 className="font-bold text-base text-charcoal-950 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-xs text-charcoal-500 line-clamp-2">
                  {project.shortDescription}
                </p>
                <div className="text-[11px] font-mono text-charcoal-400">
                  Base: {project.baseContainerType}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center justify-between gap-2 mt-4">
              <span className="text-[11px] font-mono text-charcoal-400">{project.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(project)}
                  className="p-1.5 rounded-lg text-charcoal-600 dark:text-charcoal-300 hover:text-brand-600 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 transition-colors"
                  title="Edit project"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Completed Project'}
        subtitle="Manage portfolio project gallery, Before & After sliders, and engineering modifications"
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-6">
          {formError && (
            <div className="p-3.5 bg-brand-950/80 border border-brand-700/60 rounded-xl flex items-start gap-2.5 text-xs text-brand-200">
              <AlertCircle className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase mb-1">
                Project Title <span className="text-brand-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Executive Site Office & Meeting Pod"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
                className="w-full px-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
              >
                <option value="Site Offices">Site Offices</option>
                <option value="Security & Guard Cabins">Security & Guard Cabins</option>
                <option value="Commercial & Kiosks">Commercial & Kiosks</option>
                <option value="Storage & Workshops">Storage & Workshops</option>
                <option value="Custom Modular">Custom Modular</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase mb-1">
                Base Container Used
              </label>
              <input
                type="text"
                value={formData.baseContainerType}
                onChange={(e) => setFormData({ ...formData, baseContainerType: e.target.value })}
                placeholder="20ft High Cube Container"
                className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase mb-1">
                Intended Application
              </label>
              <input
                type="text"
                value={formData.intendedUse}
                onChange={(e) => setFormData({ ...formData, intendedUse: e.target.value })}
                placeholder="On-site project office"
                className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white"
              />
            </div>
          </div>

          {/* Gallery Photo Upload */}
          <div className="space-y-3 pt-2 border-t border-charcoal-200 dark:border-charcoal-800">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase">
                Project Gallery Photos ({formData.galleryImages.length})
              </label>
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-700 hover:bg-brand-600 text-white rounded-lg text-xs font-bold transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleGalleryUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {formData.galleryImages.map((img, idx) => (
                <div key={idx} className="relative rounded-xl overflow-hidden aspect-[4/3] bg-charcoal-950 border border-charcoal-700">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      const filtered = formData.galleryImages.filter((g) => g !== img);
                      setFormData({
                        ...formData,
                        galleryImages: filtered,
                        primaryImage: formData.primaryImage === img ? (filtered[0] || '') : formData.primaryImage,
                      });
                    }}
                    className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Before & After Option */}
          <div className="space-y-4 pt-2 border-t border-charcoal-200 dark:border-charcoal-800">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hasBeforeAfter"
                checked={formData.hasBeforeAfter}
                onChange={(e) => setFormData({ ...formData, hasBeforeAfter: e.target.checked })}
                className="rounded border-charcoal-700 text-brand-600 focus:ring-brand-600"
              />
              <label htmlFor="hasBeforeAfter" className="text-xs font-bold text-charcoal-900 dark:text-white uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-500" />
                Include Interactive Before & After Transformation Slider
              </label>
            </div>

            {formData.hasBeforeAfter && (
              <div className="p-4 rounded-xl bg-charcoal-100 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-charcoal-500 block mb-1">
                      Before Image (Raw Container)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBeforeUpload}
                      className="text-xs text-charcoal-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-charcoal-800 file:text-white"
                    />
                    {formData.beforeImage && (
                      <img src={formData.beforeImage} alt="Before" className="mt-2 h-20 w-full object-cover rounded-lg" />
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] text-charcoal-500 block mb-1">
                      After Image (Finished Build)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAfterUpload}
                      className="text-xs text-charcoal-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-charcoal-800 file:text-white"
                    />
                    {formData.afterImage && (
                      <img src={formData.afterImage} alt="After" className="mt-2 h-20 w-full object-cover rounded-lg" />
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-charcoal-500 block mb-1">
                    Transformation Summary
                  </label>
                  <input
                    type="text"
                    value={formData.transformationSummary}
                    onChange={(e) => setFormData({ ...formData, transformationSummary: e.target.value })}
                    placeholder="Brief description of the transformation..."
                    className="w-full px-3 py-1.5 bg-white dark:bg-charcoal-900 border border-charcoal-300 dark:border-charcoal-700 rounded-lg text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Descriptions */}
          <div>
            <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase mb-1">
              Short Description
            </label>
            <textarea
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Brief project summary..."
              className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase mb-1">
              Key Modifications (One item per line)
            </label>
            <textarea
              rows={3}
              value={formData.modificationsText}
              onChange={(e) => setFormData({ ...formData, modificationsText: e.target.value })}
              placeholder="50mm Rockwool insulation&#10;Steel security door&#10;Double glazed sliding window"
              className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white font-mono"
            />
          </div>

          <div className="pt-4 border-t border-charcoal-200 dark:border-charcoal-800 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSaving}
              rightIcon={<Check className="w-4 h-4" />}
            >
              {editingProject ? 'Save Changes' : 'Publish Project'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
