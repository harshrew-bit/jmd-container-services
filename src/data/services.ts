import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'container-sales',
    title: 'Shipping Container Sales',
    shortDescription: 'Supply of raw, inspected shipping containers in standard 10ft, 20ft, 40ft, and 40ft High Cube specifications.',
    fullDescription: 'We provide structural grade raw shipping containers for industrial storage, commercial transport, and construction site needs. Each unit in our yard is inspected for weather tightness, flooring stability, and door mechanism integrity.',
    icon: 'Container',
    bannerImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    offerings: [
      {
        title: 'New / One-Trip Containers',
        description: 'Pristine single-use cargo containers in immaculate condition with minimal exterior marks, perfect for showroom conversions and long-term asset value.',
        highlights: ['Factory clean interior', 'Built-in lock boxes', 'CSC certified for freight', 'High resale value']
      },
      {
        title: 'Cargo Worthy (CW) Grade',
        description: 'Structurally sound containers certified for international shipping and heavy industrial storage with wind & water tight security.',
        highlights: ['Robust Corten steel body', 'Heavy marine plywood floor', 'Intact door gaskets', 'Cost-effective storage']
      },
      {
        title: 'High Cube (HC) Configurations',
        description: 'Containers with an extra foot of vertical clearance (9ft 6in overall height) offering superior volume and head height for custom conversions.',
        highlights: ['9ft 6in ceiling height', 'Extra internal cubic capacity', 'Ideal for interior insulation and false ceilings', 'Standard 40ft & 20ft options']
      },
      {
        title: 'Compact 10ft Units',
        description: 'Small footprint fabricated and mini containers designed for restricted yards, guard posts, and localized secure tool lockups.',
        highlights: ['Space-saving footprint', 'Easy crane or forklift handling', 'Full ISO corner castings', 'High security locks']
      }
    ],
    processSteps: [
      {
        step: 1,
        title: 'Specify Size & Condition',
        description: 'Share your intended application, required size (10ft, 20ft, 40ft, HC), and condition grade.'
      },
      {
        step: 2,
        title: 'Yard Inspection / Photo Review',
        description: 'Review photos and physical yard inspection reports of currently available inventory units.'
      },
      {
        step: 3,
        title: 'Dispatch & Delivery Logistics',
        description: 'Coordinate transport and tilt-tray or crane delivery directly to your designated site location.'
      }
    ],
    ctaText: 'View Available Containers for Sale',
    ctaLink: '/containers'
  },
  {
    id: 'container-modification',
    title: 'Container Modification',
    shortDescription: 'Professional structural modifications, doors, windows, insulation, electrical fit-outs, and custom openings.',
    fullDescription: 'Transform standard ISO shipping containers into functional, secure, and climate-controlled workspaces. We execute all engineering modifications with structural steel reinforcements to ensure the container retains its rigidity and durability.',
    icon: 'Hammer',
    bannerImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    offerings: [
      {
        title: 'Doors, Windows & Apertures',
        description: 'Precision plasma cutting and structural steel box-section framing for heavy-duty security doors, sliding aluminum windows, and emergency exits.',
        highlights: ['Steel personnel security doors', 'Double glazed sliding windows', 'Roller shutter side access', 'Security bars and mesh']
      },
      {
        title: 'Thermal & Acoustic Insulation',
        description: 'Complete climate protection engineered for local temperature extremes, using Rockwool, Glasswool, or rigid PUF/EPS sandwich panel linings.',
        highlights: ['50mm to 100mm thermal insulation', 'Acoustic sound dampening', 'Moisture and vapor barriers', 'Fire-retardant interior panelling']
      },
      {
        title: 'Electrical & Lighting Fit-Outs',
        description: 'Concealed or surface conduit industrial electrical installations, distribution boards with MCB/ELCB protection, LED illumination, and AC provisions.',
        highlights: ['Distribution board with circuit breakers', 'Industrial external power inlets', 'High-lumen LED task lighting', 'Data raceways and socket points']
      },
      {
        title: 'Flooring, Partitions & Finishes',
        description: 'Interior wall partitions, commercial vinyl plank flooring, aluminum checker plate overlays, and heavy-duty industrial exterior paint coatings.',
        highlights: ['Heavy traffic commercial flooring', 'Internal room dividers & doors', 'Custom polyurethane paint', 'Anti-corrosive primer']
      }
    ],
    processSteps: [
      {
        step: 1,
        title: 'Define Modification Scope',
        description: 'Share your layout sketch, equipment requirements, or desired aperture placements.'
      },
      {
        step: 2,
        title: 'Engineering Review & Sizing',
        description: 'Our team prepares the reinforcement plan and material specifications for your approval.'
      },
      {
        step: 3,
        title: 'Precision Yard Fabrication',
        description: 'Cutting, welding, framing, insulation, electricals, and finishing carried out in our fabrication bay.'
      },
      {
        step: 4,
        title: 'Quality Check & Delivery',
        description: 'Weatherproof testing, electrical load checking, and dispatch to your job site.'
      }
    ],
    ctaText: 'Discuss Modification Requirements',
    ctaLink: '/custom-solutions'
  },
  {
    id: 'custom-solutions',
    title: 'Custom Container Solutions',
    shortDescription: 'Bespoke container fabrication built from scratch around your exact functional and architectural requirements.',
    fullDescription: 'Our core philosophy is simple: Tell us what you need, and we engineer the container solution around your operational workflow. From portable offices and security gatehouses to specialized equipment housings and commercial pop-ups, we fabricate to your exact specs.',
    icon: 'Layers',
    bannerImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    offerings: [
      {
        title: 'Turnkey Site Offices & Meeting Pods',
        description: 'Rapidly deployable, fully finished modern site offices for project directors, engineers, and site managers with plug-and-play power.',
        highlights: ['Executive layout options', 'Air conditioning integration', 'Modern aesthetic facades', 'Acoustic comfort']
      },
      {
        title: 'Security & Gate Checkpoint Cabins',
        description: 'Durable, high-visibility 10ft and 20ft gatekeeper cabins with 360-degree glass visibility, writing desks, and CCTV wiring channels.',
        highlights: ['Maximum perimeter visibility', 'Quick crane relocation', 'Compact site footprint', 'Thermal roof insulation']
      },
      {
        title: 'Commercial Kiosks & Retail Pods',
        description: 'Eye-catching modular retail units with hydraulic flip-up awnings, customer counters, washable kitchen linings, and custom branding.',
        highlights: ['Hydraulic service hatches', 'Food grade washable surfaces', 'Exterior sign & brand provisions', 'Secure overnight lockdown']
      },
      {
        title: 'Specialized Industrial & Equipment Enclosures',
        description: 'Custom housings for diesel generators, water filtration pumps, electrical switchgear, lab testing units, and heavy machinery.',
        highlights: ['Heavy floor load ratings', 'Louvered ventilation panels', 'Explosion-proof fixtures', 'Side access doors']
      }
    ],
    processSteps: [
      {
        step: 1,
        title: 'Share Your Exact Requirement',
        description: 'Tell us the intended use, dimensions, equipment to house, and key features needed.'
      },
      {
        step: 2,
        title: 'Solution Design & Consultation',
        description: 'We collaborate with you on layout optimization, materials selection, and cost efficiency.'
      },
      {
        step: 3,
        title: 'Bespoke Fabrication',
        description: 'Custom structural framing, insulation, fitment, and paint executed by experienced fabricators.'
      },
      {
        step: 4,
        title: 'Final Handover',
        description: 'Complete unit delivered to your location ready for immediate connection and use.'
      }
    ],
    ctaText: 'Build a Custom Solution',
    ctaLink: '/custom-solutions'
  }
];
