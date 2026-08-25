import { ProjectItem } from '../types';

export const MOCK_PROJECTS: ProjectItem[] = [
  {
    id: 'PRJ-OFFICE-20A',
    title: 'Executive Site Office & Meeting Pod',
    category: 'Site Offices',
    shortDescription: 'Conversion of a 20ft High Cube container into a modern thermal-insulated site office with full glass front, LED lighting, and inverter AC setup.',
    fullDescription: 'Designed for a project infrastructure contractor needing a rapid-deployment executive office. Starting with a single-trip 20ft container, our fabrication team reinforced the structural opening, fitted an aluminum-framed double glazed facade, rockwool thermal insulation, pre-wired concealed electricals, and finished the interior with fire-retardant PVC wall panelling.',
    primaryImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    baseContainerType: '20ft High Cube Container',
    modificationsMade: [
      'Full height structural steel header reinforcement for panoramic window',
      '50mm High-density Rockwool wall & ceiling insulation',
      'Concealed heavy-gauge copper wiring with MCB distribution board',
      'Heavy-traffic commercial vinyl plank flooring over subfloor',
      'Split air conditioning mounting with weatherproof outdoor cage',
      'Exterior polyurethane dual-coat industrial finish (Charcoal & Warm Timber Accents)'
    ],
    keyFeatures: [
      'Plug-and-play 32A external industrial power connector',
      'Acoustic sound dampening interior walls',
      'Dimmable recessed LED lighting',
      'Integrated cable raceways for LAN & workstation power'
    ],
    intendedUse: 'On-site engineering team office and client conference pod',
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
      afterImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      beforeLabel: 'Raw 20ft Shipping Container',
      afterLabel: 'Completed Executive Site Office',
      transformationSummary: 'Transformed an industrial cargo container into a climate-controlled, sound-insulated, executive project management hub.'
    },
    featured: true
  },
  {
    id: 'PRJ-GUARD-10B',
    title: 'Heavy-Duty Security Guard Cabin & Checkpoint',
    category: 'Security & Guard Cabins',
    shortDescription: 'Custom 10ft compact security gatehouse with 360-degree visibility windows, intercom provision, sliding counter, and overhead canopy.',
    fullDescription: 'Custom fabricated 10ft unit specifically engineered for factory perimeter control. Fitted with heavy-duty tinted sliding windows on three sides for wide viewing angles, an internal writing counter, overhead spotlighting, and integrated electrical sub-panel.',
    primaryImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
    ],
    baseContainerType: '10ft Custom Fabricated Steel Box',
    modificationsMade: [
      'Three-sided aluminum sliding window apertures with security grills',
      'Insulated roof sandwich panel to minimize solar heat gain',
      'Built-in laminate counter desk with drawer storage',
      'Steel entry door with mortise security lock and vision panel'
    ],
    keyFeatures: [
      '360-degree perimeter line of sight',
      'Compact footprint suitable for narrow plant entrance gates',
      'Pre-wired for CCTV cameras, PA speaker, and barrier gate triggers'
    ],
    intendedUse: '24/7 security surveillance and visitor verification cabin',
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
      afterImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80',
      beforeLabel: 'Standard Fabricated Shell',
      afterLabel: 'Fully Equipped Security Cabin',
      transformationSummary: 'Fabricated with wide visibility glazing, desk counter, and insulation for guard comfort.'
    },
    featured: true
  },
  {
    id: 'PRJ-CAFE-20C',
    title: 'Mobile Commercial Kiosk & Beverage Pod',
    category: 'Commercial & Kiosks',
    shortDescription: '20ft converted commercial container with gas-strut hydraulic service awning, stainless steel food-grade prep counters, and plumbing provisions.',
    fullDescription: 'A versatile mobile commercial retail unit created for high-footfall outdoor venues. Features a massive 12ft fold-down serving hatch that doubles as an overhead awning with integrated LED strip illumination, non-slip checker plate flooring, and food-grade washable wall lining.',
    primaryImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    ],
    baseContainerType: '20ft Standard Dry Container',
    modificationsMade: [
      'Hydraulic gas-strut fold-out serving hatch with perimeter rubber weather-stripping',
      'Full stainless steel kitchen/counter backsplashes and work surfaces',
      'Twin compartment sink plumbing and grey-water drain lines',
      'High-output exhaust hood duct cutout with exterior louvers'
    ],
    keyFeatures: [
      'Lockable secure fold-up shutter when closed overnight',
      'Grease-resistant industrial slip-proof floor finish',
      'Dual 16A/32A power inputs for refrigeration and espresso machines'
    ],
    intendedUse: 'Mobile cafe, food truck replacement, or pop-up retail storefront',
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
      afterImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
      beforeLabel: 'Standard Cargo Box',
      afterLabel: 'Turnkey Commercial Kiosk',
      transformationSummary: 'Engineered hydraulic fold-out serving window and turnkey food service interior.'
    },
    featured: true
  },
  {
    id: 'PRJ-WORK-40D',
    title: 'Secure Industrial Maintenance Workshop & Tool Storage',
    category: 'Storage & Workshops',
    shortDescription: 'Heavy-duty 40ft workshop unit equipped with heavy steel workbenches, unistrut tool hanging racks, high-bay lighting, and side roll-up shutter.',
    fullDescription: 'Custom built for heavy equipment maintenance on industrial mining and civil construction sites. Includes a custom side roller shutter for forklift loading of heavy spare parts, reinforced floor loading capacity, overhead compressed air line conduit, and multi-circuit power stations.',
    primaryImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80'
    ],
    baseContainerType: '40ft High Cube Container',
    modificationsMade: [
      'Heavy-duty 8ft motorized roller shutter installed on side wall with structural jambs',
      'Welded unistrut channel wall framing for adjustable tool shelving',
      'High-impact steel checker plate floor overlay over marine ply',
      'Industrial 3-phase 415V power distribution board with RCD protection'
    ],
    keyFeatures: [
      'Forklift accessible side loading for machine parts and pallets',
      'Heavy-duty 10mm steel workbenches with bench-vice mounting plates',
      'Explosion-proof LED high-bay fixtures'
    ],
    intendedUse: 'On-site machinery servicing, parts storage, and tool crib',
    featured: false
  },
  {
    id: 'PRJ-MOD-40E',
    title: 'Multi-Room Modular Site Accommodation & Bunkhouse',
    category: 'Custom Modular',
    shortDescription: '40ft High Cube transformed into a 2-room staff accommodation unit with integrated ensuite bathroom, climate control, and individual private doors.',
    fullDescription: 'Engineered for remote industrial installations where reliable staff housing is required. Divided into two private self-contained living quarters, each with private entry, insulated walls, individual AC unit, and shared or dedicated central wet-room plumbing.',
    primaryImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ],
    baseContainerType: '40ft High Cube Container',
    modificationsMade: [
      'Internal partition walls with thermal and acoustic insulation sandwich',
      'Dual external steel doors with high-security locks',
      'Complete modular bathroom with toilet, vanity, and shower stall',
      'Integrated water heater provision and waste plumbing manifold'
    ],
    keyFeatures: [
      'Turnkey livable environment for project engineers',
      'High R-value insulation for extreme hot/cold climatic regions',
      'Easy crane lift and relocation between project sites'
    ],
    intendedUse: 'Remote site living quarters, modular bunkhouse, and field camp housing',
    featured: false
  }
];

export function getProjectById(id: string): ProjectItem | undefined {
  return MOCK_PROJECTS.find(p => p.id.toLowerCase() === id.toLowerCase());
}
