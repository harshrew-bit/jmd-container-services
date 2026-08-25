import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Phone, Mail, MapPin, MessageSquare, Clock, ArrowUpRight, Shield } from 'lucide-react';
import { getWhatsAppLink } from '../../config/businessInfo';
import { useBusinessInfo } from '../../hooks/useData';

export const Footer: React.FC = () => {
  const { businessInfo } = useBusinessInfo();

  const phoneDisplay = businessInfo?.phone.display || '+91 87081 40861';
  const phoneRaw = businessInfo?.phone.raw || '+918708140861';
  const waDisplay = businessInfo?.whatsapp.display || '+91 87081 40861';
  const waNumber = businessInfo?.whatsapp.number || '918708140861';
  const emailDisplay = businessInfo?.email.display || 'jmdcontainer@gmail.com';
  const emailAddress = businessInfo?.email.address || 'jmdcontainer@gmail.com';
  const fullAddress = businessInfo?.address.fullDisplay || 'Container Yard & Fabrication Facility, Bawal Road, Rewari, Haryana';
  const weekdays = businessInfo?.operatingHours.weekdays || 'Monday – Friday: 9:00 AM – 7:00 PM';
  const saturday = businessInfo?.operatingHours.saturday || 'Saturday: 9:00 AM – 5:00 PM';

  return (
    <footer className="bg-charcoal-900 dark:bg-charcoal-950 border-t border-charcoal-800 text-charcoal-400 relative overflow-hidden transition-colors">
      {/* Subtle Crimson hazard industrial stripe */}
      <div className="h-1 w-full hazard-stripe opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Col 1: Brand & Value Prop */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center text-white font-bold shadow-md shadow-brand-700/20">
                <Box className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-extrabold tracking-tight text-white">
                  JMD <span className="text-brand-500">CONTAINER</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal-400 -mt-1">
                  SERVICES
                </span>
              </div>
            </Link>

            <p className="text-sm text-charcoal-300 leading-relaxed">
              {businessInfo?.tagline || 'Custom Container Solutions. Built Around Your Requirements.'}
            </p>

            <div className="p-3.5 rounded-xl bg-charcoal-950/80 border border-charcoal-800 text-xs text-charcoal-300">
              <p className="font-bold text-brand-400 mb-1">Our Core Value Proposition:</p>
              <p className="italic">"{businessInfo?.coreValueProp || 'Tell us what you need. We build the container solution around your requirements.'}"</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/containers" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <span>Available Containers</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <span>Our Services</span>
                </Link>
              </li>
              <li>
                <Link to="/our-work" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <span>Our Work (Portfolio)</span>
                </Link>
              </li>
              <li>
                <Link to="/custom-solutions" className="hover:text-brand-400 transition-colors flex items-center gap-1.5 text-brand-400 font-semibold">
                  <span>Custom Solutions Builder</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <span>Contact & Yard Location</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Container Capabilities */}
          <div>
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              Container Capabilities
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-300">
              <li className="flex items-start gap-2">
                <span className="text-brand-500 font-bold">›</span>
                <span>Raw Shipping Container Sales (10ft, 20ft, 40ft, HC)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 font-bold">›</span>
                <span>Container Modification (Doors, Windows, Insulation)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 font-bold">›</span>
                <span>Site Offices & Executive Meeting Pods</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 font-bold">›</span>
                <span>Security Gatehouses & Checkpoints</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 font-bold">›</span>
                <span>Commercial Kiosks & Food Pods</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 font-bold">›</span>
                <span>Custom Fabricated Industrial Units</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Contact & Hours */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              Direct Enquiries
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <a
                href={`tel:${phoneRaw}`}
                className="flex items-start gap-2.5 hover:text-brand-400 text-charcoal-300 transition-colors group"
              >
                <Phone className="w-4 h-4 text-brand-500 mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-charcoal-500 uppercase font-mono">Phone Call</div>
                  <span className="text-white font-semibold">{phoneDisplay}</span>
                </div>
              </a>

              <a
                href={getWhatsAppLink(undefined, waNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors group"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-emerald-500 uppercase font-mono">WhatsApp Instant</div>
                  <span>{waDisplay}</span>
                </div>
              </a>

              <a
                href={`mailto:${emailAddress}`}
                className="flex items-start gap-2.5 hover:text-brand-400 text-charcoal-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-charcoal-500 uppercase font-mono">Email Enquiries</div>
                  <span className="text-white break-all">{emailDisplay}</span>
                </div>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-charcoal-500 uppercase font-mono">Yard Facility</div>
                  <span className="text-charcoal-300 text-xs">{fullAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-charcoal-500 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-charcoal-400">
                  <div>{weekdays}</div>
                  <div>{saturday}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-400">
          <p>© {new Date().getFullYear()} {businessInfo?.name || 'JMD Container Services'}. All rights reserved.</p>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-charcoal-400 font-mono text-[11px]">
              Industrial Grade Container Engineering
            </span>
            <span className="text-charcoal-700">|</span>
            <Link 
              to="/owner/login" 
              className="text-charcoal-400 hover:text-charcoal-200 flex items-center gap-1 transition-colors text-[11px]"
              title="Private Owner Portal"
            >
              <Shield className="w-3 h-3" />
              <span>Owner Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
