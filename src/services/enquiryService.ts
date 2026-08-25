import { ContainerEnquiryFormData, CustomSolutionFormData, GeneralContactFormData } from '../types';
import { getWhatsAppLink } from '../config/businessInfo';

export interface EnquirySubmissionResult {
  success: boolean;
  message: string;
  referenceId?: string;
}

/**
 * Service to handle customer enquiry submissions.
 * Currently simulates client-side submission and prepares data for future backend/email API.
 */
export const EnquiryService = {
  /**
   * Submit an enquiry for a specific container
   */
  async submitContainerEnquiry(data: ContainerEnquiryFormData): Promise<EnquirySubmissionResult> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Basic validation
    if (!data.name || !data.phone || !data.containerId) {
      return {
        success: false,
        message: 'Please provide your name, phone number, and required container details.'
      };
    }

    const refId = `JMD-ENQ-${Math.floor(100000 + Math.random() * 900000)}`;
    console.log('[Enquiry Submitted - Container]:', { ...data, referenceId: refId, timestamp: new Date().toISOString() });

    return {
      success: true,
      message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
      referenceId: refId
    };
  },

  /**
   * Submit a custom solution requirement form
   */
  async submitCustomSolutionRequirement(data: CustomSolutionFormData): Promise<EnquirySubmissionResult> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!data.name || !data.phone || !data.intendedUse) {
      return {
        success: false,
        message: 'Please fill in your name, phone number, and intended use for the container.'
      };
    }

    const refId = `JMD-CUST-${Math.floor(100000 + Math.random() * 900000)}`;
    console.log('[Enquiry Submitted - Custom Solution]:', { ...data, referenceId: refId, timestamp: new Date().toISOString() });

    return {
      success: true,
      message: 'Your custom container requirement has been recorded! Our technical team will review your specifications and get in touch with you.',
      referenceId: refId
    };
  },

  /**
   * Submit a general contact enquiry
   */
  async submitGeneralContact(data: GeneralContactFormData): Promise<EnquirySubmissionResult> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!data.name || !data.phone || !data.message) {
      return {
        success: false,
        message: 'Please provide your name, phone number, and message.'
      };
    }

    const refId = `JMD-MSG-${Math.floor(100000 + Math.random() * 900000)}`;
    console.log('[Enquiry Submitted - General Contact]:', { ...data, referenceId: refId, timestamp: new Date().toISOString() });

    return {
      success: true,
      message: 'Thank you for reaching out! We have received your message and will respond promptly.',
      referenceId: refId
    };
  },

  /**
   * Format a direct WhatsApp deep link from custom form data
   */
  buildCustomRequirementWhatsAppUrl(data: Partial<CustomSolutionFormData>): string {
    const lines = [
      `*New Custom Container Requirement*`,
      `• Name: ${data.name || 'Not provided'}`,
      data.company ? `• Company: ${data.company}` : '',
      `• Intended Use: ${data.intendedUse || 'Custom Purpose'}`,
      `• Desired Size: ${data.containerSize || 'To be decided'}`,
      data.quantity ? `• Quantity: ${data.quantity}` : '',
      data.modifications && data.modifications.length > 0 ? `• Modifications Needed: ${data.modifications.join(', ')}` : '',
      data.description ? `• Description: ${data.description}` : ''
    ].filter(Boolean);

    return getWhatsAppLink(lines.join('\n'));
  }
};
