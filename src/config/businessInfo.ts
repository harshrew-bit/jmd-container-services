import { BusinessContactInfo } from '../types';

export const BUSINESS_INFO: BusinessContactInfo = {
  name: "JMD Container Services",
  shortName: "JMD Containers",
  tagline: "Custom Container Solutions. Built Around Your Requirements.",
  coreValueProp: "Tell us what you need. We build the container solution around your requirements.",
  
  phone: {
    display: "+91 87081 40861",
    raw: "+918708140861",
    isPlaceholder: false,
  },
  whatsapp: {
    display: "+91 87081 40861",
    number: "918708140861",
    isPlaceholder: false,
  },
  email: {
    display: "jmdcontainer@gmail.com",
    address: "jmdcontainer@gmail.com",
    isPlaceholder: false,
  },
  address: {
    line1: "Container Yard & Fabrication Facility",
    line2: "Industrial Area Phase II",
    city: "Rewari",
    state: "Haryana",
    postalCode: "123401",
    country: "India",
    fullDisplay: "Container Yard & Fabrication Facility, Bawal Road, Rewari, Haryana - 123401",
    isPlaceholder: false,
  },
  operatingHours: {
    weekdays: "Monday – Friday: 9:00 AM – 7:00 PM",
    saturday: "Saturday: 9:00 AM – 5:00 PM",
    sunday: "Sunday: Closed / By Appointment",
  },
  capabilities: [
    "Raw Shipping Container Sales (20ft, 40ft, High Cube)",
    "Container Modifications (Doors, Windows, Insulation, Electricals)",
    "Custom Fabricated Container Solutions from Scratch",
    "Tailored Modular Units for Commercial, Industrial & Site Uses"
  ]
};

/**
 * Generate a pre-filled WhatsApp link for direct customer chat
 */
export function getWhatsAppLink(customMessage?: string, overrideNumber?: string): string {
  const baseNumber = overrideNumber || BUSINESS_INFO.whatsapp.number;
  const defaultText = `Hi JMD Container Services, I am interested in discussing a container requirement.`;
  const text = encodeURIComponent(customMessage || defaultText);
  return `https://wa.me/${baseNumber}?text=${text}`;
}

/**
 * Generate a WhatsApp link specific to a container inventory item
 */
export function getContainerWhatsAppLink(containerId: string, containerTitle: string, size?: string, overrideNumber?: string): string {
  const text = `Hi JMD Container Services, I would like to enquire about the container "${containerTitle}" (ID: ${containerId}${size ? `, Size: ${size}` : ''}). Please share details and availability.`;
  return getWhatsAppLink(text, overrideNumber);
}

/**
 * Generate a WhatsApp link for a custom solution requirement
 */
export function getCustomSolutionWhatsAppLink(useCase: string, size?: string, overrideNumber?: string): string {
  const text = `Hi JMD Container Services, I have a custom container requirement for "${useCase}"${size ? ` in size: ${size}` : ''}. Could we discuss specifications and possibilities?`;
  return getWhatsAppLink(text, overrideNumber);
}
