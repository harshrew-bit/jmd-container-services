export type ContainerSize = '10ft' | '20ft' | '40ft' | '40ft HC' | 'Custom';

export type ContainerType = 
  | 'Standard Dry Van'
  | 'High Cube'
  | 'Open Top'
  | 'Refrigerated (Reefer)'
  | 'Modified Unit'
  | 'Custom Fabricated';

export type ContainerCondition = 
  | 'New / One-Trip'
  | 'Cargo Worthy (CW)'
  | 'Wind & Water Tight (WWT)'
  | 'As-Is / Used'
  | 'Custom Built';

export type ContainerStatus = 'Available' | 'Reserved' | 'Sold';

export interface ContainerDimensions {
  length: string;
  width: string;
  height: string;
}

export interface ContainerSpecs {
  externalDimensions?: ContainerDimensions;
  internalDimensions?: ContainerDimensions;
  doorOpening?: { width: string; height: string };
  maxGrossWeight?: string;
  tareWeight?: string;
  maxPayload?: string;
  cubicCapacity?: string;
  floorType?: string;
  wallStructure?: string;
  paintCondition?: string;
}

export interface ContainerItem {
  id: string;
  title: string;
  size: ContainerSize;
  type: ContainerType;
  condition: ContainerCondition;
  status: ContainerStatus;
  featured?: boolean;
  shortDescription: string;
  fullDescription: string;
  primaryImage: string;
  images: string[];
  specs: ContainerSpecs;
  features: string[];
  suitableFor: string[];
  locationYard: string;
  inspectionNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProjectCategory = 
  | 'Site Offices' 
  | 'Security & Guard Cabins' 
  | 'Commercial & Kiosks' 
  | 'Storage & Workshops' 
  | 'Custom Modular';

export interface BeforeAfterData {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  transformationSummary: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription: string;
  primaryImage: string;
  galleryImages: string[];
  baseContainerType: string;
  modificationsMade: string[];
  keyFeatures: string[];
  intendedUse: string;
  beforeAfter?: BeforeAfterData;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  bannerImage: string;
  offerings: {
    title: string;
    description: string;
    highlights: string[];
  }[];
  processSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  ctaText: string;
  ctaLink: string;
}

export interface BusinessContactInfo {
  name: string;
  shortName: string;
  tagline: string;
  coreValueProp: string;
  phone: {
    display: string;
    raw: string;
    isPlaceholder: boolean;
  };
  whatsapp: {
    display: string;
    number: string;
    isPlaceholder: boolean;
  };
  email: {
    display: string;
    address: string;
    isPlaceholder: boolean;
  };
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    fullDisplay: string;
    isPlaceholder: boolean;
  };
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  capabilities: string[];
}

export interface SiteMedia {
  logoUrl?: string;
  heroImageUrl?: string;
  yardImageUrl?: string;
  workshopImageUrl?: string;
  updatedAt?: string;
}

export type EnquiryType = 'container' | 'custom_solution' | 'general';
export type EnquiryStatus = 'new' | 'contacted' | 'quoted' | 'closed';

export interface CustomerEnquiry {
  id: string;
  type: EnquiryType;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  containerId?: string;
  containerTitle?: string;
  lookingFor?: string;
  containerSize?: string;
  intendedUse?: string;
  quantity?: string;
  modifications?: string[];
  subject?: string;
  message?: string;
  deliveryLocation?: string;
  status: EnquiryStatus;
  notes?: string;
  createdAt: string;
}

export interface CustomSolutionFormData {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  lookingFor: string;
  containerSize: string;
  intendedUse: string;
  quantity: string;
  modifications: string[];
  description: string;
  preferredTimeline?: string;
}

export interface ContainerEnquiryFormData {
  containerId: string;
  containerTitle: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  deliveryLocation?: string;
  message?: string;
}

export interface GeneralContactFormData {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
}

export interface OwnerDashboardStats {
  activeContainersCount: number;
  totalContainersCount: number;
  projectsCount: number;
  newEnquiriesCount: number;
  totalEnquiriesCount: number;
}
