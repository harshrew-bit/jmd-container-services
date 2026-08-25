import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  ContainerItem, 
  ProjectItem, 
  BusinessContactInfo, 
  SiteMedia, 
  CustomerEnquiry, 
  OwnerDashboardStats,
  EnquiryStatus
} from '../types';
import { MOCK_CONTAINERS } from '../data/containers';
import { MOCK_PROJECTS } from '../data/projects';
import { BUSINESS_INFO as DEFAULT_BUSINESS_INFO } from '../config/businessInfo';

const LOCAL_STORAGE_CONTAINERS_KEY = 'jmd_local_containers';
const LOCAL_STORAGE_PROJECTS_KEY = 'jmd_local_projects';
const LOCAL_STORAGE_BIZ_KEY = 'jmd_local_business_info';
const LOCAL_STORAGE_MEDIA_KEY = 'jmd_local_site_media';
const LOCAL_STORAGE_ENQUIRIES_KEY = 'jmd_local_enquiries';

// Helper for local storage getters
function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (_) {
    return fallback;
  }
}

function setLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (_) {}
}

export const DataService = {
  // ============================================================================
  // CONTAINERS
  // ============================================================================
  async fetchContainers(): Promise<ContainerItem[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('containers')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((row: any) => ({
            id: row.id,
            title: row.title,
            size: row.size,
            type: row.type,
            condition: row.condition,
            status: row.status,
            featured: row.featured,
            shortDescription: row.short_description,
            fullDescription: row.full_description,
            primaryImage: row.primary_image,
            images: row.images || [],
            specs: row.specs || {},
            features: row.features || [],
            suitableFor: row.suitable_for || [],
            locationYard: row.location_yard || 'Main Yard',
            inspectionNotes: row.inspection_notes,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
          }));
        }
      } catch (err) {
        console.warn('[DataService] Supabase fetchContainers failed, using local fallback:', err);
      }
    }

    // Local / development fallback
    return getLocal<ContainerItem[]>(LOCAL_STORAGE_CONTAINERS_KEY, MOCK_CONTAINERS);
  },

  async getContainerById(id: string): Promise<ContainerItem | undefined> {
    const all = await this.fetchContainers();
    return all.find((c) => c.id.toLowerCase() === id.toLowerCase());
  },

  async saveContainer(container: ContainerItem): Promise<ContainerItem> {
    const now = new Date().toISOString();
    const updated: ContainerItem = {
      ...container,
      updatedAt: now,
      createdAt: container.createdAt || now,
    };

    if (isSupabaseConfigured()) {
      const row = {
        id: updated.id,
        title: updated.title,
        size: updated.size,
        type: updated.type,
        condition: updated.condition,
        status: updated.status,
        featured: updated.featured || false,
        short_description: updated.shortDescription,
        full_description: updated.fullDescription,
        primary_image: updated.primaryImage,
        images: updated.images || [],
        specs: updated.specs || {},
        features: updated.features || [],
        suitable_for: updated.suitableFor || [],
        location_yard: updated.locationYard,
        inspection_notes: updated.inspectionNotes,
        updated_at: now,
      };

      const { error } = await supabase
        .from('containers')
        .upsert(row, { onConflict: 'id' });

      if (error) {
        console.error('[DataService] Save container error in Supabase:', error);
        throw new Error(`Database error saving container: ${error.message}`);
      }
    }

    // Always update local cache
    const current = getLocal<ContainerItem[]>(LOCAL_STORAGE_CONTAINERS_KEY, MOCK_CONTAINERS);
    const existingIndex = current.findIndex((c) => c.id === updated.id);
    let nextList: ContainerItem[];
    if (existingIndex >= 0) {
      nextList = [...current];
      nextList[existingIndex] = updated;
    } else {
      nextList = [updated, ...current];
    }
    setLocal(LOCAL_STORAGE_CONTAINERS_KEY, nextList);

    return updated;
  },

  async deleteContainer(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.from('containers').delete().eq('id', id);
      if (error) {
        console.error('[DataService] Delete container error in Supabase:', error);
        throw new Error(`Failed to delete container: ${error.message}`);
      }
    }

    const current = getLocal<ContainerItem[]>(LOCAL_STORAGE_CONTAINERS_KEY, MOCK_CONTAINERS);
    const nextList = current.filter((c) => c.id !== id);
    setLocal(LOCAL_STORAGE_CONTAINERS_KEY, nextList);
    return true;
  },

  // ============================================================================
  // PROJECTS (Our Work)
  // ============================================================================
  async fetchProjects(): Promise<ProjectItem[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((row: any) => ({
            id: row.id,
            title: row.title,
            category: row.category,
            shortDescription: row.short_description,
            fullDescription: row.full_description,
            primaryImage: row.primary_image,
            galleryImages: row.gallery_images || [],
            baseContainerType: row.base_container_type,
            modificationsMade: row.modifications_made || [],
            keyFeatures: row.key_features || [],
            intendedUse: row.intended_use,
            beforeAfter: row.before_after || undefined,
            featured: row.featured,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
          }));
        }
      } catch (err) {
        console.warn('[DataService] Supabase fetchProjects failed, using local fallback:', err);
      }
    }

    return getLocal<ProjectItem[]>(LOCAL_STORAGE_PROJECTS_KEY, MOCK_PROJECTS);
  },

  async getProjectById(id: string): Promise<ProjectItem | undefined> {
    const all = await this.fetchProjects();
    return all.find((p) => p.id.toLowerCase() === id.toLowerCase());
  },

  async saveProject(project: ProjectItem): Promise<ProjectItem> {
    const now = new Date().toISOString();
    const updated: ProjectItem = {
      ...project,
      updatedAt: now,
      createdAt: project.createdAt || now,
    };

    if (isSupabaseConfigured()) {
      const row = {
        id: updated.id,
        title: updated.title,
        category: updated.category,
        short_description: updated.shortDescription,
        full_description: updated.fullDescription,
        primary_image: updated.primaryImage,
        gallery_images: updated.galleryImages || [],
        base_container_type: updated.baseContainerType,
        modifications_made: updated.modificationsMade || [],
        key_features: updated.keyFeatures || [],
        intended_use: updated.intendedUse,
        before_after: updated.beforeAfter || null,
        featured: updated.featured || false,
        updated_at: now,
      };

      const { error } = await supabase
        .from('projects')
        .upsert(row, { onConflict: 'id' });

      if (error) {
        console.error('[DataService] Save project error in Supabase:', error);
        throw new Error(`Database error saving project: ${error.message}`);
      }
    }

    const current = getLocal<ProjectItem[]>(LOCAL_STORAGE_PROJECTS_KEY, MOCK_PROJECTS);
    const existingIndex = current.findIndex((p) => p.id === updated.id);
    let nextList: ProjectItem[];
    if (existingIndex >= 0) {
      nextList = [...current];
      nextList[existingIndex] = updated;
    } else {
      nextList = [updated, ...current];
    }
    setLocal(LOCAL_STORAGE_PROJECTS_KEY, nextList);

    return updated;
  },

  async deleteProject(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) {
        console.error('[DataService] Delete project error in Supabase:', error);
        throw new Error(`Failed to delete project: ${error.message}`);
      }
    }

    const current = getLocal<ProjectItem[]>(LOCAL_STORAGE_PROJECTS_KEY, MOCK_PROJECTS);
    const nextList = current.filter((p) => p.id !== id);
    setLocal(LOCAL_STORAGE_PROJECTS_KEY, nextList);
    return true;
  },

  // ============================================================================
  // BUSINESS INFORMATION
  // ============================================================================
  async fetchBusinessInfo(): Promise<BusinessContactInfo> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('business_info')
          .select('*')
          .eq('id', 'primary_config')
          .single();

        if (!error && data) {
          return {
            name: data.name,
            shortName: data.short_name,
            tagline: data.tagline,
            coreValueProp: data.core_value_prop,
            phone: data.phone,
            whatsapp: data.whatsapp,
            email: data.email,
            address: data.address,
            operatingHours: data.operating_hours,
            capabilities: data.capabilities || DEFAULT_BUSINESS_INFO.capabilities,
          };
        }
      } catch (err) {
        console.warn('[DataService] Supabase fetchBusinessInfo fallback:', err);
      }
    }

    return getLocal<BusinessContactInfo>(LOCAL_STORAGE_BIZ_KEY, DEFAULT_BUSINESS_INFO);
  },

  async saveBusinessInfo(info: BusinessContactInfo): Promise<BusinessContactInfo> {
    if (isSupabaseConfigured()) {
      const row = {
        id: 'primary_config',
        name: info.name,
        short_name: info.shortName,
        tagline: info.tagline,
        core_value_prop: info.coreValueProp,
        phone: info.phone,
        whatsapp: info.whatsapp,
        email: info.email,
        address: info.address,
        operating_hours: info.operatingHours,
        capabilities: info.capabilities,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('business_info').upsert(row, { onConflict: 'id' });
      if (error) {
        console.error('[DataService] Save business info error:', error);
        throw new Error(`Failed to save business settings: ${error.message}`);
      }
    }

    setLocal(LOCAL_STORAGE_BIZ_KEY, info);
    return info;
  },

  // ============================================================================
  // SITE MEDIA (Logo, Hero, Yard)
  // ============================================================================
  async fetchSiteMedia(): Promise<SiteMedia> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('site_media')
          .select('*')
          .eq('id', 'primary_media')
          .single();

        if (!error && data) {
          return {
            logoUrl: data.logo_url,
            heroImageUrl: data.hero_image_url,
            yardImageUrl: data.yard_image_url,
            workshopImageUrl: data.workshop_image_url,
            updatedAt: data.updated_at,
          };
        }
      } catch (err) {
        console.warn('[DataService] fetchSiteMedia fallback:', err);
      }
    }

    return getLocal<SiteMedia>(LOCAL_STORAGE_MEDIA_KEY, {
      heroImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85',
      yardImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
      workshopImageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    });
  },

  async saveSiteMedia(media: SiteMedia): Promise<SiteMedia> {
    const updated = { ...media, updatedAt: new Date().toISOString() };
    if (isSupabaseConfigured()) {
      const row = {
        id: 'primary_media',
        logo_url: updated.logoUrl,
        hero_image_url: updated.heroImageUrl,
        yard_image_url: updated.yardImageUrl,
        workshop_image_url: updated.workshopImageUrl,
        updated_at: updated.updatedAt,
      };

      const { error } = await supabase.from('site_media').upsert(row, { onConflict: 'id' });
      if (error) {
        console.error('[DataService] Save site media error:', error);
        throw new Error(`Failed to save site media: ${error.message}`);
      }
    }

    setLocal(LOCAL_STORAGE_MEDIA_KEY, updated);
    return updated;
  },

  // ============================================================================
  // CUSTOMER ENQUIRIES
  // ============================================================================
  async submitEnquiry(enquiry: Omit<CustomerEnquiry, 'id' | 'createdAt' | 'status'>): Promise<CustomerEnquiry> {
    const id = `ENQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const fullEnquiry: CustomerEnquiry = {
      ...enquiry,
      id,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        const row = {
          id: fullEnquiry.id,
          type: fullEnquiry.type,
          name: fullEnquiry.name,
          phone: fullEnquiry.phone,
          email: fullEnquiry.email,
          company: fullEnquiry.company,
          container_id: fullEnquiry.containerId,
          container_title: fullEnquiry.containerTitle,
          looking_for: fullEnquiry.lookingFor,
          container_size: fullEnquiry.containerSize,
          intended_use: fullEnquiry.intendedUse,
          quantity: fullEnquiry.quantity,
          modifications: fullEnquiry.modifications || [],
          subject: fullEnquiry.subject,
          message: fullEnquiry.message,
          delivery_location: fullEnquiry.deliveryLocation,
          status: fullEnquiry.status,
          created_at: fullEnquiry.createdAt,
        };

        await supabase.from('enquiries').insert([row]);
      } catch (err) {
        console.warn('[DataService] Enquiry database insertion warning:', err);
      }
    }

    // Save locally
    const current = getLocal<CustomerEnquiry[]>(LOCAL_STORAGE_ENQUIRIES_KEY, []);
    setLocal(LOCAL_STORAGE_ENQUIRIES_KEY, [fullEnquiry, ...current]);

    return fullEnquiry;
  },

  async fetchEnquiries(): Promise<CustomerEnquiry[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data.map((row: any) => ({
            id: row.id,
            type: row.type,
            name: row.name,
            phone: row.phone,
            email: row.email,
            company: row.company,
            containerId: row.container_id,
            containerTitle: row.container_title,
            lookingFor: row.looking_for,
            containerSize: row.container_size,
            intendedUse: row.intended_use,
            quantity: row.quantity,
            modifications: row.modifications || [],
            subject: row.subject,
            message: row.message,
            deliveryLocation: row.delivery_location,
            status: row.status as EnquiryStatus,
            notes: row.notes,
            createdAt: row.created_at,
          }));
        }
      } catch (err) {
        console.warn('[DataService] fetchEnquiries fallback:', err);
      }
    }

    return getLocal<CustomerEnquiry[]>(LOCAL_STORAGE_ENQUIRIES_KEY, []);
  },

  async updateEnquiryStatus(id: string, status: EnquiryStatus, notes?: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      const updateData: any = { status };
      if (notes !== undefined) updateData.notes = notes;
      await supabase.from('enquiries').update(updateData).eq('id', id);
    }

    const current = getLocal<CustomerEnquiry[]>(LOCAL_STORAGE_ENQUIRIES_KEY, []);
    const updated = current.map((enq) =>
      enq.id === id ? { ...enq, status, notes: notes !== undefined ? notes : enq.notes } : enq
    );
    setLocal(LOCAL_STORAGE_ENQUIRIES_KEY, updated);
    return true;
  },

  async deleteEnquiry(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      await supabase.from('enquiries').delete().eq('id', id);
    }

    const current = getLocal<CustomerEnquiry[]>(LOCAL_STORAGE_ENQUIRIES_KEY, []);
    const updated = current.filter((enq) => enq.id !== id);
    setLocal(LOCAL_STORAGE_ENQUIRIES_KEY, updated);
    return true;
  },

  // ============================================================================
  // DASHBOARD STATS
  // ============================================================================
  async fetchDashboardStats(): Promise<OwnerDashboardStats> {
    const containers = await this.fetchContainers();
    const projects = await this.fetchProjects();
    const enquiries = await this.fetchEnquiries();

    return {
      activeContainersCount: containers.filter((c) => c.status === 'Available').length,
      totalContainersCount: containers.length,
      projectsCount: projects.length,
      newEnquiriesCount: enquiries.filter((e) => e.status === 'new').length,
      totalEnquiriesCount: enquiries.length,
    };
  },
};
