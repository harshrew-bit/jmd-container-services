import { ContainerItem } from '../types';

export const MOCK_CONTAINERS: ContainerItem[] = [
  {
    id: 'JMD-20-001',
    title: '20ft Standard Dry Cargo Container',
    size: '20ft',
    type: 'Standard Dry Van',
    condition: 'Cargo Worthy (CW)',
    status: 'Available',
    featured: true,
    shortDescription: 'Standard 20-foot ISO dry shipping container in cargo-worthy structural condition. Ideal for secure site storage, shipping, or basic modifications.',
    fullDescription: 'High-grade 20ft Standard Dry Container inspected for structural integrity. Features Corten steel corrugated walls, heavy-duty marine plywood flooring, and dual locking cam bars on double end doors. Wind and water tight certified, ready for immediate dispatch from yard.',
    primaryImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      externalDimensions: { length: '20ft 0in (6.06m)', width: '8ft 0in (2.44m)', height: '8ft 6in (2.59m)' },
      internalDimensions: { length: '19ft 4in (5.90m)', width: '7ft 8in (2.35m)', height: '7ft 10in (2.39m)' },
      doorOpening: { width: '7ft 8in (2.34m)', height: '7ft 6in (2.28m)' },
      maxGrossWeight: '30,480 kg (67,200 lbs)',
      tareWeight: '2,200 kg (4,850 lbs)',
      maxPayload: '28,280 kg (62,350 lbs)',
      cubicCapacity: '33.2 m³ (1,172 cu ft)',
      floorType: '28mm Heavy-Duty Marine Plywood',
      wallStructure: '14-Gauge Corrugated Corten Steel Panels',
      paintCondition: 'Original Marine Coating, Minor Surface Scuffs'
    },
    features: [
      'Corten anti-corrosive steel body',
      'Dual locking bars with padlock lock-box support',
      'CSC certified for multi-modal transport',
      'Weather-resistant rubber door gaskets',
      'Forklift pockets for easy yard handling'
    ],
    suitableFor: [
      'On-site industrial material storage',
      'Construction equipment protection',
      'Base for custom office or workshop conversions',
      'Freight & domestic transportation'
    ],
    locationYard: 'Main Yard - Sector 1 [Placeholder]',
    inspectionNotes: 'Solid sub-floor crossmembers, smooth door hinge rotation, no structural breaches.'
  },
  {
    id: 'JMD-40-002',
    title: '40ft High Cube (HC) Shipping Container',
    size: '40ft HC',
    type: 'High Cube',
    condition: 'New / One-Trip',
    status: 'Available',
    featured: true,
    shortDescription: 'Extra-height 40-foot High Cube container offering 9ft 6in vertical clearance. Single-trip pristine condition with factory lock box.',
    fullDescription: 'Pristine 40ft High Cube shipping container shipped only once with clean dry cargo. Provides an extra foot of headroom (9ft 6in total height) compared to standard containers, making it the preferred choice for commercial office conversions, residential builds, and bulky cargo warehousing.',
    primaryImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      externalDimensions: { length: '40ft 0in (12.19m)', width: '8ft 0in (2.44m)', height: '9ft 6in (2.90m)' },
      internalDimensions: { length: '39ft 5in (12.03m)', width: '7ft 8in (2.35m)', height: '8ft 10in (2.69m)' },
      doorOpening: { width: '7ft 8in (2.34m)', height: '8ft 5in (2.58m)' },
      maxGrossWeight: '32,500 kg (71,650 lbs)',
      tareWeight: '3,900 kg (8,600 lbs)',
      maxPayload: '28,600 kg (63,050 lbs)',
      cubicCapacity: '76.4 m³ (2,700 cu ft)',
      floorType: '28mm Treated Bamboo / Hardwood Marine Grade',
      wallStructure: 'Corten Steel High-Strength Corrugated Panels',
      paintCondition: 'Factory Finish Grey/Blue, Clean & Spotless'
    },
    features: [
      'Extra 1ft vertical clearance (9ft 6in)',
      'Factory installed anti-theft lock box',
      'Minimal paint wear, zero structural rust',
      'High internal cubic volume for multi-tier shelving',
      'Certified CSC plate valid for international handling'
    ],
    suitableFor: [
      'High-ceiling portable site offices',
      'Large-scale fabrication and duplex modular units',
      'Bulk inventory warehousing',
      'Mobile retail and showroom builds'
    ],
    locationYard: 'Main Yard - Sector 1 [Placeholder]',
    inspectionNotes: 'Pristine single-trip condition. Odor-free, clean floorboards, flawless door seals.'
  },
  {
    id: 'JMD-20-MOD-003',
    title: '20ft Site Office Shell with Cutouts & Insulation Prep',
    size: '20ft',
    type: 'Modified Unit',
    condition: 'Custom Built',
    status: 'Available',
    featured: true,
    shortDescription: '20-foot modified container pre-fitted with steel-reinforced window cutouts, insulated sub-frame, and heavy duty personal access door.',
    fullDescription: 'Specially modified 20ft container prepared for quick on-site office or control room deployment. Pre-welded structural steel frames for 2 sliding glass windows, steel security personnel door, and interior framing channels ready for client-selected electrical and internal panelling.',
    primaryImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      externalDimensions: { length: '20ft 0in (6.06m)', width: '8ft 0in (2.44m)', height: '8ft 6in (2.59m)' },
      internalDimensions: { length: '19ft 2in (5.84m)', width: '7ft 6in (2.29m)', height: '7ft 8in (2.34m)' },
      floorType: 'Marine Plywood with Heavy Vinyl Overlay Ready',
      wallStructure: 'Reinforced Box Section Welded Steel Framing',
      paintCondition: 'Industrial Polyurethane Primer & Topcoat (Anthracite Grey)'
    },
    features: [
      'Welded 40x40mm internal steel stud framing',
      '1x Steel security entry door with deadbolt',
      '2x Reinforced window apertures (4ft x 3ft)',
      'AC cut-out provision with weatherproof hood',
      'Anti-corrosive primer applied to all modified weld seams'
    ],
    suitableFor: [
      'Project site engineering offices',
      'Security supervision booths',
      'On-site meeting rooms',
      'Quick turn-around customization'
    ],
    locationYard: 'Fabrication Bay 2 [Placeholder]',
    inspectionNotes: 'Weld integrity tested, framing square and level, weatherproofing applied.'
  },
  {
    id: 'JMD-10-004',
    title: '10ft Compact Storage / Guard Unit',
    size: '10ft',
    type: 'Custom Fabricated',
    condition: 'Custom Built',
    status: 'Available',
    featured: false,
    shortDescription: 'Compact 10-foot fabricated container unit. Designed for tight footprint sites, gate security checkpoints, or small tool storage.',
    fullDescription: 'Custom engineered 10ft container solution precision-cut and fabricated from genuine Corten steel shipping container sections with full ISO corner castings intact. Easy to lift, transport, and locate on congested job sites or perimeter gate posts.',
    primaryImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      externalDimensions: { length: '10ft 0in (3.05m)', width: '8ft 0in (2.44m)', height: '8ft 6in (2.59m)' },
      internalDimensions: { length: '9ft 4in (2.84m)', width: '7ft 8in (2.35m)', height: '7ft 10in (2.39m)' },
      tareWeight: '1,400 kg (3,080 lbs)',
      floorType: '28mm Heavy Duty Marine Board',
      wallStructure: 'Corrugated Steel Body with ISO Castings',
      paintCondition: 'Fresh Industrial Coating'
    },
    features: [
      'Compact footprint for restricted spaces',
      'Standard ISO corner blocks for crane/hiab lifting',
      'Double cargo doors with heavy lock handles',
      'Reinforced perimeter box beam header and sill'
    ],
    suitableFor: [
      'Site gatekeeper and security kiosks',
      'Tool & small machinery lockups',
      'Residential / farm yard storage',
      'Compact pump house or generator shed'
    ],
    locationYard: 'Fabrication Bay 1 [Placeholder]',
    inspectionNotes: 'All new end-wall welds ground and tested. Watertight guarantee.'
  },
  {
    id: 'JMD-40-005',
    title: '40ft Standard Dry Van Container',
    size: '40ft',
    type: 'Standard Dry Van',
    condition: 'Wind & Water Tight (WWT)',
    status: 'Reserved',
    featured: false,
    shortDescription: '40-foot standard height container in Wind & Water Tight condition. Great value for stationary storage, agriculture, and warehousing.',
    fullDescription: 'Economical 40ft standard container suitable for secure on-site storage. Clean interior with intact floor and sealed gaskets. Currently marked as reserved for an incoming commercial requirement.',
    primaryImage: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      externalDimensions: { length: '40ft 0in (12.19m)', width: '8ft 0in (2.44m)', height: '8ft 6in (2.59m)' },
      internalDimensions: { length: '39ft 5in (12.03m)', width: '7ft 8in (2.35m)', height: '7ft 10in (2.39m)' },
      maxGrossWeight: '30,480 kg',
      tareWeight: '3,750 kg',
      cubicCapacity: '67.7 m³',
      floorType: 'Marine Grade Hardwood Plywood'
    },
    features: [
      'Full 40ft length for maximum storage per footprint',
      'Dry, weatherproof interior',
      'Standard cargo double door mechanism',
      'Economical pricing tier for static storage'
    ],
    suitableFor: [
      'Warehouse overflow storage',
      'Agricultural and farming equipment storage',
      'Long-term static storage depots'
    ],
    locationYard: 'Yard Storage Depot B [Placeholder]',
    inspectionNotes: 'Reserved status. Minor cosmetic dents, zero moisture penetration.'
  },
  {
    id: 'JMD-20-006',
    title: '20ft Heavy Duty Storage Unit (Grade A Used)',
    size: '20ft',
    type: 'Standard Dry Van',
    condition: 'Cargo Worthy (CW)',
    status: 'Available',
    featured: false,
    shortDescription: 'Solid 20ft container with minimal aesthetic wear and excellent structural integrity for heavy-duty industrial storage.',
    fullDescription: 'Inspected Grade-A used 20ft shipping container with robust structural steel, smooth door hardware, and solid flooring. Prepared for quick dispatch or ready to undergo custom modification.',
    primaryImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      externalDimensions: { length: '20ft 0in (6.06m)', width: '8ft 0in (2.44m)', height: '8ft 6in (2.59m)' },
      tareWeight: '2,240 kg',
      floorType: 'Plywood Floor'
    },
    features: [
      'Clean interior, fully pressure-washed',
      'Tested door seal gaskets',
      'Forklift accessible pockets'
    ],
    suitableFor: [
      'Factory material store',
      'Contractor site store',
      'Custom modification base'
    ],
    locationYard: 'Main Yard - Sector 2 [Placeholder]',
    inspectionNotes: 'Door hinges lubricated, latch bars fully aligned.'
  }
];

export function getContainerById(id: string): ContainerItem | undefined {
  return MOCK_CONTAINERS.find(c => c.id.toLowerCase() === id.toLowerCase());
}
