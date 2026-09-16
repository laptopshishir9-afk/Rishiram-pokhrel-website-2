import React from 'react';
import { motion } from 'motion/react';
import {
  FileDown,
  Mail,
  MessageSquare,
  MapPin,
  Award,
  CheckCircle2,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { cvData } from '../data/cvData';
import { ProfilePhotoFrame } from './ProfilePhotoFrame';

interface HeroSectionProps {
  onOpenCvModal: () => void;
  photoUrl: string | null;
  onPhotoChange?: (newPhoto: string) => void;
  onResetPhoto?: () => void;
  isCustomPhoto?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCvModal,
  photoUrl,
  onPhotoChange,
  onResetPhoto,
  isCustomPhoto,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="home"
      className="relative bg-gradient-to-b from-[#ffffff] via-[#f7faf8] to-[#f0f6f2] border-b border-[#e2ebe5] pt-10 pb-16 sm:pt-14 sm:pb-20 overflow-hidden"
    >
      {/* Subtle geometric pattern accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#143d2b_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Floating subtle ambient glow orbs */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#143d2b]/5 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-[#52b788]/10 blur-3xl pointer-events-none"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Info Column */}
          <motion.div
            className="lg:col-span-8 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status pill badge with animated pulse */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ebf3ed] border border-[#d2e2d7] text-xs font-semibold text-[#143d2b] mb-5 shadow-2xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#205c3b] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#205c3b]"></span>
              </span>
              <span>Available in Doha, Qatar • 15+ Years Industry Experience</span>
            </motion.div>

            {/* Candidate Name */}
            <motion.h1
              variants={itemVariants}
              id="hero-candidate-name"
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#143d2b] uppercase"
            >
              {cvData.name}
            </motion.h1>

            {/* Job Title */}
            <motion.div
              variants={itemVariants}
              className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2 sm:gap-3"
            >
              <h2
                id="hero-job-title"
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#205c3b] tracking-normal"
              >
                {cvData.title}
              </h2>
              <span className="hidden sm:inline-block text-[#52796f]">•</span>
              <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#52796f]">
                <MapPin className="w-4 h-4 text-[#205c3b]" />
                {cvData.location}
              </span>
            </motion.div>

            {/* Professional Introduction */}
            <motion.p
              variants={itemVariants}
              id="hero-intro-text"
              className="mt-5 text-lg sm:text-xl font-medium text-[#1e2420] leading-relaxed max-w-3xl"
            >
              “{cvData.heroIntro}”
            </motion.p>

            {/* Supporting Text */}
            <motion.p
              variants={itemVariants}
              id="hero-supporting-text"
              className="mt-3.5 text-sm sm:text-base text-[#3f4e44] leading-relaxed max-w-3xl"
            >
              {cvData.heroSupporting}
            </motion.p>

            {/* Key Qualifications Snapshot Pills with interactive hover micro-animations */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-wrap gap-2 sm:gap-2.5"
            >
              {[
                { icon: ShieldCheck, text: '15+ Years Operations & Inventory' },
                { icon: Truck, text: 'Qatar Light Driving License (Manual)' },
                { icon: Award, text: 'Fruits & Veg / FMCG / DPH / LHH' },
                { icon: CheckCircle2, text: 'Forklift & Banana Ripening Certified' },
              ].map((pill, pIdx) => {
                const Icon = pill.icon;
                return (
                  <motion.div
                    key={pIdx}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#dbe5df] hover:border-[#205c3b] hover:shadow-xs transition-colors text-xs font-medium text-[#2b332d] cursor-default"
                  >
                    <Icon className="w-4 h-4 text-[#205c3b]" />
                    <span>{pill.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              {/* Download CV */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenCvModal}
                id="hero-download-cv-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-sm sm:text-base font-semibold text-white bg-[#143d2b] hover:bg-[#1b4332] active:bg-[#0f2d20] shadow-sm transition-all focus:ring-2 focus:ring-[#205c3b] focus:ring-offset-2 cursor-pointer group"
              >
                <motion.div
                  animate={{ y: [0, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                >
                  <FileDown className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.div>
                <span>Download CV</span>
              </motion.button>

              {/* Contact Me */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                id="hero-contact-me-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-sm sm:text-base font-semibold text-[#143d2b] bg-white border border-[#c8d6cc] hover:bg-[#f4f8f5] hover:border-[#143d2b] transition-all shadow-2xs"
              >
                <Mail className="w-4 h-4 text-[#205c3b]" />
                <span>Contact Me</span>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href={cvData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                id="hero-whatsapp-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-sm sm:text-base font-semibold text-[#0e3b26] bg-[#e1efe6] hover:bg-[#d0e5d8] border border-[#b4d6c1] transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#143d2b]" />
                <span>WhatsApp</span>
              </motion.a>
            </motion.div>

            {/* Quick Impact Metrics Ribbon */}
            <motion.div
              variants={itemVariants}
              className="mt-10 pt-6 border-t border-[#e2ebe5] grid grid-cols-3 gap-3 sm:gap-6 max-w-xl"
            >
              <motion.div
                whileHover={{ y: -3 }}
                className="p-3 rounded-lg bg-white/80 border border-[#dbe5df] text-center shadow-2xs transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#143d2b]">
                  15+
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-[#52796f] mt-0.5 uppercase tracking-wider">
                  Years In Qatar
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="p-3 rounded-lg bg-white/80 border border-[#dbe5df] text-center shadow-2xs transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#205c3b]">
                  100%
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-[#52796f] mt-0.5 uppercase tracking-wider">
                  Verified Roles
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="p-3 rounded-lg bg-white/80 border border-[#dbe5df] text-center shadow-2xs transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#143d2b]">
                  Manual
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-[#52796f] mt-0.5 uppercase tracking-wider">
                  Qatar License
                </div>
              </motion.div>
            </motion.div>

            {/* Subtle note */}
            <motion.div
              variants={itemVariants}
              className="mt-5 flex items-center gap-2 text-xs text-[#63756b]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#52796f]"></span>
              <span>Direct employer contact & verified operational record • Doha, Qatar</span>
            </motion.div>
          </motion.div>

          {/* Unique Oval Framed Photo Column with entrance motion */}
          <motion.div
            className="lg:col-span-4 order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
          >
            <ProfilePhotoFrame
              photoUrl={photoUrl}
              onPhotoChange={onPhotoChange}
              onResetPhoto={onResetPhoto}
              isCustomPhoto={isCustomPhoto}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
