import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Search, Filter, Upload, X, Check, 
  Image, AlertCircle, CheckCircle2, Ruler, Eye, ArrowLeft 
} from 'lucide-react';
import { DataService } from '../../services/dataService';
import { StorageService } from '../../services/storageService';
import { ContainerItem, ContainerSize, ContainerType, ContainerCondition, ContainerStatus } from '../../types';
import { StatusBadge, ConditionBadge } from '../../components/common/Badge';
import { SEOHead } from '../../components/common/SEOHead';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

export const OwnerContainersPage: React.FC = () => {
  const [containers, setContainers] = useState<ContainerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContainer, setEditingContainer] = useState<ContainerItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form inputs
  const [formData, setFormData] = useState<{
    id: string;
    title: string;
    size: ContainerSize;
    type: ContainerType;
    condition: ContainerCondition;
    status: ContainerStatus;
    featured: boolean;
    shortDescription: string;
    fullDescription: string;
    primaryImage: string;
    images: string[];
    locationYard: string;
    inspectionNotes: string;
    extLength: string;
    extWidth: string;
    extHeight: string;
    tareWeight: string;
    maxGrossWeight: string;
    floorType: string;
    wallStructure: string;
  }>({
    id: '',
    title: '',
    size: '20ft',
    type: 'Standard Dry Van',
    condition: 'Cargo Worthy (CW)',
    status: 'Available',
    featured: false,
    shortDescription: '',
    fullDescription: '',
    primaryImage: '',
    images: [],
    locationYard: 'Main Yard',
    inspectionNotes: '',
    extLength: '20ft 0in (6.06m)',
    extWidth: '8ft 0in (2.44m)',
    extHeight: '8ft 6in (2.59m)',
    tareWeight: '2,200 kg',
    maxGrossWeight: '30,480 kg',
    floorType: '28mm Heavy-Duty Marine Plywood',
    wallStructure: '14-Gauge Corrugated Corten Steel Panels',
  });

  const loadContainers = async () => {
    setLoading(true);
    try {
      const data = await DataService.fetchContainers();
      setContainers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContainers();
  }, []);

  const openAddModal = () => {
    const nextId = `JMD-CONT-${Math.floor(100 + Math.random() * 900)}`;
    setEditingContainer(null);
    setFormError(null);
    setFormData({
      id: nextId,
      title: '',
      size: '20ft',
      type: 'Standard Dry Van',
      condition: 'Cargo Worthy (CW)',
      status: 'Available',
      featured: false,
      shortDescription: '',
      fullDescription: '',
      primaryImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
      ],
      locationYard: 'Main Yard',
      inspectionNotes: 'Inspected for structural integrity and wind/water tightness.',
      extLength: '20ft 0in (6.06m)',
      extWidth: '8ft 0in (2.44m)',
      extHeight: '8ft 6in (2.59m)',
      tareWeight: '2,200 kg',
      maxGrossWeight: '30,480 kg',
      floorType: '28mm Marine Grade Plywood',
      wallStructure: 'Corten Steel Panels',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (c: ContainerItem) => {
    setEditingContainer(c);
    setFormError(null);
    setFormData({
      id: c.id,
      title: c.title,
      size: c.size,
      type: c.type,
      condition: c.condition,
      status: c.status,
      featured: c.featured || false,
      shortDescription: c.shortDescription,
      fullDescription: c.fullDescription,
      primaryImage: c.primaryImage,
      images: c.images || [c.primaryImage],
      locationYard: c.locationYard || 'Main Yard',
      inspectionNotes: c.inspectionNotes || '',
      extLength: c.specs.externalDimensions?.length || '',
      extWidth: c.specs.externalDimensions?.width || '',
      extHeight: c.specs.externalDimensions?.height || '',
      tareWeight: c.specs.tareWeight || '',
      maxGrossWeight: c.specs.maxGrossWeight || '',
      floorType: c.specs.floorType || '',
      wallStructure: c.specs.wallStructure || '',
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    setFormError(null);

    try {
      const fileList = Array.from(files);
      for (const file of fileList) {
        const result = await StorageService.uploadImage(file, 'container-images', 'containers');
        setFormData((prev) => {
          const nextImages = [...prev.images, result.url];
          return {
            ...prev,
            images: nextImages,
            primaryImage: prev.primaryImage || result.url,
          };
        });
      }
    } catch (err: any) {
      setFormError(err.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const removeImage = (imgUrl: string) => {
    setFormData((prev) => {
      const filtered = prev.images.filter((img) => img !== imgUrl);
      return {
        ...prev,
        images: filtered,
        primaryImage: prev.primaryImage === imgUrl ? (filtered[0] || '') : prev.primaryImage,
      };
    });
  };

  const setPrimaryImage = (imgUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      primaryImage: imgUrl,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.id) {
      setFormError('Please enter a container title and unique reference ID.');
      return;
    }

    setIsSaving(true);
    setFormError(null);

    try {
      const updatedItem: ContainerItem = {
        id: formData.id.trim(),
        title: formData.title.trim(),
        size: formData.size,
        type: formData.type,
        condition: formData.condition,
        status: formData.status,
        featured: formData.featured,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        primaryImage: formData.primaryImage || formData.images[0] || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
        images: formData.images.length > 0 ? formData.images : [formData.primaryImage],
        specs: {
          externalDimensions: {
            length: formData.extLength,
            width: formData.extWidth,
            height: formData.extHeight,
          },
          tareWeight: formData.tareWeight,
          maxGrossWeight: formData.maxGrossWeight,
          floorType: formData.floorType,
          wallStructure: formData.wallStructure,
        },
        features: editingContainer?.features || ['Corten anti-corrosive body', 'Lock box provision', 'Wind & water tight'],
        suitableFor: editingContainer?.suitableFor || ['Site storage', 'Commercial conversion', 'Transport'],
        locationYard: formData.locationYard,
        inspectionNotes: formData.inspectionNotes,
      };

      await DataService.saveContainer(updatedItem);
      await loadContainers();
      setIsModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'Failed to save container');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to remove container "${title}" (${id})?`)) {
      return;
    }

    try {
      await DataService.deleteContainer(id);
      await loadContainers();
    } catch (err: any) {
      alert(`Error deleting container: ${err.message}`);
    }
  };

  const handleStatusQuickChange = async (c: ContainerItem, newStatus: ContainerStatus) => {
    try {
      await DataService.saveContainer({ ...c, status: newStatus });
      await loadContainers();
    } catch (err: any) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  // Filtered list
  const filteredList = containers.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.size.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <SEOHead title="Manage Available Containers" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-200 dark:border-charcoal-800">
        <div>
          <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Inventory Database
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-white">
            Available Containers
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">
            Add new inventory, upload container photos, update dimensions, and change availability.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={openAddModal}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Container Listing
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, title, or size..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-700 rounded-lg text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-700 rounded-lg text-xs text-charcoal-700 dark:text-charcoal-300 focus:outline-none focus:border-brand-600"
          >
            <option value="all">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Sold">Sold</option>
          </select>
          <span className="text-xs font-mono text-charcoal-500 whitespace-nowrap">
            {filteredList.length} items
          </span>
        </div>
      </div>

      {/* Inventory Table / Cards */}
      <div className="bg-white dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-charcoal-50 dark:bg-charcoal-950/80 border-b border-charcoal-200 dark:border-charcoal-800 text-[11px] font-mono uppercase text-charcoal-500">
              <tr>
                <th className="py-3.5 px-4">Container</th>
                <th className="py-3.5 px-4">Size & Type</th>
                <th className="py-3.5 px-4">Condition</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Yard Location</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100 dark:divide-charcoal-800">
              {filteredList.map((container) => (
                <tr key={container.id} className="hover:bg-charcoal-50 dark:hover:bg-charcoal-850/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={container.primaryImage}
                        alt={container.title}
                        className="w-12 h-10 rounded-lg object-cover bg-charcoal-200 dark:bg-charcoal-800 flex-shrink-0"
                      />
                      <div>
                        <div className="font-bold text-charcoal-950 dark:text-white">
                          {container.title}
                        </div>
                        <div className="text-[11px] font-mono text-charcoal-500">
                          {container.id} {container.featured && '• ⭐ Featured'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-charcoal-900 dark:text-charcoal-200 block">
                      {container.size}
                    </span>
                    <span className="text-[11px] text-charcoal-500">{container.type}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <ConditionBadge condition={container.condition} size="sm" />
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={container.status}
                      onChange={(e) => handleStatusQuickChange(container, e.target.value as ContainerStatus)}
                      className="px-2 py-1 text-xs font-semibold rounded bg-charcoal-100 dark:bg-charcoal-800 border border-charcoal-300 dark:border-charcoal-700 text-charcoal-900 dark:text-white focus:outline-none"
                    >
                      <option value="Available">Available</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-charcoal-600 dark:text-charcoal-400 font-mono text-xs">
                    {container.locationYard}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(container)}
                        className="p-1.5 rounded-lg text-charcoal-600 dark:text-charcoal-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 transition-colors"
                        title="Edit container details & photos"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(container.id, container.title)}
                        className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Container Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingContainer ? `Edit Container: ${editingContainer.title}` : 'Add New Container Listing'}
        subtitle="Manage specifications, availability, and high-resolution photo uploads"
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-6">
          {formError && (
            <div className="p-3.5 bg-brand-950/80 border border-brand-700/60 rounded-xl flex items-start gap-2.5 text-xs text-brand-200">
              <AlertCircle className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          {/* Core Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase mb-1">
                Container Title <span className="text-brand-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 20ft Standard Dry Cargo Container"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase mb-1">
                Container ID / Yard Ref <span className="text-brand-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. JMD-20-001"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white font-mono focus:outline-none focus:border-brand-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase mb-1">
                Size
              </label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value as ContainerSize })}
                className="w-full px-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
              >
                <option value="10ft">10ft Compact</option>
                <option value="20ft">20ft Standard</option>
                <option value="40ft">40ft Standard</option>
                <option value="40ft HC">40ft High Cube</option>
                <option value="Custom">Custom Size</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase mb-1">
                Condition
              </label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value as ContainerCondition })}
                className="w-full px-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
              >
                <option value="New / One-Trip">New / One-Trip</option>
                <option value="Cargo Worthy (CW)">Cargo Worthy (CW)</option>
                <option value="Wind & Water Tight (WWT)">Wind & Water Tight (WWT)</option>
                <option value="As-Is / Used">As-Is / Used</option>
                <option value="Custom Built">Custom Built</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase mb-1">
                Availability Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ContainerStatus })}
                className="w-full px-3 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
              >
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>

          {/* Photo Management */}
          <div className="space-y-3 pt-2 border-t border-charcoal-200 dark:border-charcoal-800">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase">
                Container Photos ({formData.images.length})
              </label>
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-700 hover:bg-brand-600 text-white rounded-lg text-xs font-bold transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingImage ? 'Uploading...' : 'Upload Photos'}</span>
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            </div>

            {/* Thumbnail previews grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {formData.images.map((img, idx) => {
                const isCover = formData.primaryImage === img;
                return (
                  <div
                    key={idx}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] bg-charcoal-950 border-2 group ${
                      isCover ? 'border-brand-600 ring-2 ring-brand-600/30' : 'border-charcoal-700'
                    }`}
                  >
                    <img src={img} alt={`Uploaded ${idx}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {!isCover && (
                        <button
                          type="button"
                          onClick={() => setPrimaryImage(img)}
                          className="p-1 rounded bg-white text-charcoal-900 text-[10px] font-bold"
                          title="Set as cover image"
                        >
                          Cover
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(img)}
                        className="p-1 rounded bg-rose-600 text-white text-[10px]"
                        title="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {isCover && (
                      <span className="absolute bottom-1 left-1 bg-brand-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        Cover
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase mb-1">
              Short Description (Card Summary)
            </label>
            <textarea
              rows={2}
              placeholder="Brief summary displayed on catalog cards..."
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 dark:text-charcoal-300 uppercase mb-1">
              Full Description & Specifications
            </label>
            <textarea
              rows={4}
              placeholder="Full structural details, flooring grade, locking mechanisms, and readiness..."
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              className="w-full px-3.5 py-2 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-xl text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-brand-600"
            />
          </div>

          {/* Specifications */}
          <div className="space-y-3 pt-2 border-t border-charcoal-200 dark:border-charcoal-800">
            <h4 className="text-xs font-bold uppercase text-charcoal-700 dark:text-charcoal-300">
              Technical Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-charcoal-500 block mb-0.5">Length</label>
                <input
                  type="text"
                  value={formData.extLength}
                  onChange={(e) => setFormData({ ...formData, extLength: e.target.value })}
                  placeholder="20ft 0in (6.06m)"
                  className="w-full px-3 py-1.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] text-charcoal-500 block mb-0.5">Width</label>
                <input
                  type="text"
                  value={formData.extWidth}
                  onChange={(e) => setFormData({ ...formData, extWidth: e.target.value })}
                  placeholder="8ft 0in (2.44m)"
                  className="w-full px-3 py-1.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] text-charcoal-500 block mb-0.5">Height</label>
                <input
                  type="text"
                  value={formData.extHeight}
                  onChange={(e) => setFormData({ ...formData, extHeight: e.target.value })}
                  placeholder="8ft 6in (2.59m)"
                  className="w-full px-3 py-1.5 bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-300 dark:border-charcoal-700 rounded-lg text-xs"
                />
              </div>
            </div>
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
              {editingContainer ? 'Save Changes' : 'Publish Container'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
