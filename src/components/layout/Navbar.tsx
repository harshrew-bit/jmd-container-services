import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, Box, ArrowRight } from 'lucide-react';
import { getWhatsAppLink } from '../../config/businessInfo';
import { useBusinessInfo, useSiteMedia } from '../../hooks/useData';
import { Button } from '../common/Button';
import { ThemeToggle } from '../common/ThemeToggle';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const { businessInfo } = useBusinessInfo();
  const { media } = useSiteMedia();

  const phoneDisplay = businessInfo?.phone.display || '+91 98765 43210';
  const phoneRaw = businessInfo?.phone.raw || '+919876543210';
  const waNumber = businessInfo?.whatsapp.number || '919876543210';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Available Containers', path: '/containers' },
    { name: 'Our Services', path: '/services' },
    { name: 'Our Work', path: '/our-work' },
    { name: 'Custom Solutions', path: '/custom-solutions' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top industrial status bar */}
      <div className="bg-charcoal-900 dark:bg-charcoal-950 border-b border-charcoal-800 text-xs text-charcoal-400 py-1.5 px-4 sm:px-8 hidden md:block transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-charcoal-300 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Container Yard & Fabrication Facility Active
            </span>
            <span className="text-charcoal-700">|</span>
            <span className="text-charcoal-400">
              Raw Sales • Custom Modifications • Turnkey Engineering
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-brand-400 text-charcoal-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-500" />
              <span>{phoneDisplay}</span>
            </a>
            <span className="text-charcoal-700">|</span>
            <a
              href={getWhatsAppLink(undefined, waNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav
        className={`w-full transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-white/95 dark:bg-charcoal-950/95 backdrop-blur-md border-charcoal-200 dark:border-charcoal-800 shadow-md py-3'
            : 'bg-white/90 dark:bg-charcoal-900/90 backdrop-blur-md border-charcoal-200/80 dark:border-charcoal-800/80 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              {media?.logoUrl ? (
                <img src={media.logoUrl} alt="JMD Container Services Logo" className="h-10 w-auto object-contain" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center text-white shadow-md shadow-brand-700/25 group-hover:scale-105 transition-transform">
                  <Box className="w-6 h-6 stroke-[2.5]" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-charcoal-950 dark:text-white flex items-center gap-1.5">
                  JMD <span className="text-brand-700 dark:text-brand-500 font-bold">CONTAINER</span>
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-charcoal-500 dark:text-charcoal-400 -mt-1">
                  SERVICES
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-charcoal-800'
                        : 'text-charcoal-700 dark:text-charcoal-300 hover:text-brand-700 dark:hover:text-white hover:bg-charcoal-100 dark:hover:bg-charcoal-800/60'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Right Action CTA & Theme Toggle (Desktop) */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />

              <Button
                variant="primary"
                size="sm"
                href="/custom-solutions"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Request a Quote
              </Button>
            </div>

            {/* Mobile Actions: WhatsApp, ThemeToggle & Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />

              <a
                href={getWhatsAppLink(undefined, waNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 border border-charcoal-200 dark:border-charcoal-700 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-charcoal-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-950 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fadeIn">
            <div className="grid gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-charcoal-900 font-bold'
                        : 'text-charcoal-700 dark:text-charcoal-200 hover:bg-charcoal-100 dark:hover:bg-charcoal-900'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-charcoal-400" />
                </NavLink>
              ))}
            </div>

            <div className="pt-3 border-t border-charcoal-200 dark:border-charcoal-800 grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                href={`tel:${phoneRaw}`}
                leftIcon={<Phone className="w-4 h-4 text-brand-600" />}
                fullWidth
              >
                Call Us
              </Button>
              <Button
                variant="whatsapp"
                size="sm"
                href={getWhatsAppLink(undefined, waNumber)}
                target="_blank"
                leftIcon={<MessageSquare className="w-4 h-4" />}
                fullWidth
              >
                WhatsApp
              </Button>
            </div>

            <div className="pt-1">
              <Button
                variant="primary"
                size="md"
                href="/custom-solutions"
                fullWidth
              >
                Discuss Your Requirement
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
