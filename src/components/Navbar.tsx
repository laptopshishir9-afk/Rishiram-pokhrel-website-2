import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, FileDown, Phone, MessageSquare, MapPin } from 'lucide-react';
import { cvData } from '../data/cvData';

interface NavbarProps {
  onOpenCvModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCvModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Profile', href: '#profile' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navigation"
      className="no-print sticky top-0 z-40 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#e2ebe5] transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Identity */}
          <a
            href="#home"
            id="nav-logo"
            className="group flex flex-col focus:outline-none"
            aria-label="Rishiram Pokhrel - Home"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#143d2b] group-hover:text-[#205c3b] transition-colors">
              RISHIRAM POKHREL
            </span>
            <span className="text-xs sm:text-sm font-medium tracking-wide text-[#52796f] flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#205c3b] animate-pulse"></span>
              Warehouse Supervisor • Doha, Qatar
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                id={`nav-link-${link.name.toLowerCase()}`}
                className="px-3.5 py-2 text-sm font-semibold text-[#2b332d] hover:text-[#143d2b] hover:bg-[#f4f8f5] rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={cvData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#143d2b] bg-[#f4f8f5] border border-[#dbe5df] hover:bg-[#ebf3ed] hover:border-[#205c3b] rounded-md transition-all shadow-2xs"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#205c3b]" />
              <span>WhatsApp</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={onOpenCvModal}
              id="nav-download-cv-btn"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#143d2b] hover:bg-[#1b4332] active:bg-[#0f2d20] shadow-sm rounded-md transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Download CV</span>
            </motion.button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onOpenCvModal}
              id="mobile-header-cv-btn"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-[#143d2b] rounded-md"
              aria-label="Download CV"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>CV</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="p-2 rounded-md text-[#2b332d] hover:text-[#143d2b] hover:bg-[#f4f8f5] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            id="mobile-nav-drawer"
            className="md:hidden bg-white border-b border-[#e2ebe5] px-4 pt-3 pb-6 space-y-2 shadow-lg overflow-hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-[#2b332d] hover:text-[#143d2b] hover:bg-[#f4f8f5]"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-[#e2ebe5] space-y-2.5">
              <div className="flex items-center text-xs text-[#52796f] px-3 py-1">
                <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#205c3b]" />
                <span>Abu Hamour, Doha, Qatar</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCvModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#143d2b] hover:bg-[#1b4332] rounded-md shadow-sm"
              >
                <FileDown className="w-4 h-4" />
                <span>Download / Print CV</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={cvData.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#143d2b] bg-[#f4f8f5] border border-[#dbe5df] rounded-md"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#205c3b]" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={cvData.phoneUrl}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#143d2b] bg-[#f4f8f5] border border-[#dbe5df] rounded-md"
                >
                  <Phone className="w-3.5 h-3.5 text-[#205c3b]" />
                  <span>Call Phone</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
