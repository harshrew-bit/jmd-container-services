import { useEffect } from 'react';
import { BUSINESS_INFO } from '../../config/businessInfo';

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = 'JMD Container Services - Raw shipping containers, container modifications, and custom container fabrication built around your requirements.'
}) => {
  useEffect(() => {
    const pageTitle = title
      ? `${title} | ${BUSINESS_INFO.name}`
      : `${BUSINESS_INFO.name} | Custom Container Solutions & Container Sales`;

    document.title = pageTitle;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
};
