import React from 'react';
import { ArrowUp, Mail, Phone, MessageSquare, MapPin } from 'lucide-react';
import { cvData } from '../data/cvData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="no-print bg-[#143d2b] text-white border-t border-[#0e2c1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#23583e]">
          {/* Identity */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold tracking-tight text-white uppercase">
              {cvData.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-[#84b99d]">
              {cvData.title} • Doha, Qatar
            </p>
            <p className="mt-3 text-xs sm:text-sm text-[#b6d6c4] leading-relaxed max-w-md">
              15+ years of verified logistics, inventory control, perishable fresh goods handling, and warehouse operations experience across leading supply chain organizations in Qatar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#84b99d] mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#d4e7dc]">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#profile" className="hover:text-white transition-colors">Professional Profile</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">Core Skills</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">Work Experience</a>
              </li>
              <li>
                <a href="#education" className="hover:text-white transition-colors">Education & Languages</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Direct Reach */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#84b99d] mb-3">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-[#d4e7dc]">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#84b99d] shrink-0" />
                <a href={cvData.phoneUrl} className="hover:text-white transition-colors">
                  {cvData.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#84b99d] shrink-0" />
                <a href={cvData.emailUrl} className="hover:text-white transition-colors break-all">
                  {cvData.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#84b99d] shrink-0" />
                <span>{cvData.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#84b99d]">
          <p>© {new Date().getFullYear()} Rishiram Pokhrel. Professional CV & Portfolio. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-[#84b99d] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
