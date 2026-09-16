import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, MessageSquare, Copy, Check, ExternalLink, Clock, ShieldCheck } from 'lucide-react';
import { cvData } from '../data/cvData';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#205c3b] uppercase">
            <span className="w-6 h-0.5 bg-[#205c3b]"></span>
            <span>Recruitment & Inquiries</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#143d2b] tracking-tight">
            Get In Touch
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#3f4e44] leading-relaxed">
            Interested in discussing warehouse supervision, inventory control, or logistics distribution roles?
            Reach out directly via phone, WhatsApp, or email.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Phone Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            id="contact-card-phone"
            className="group bg-[#f7faf8] border border-[#dbe5df] hover:border-[#205c3b] hover:shadow-md rounded-lg p-6 flex flex-col justify-between transition-all hover:bg-white"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#ebf3ed] border border-[#d2e2d7] group-hover:border-[#205c3b] flex items-center justify-center text-[#205c3b] mb-4 transition-transform duration-200 group-hover:scale-110">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#52796f]">Direct Phone</span>
              <p className="mt-1 text-xl font-bold text-[#143d2b] tracking-tight group-hover:text-[#205c3b] transition-colors">
                {cvData.phone}
              </p>
              <p className="mt-2 text-xs text-[#52796f]">Available for calls and direct interviews in Qatar</p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e2ebe5] flex items-center gap-2">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={cvData.phoneUrl}
                id="contact-call-btn"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#143d2b] hover:bg-[#1b4332] rounded-md transition-all shadow-2xs"
              >
                <Phone className="w-4 h-4" />
                <span>Call Me</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => handleCopy(cvData.phone, 'phone')}
                className="p-2.5 rounded-md border border-[#dbe5df] bg-white text-[#2b332d] hover:bg-[#ebf3ed] transition-colors cursor-pointer"
                title="Copy phone number"
                aria-label="Copy phone number"
              >
                {copiedField === 'phone' ? (
                  <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                    <Check className="w-4 h-4 text-[#205c3b]" />
                  </motion.div>
                ) : (
                  <Copy className="w-4 h-4 text-[#52796f]" />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Email Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            id="contact-card-email"
            className="group bg-[#f7faf8] border border-[#dbe5df] hover:border-[#205c3b] hover:shadow-md rounded-lg p-6 flex flex-col justify-between transition-all hover:bg-white"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#ebf3ed] border border-[#d2e2d7] group-hover:border-[#205c3b] flex items-center justify-center text-[#205c3b] mb-4 transition-transform duration-200 group-hover:scale-110">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#52796f]">Official Email</span>
              <p className="mt-1 text-lg sm:text-xl font-bold text-[#143d2b] tracking-tight break-all group-hover:text-[#205c3b] transition-colors">
                {cvData.email}
              </p>
              <p className="mt-2 text-xs text-[#52796f]">Prompt response to inquiries and recruitment offers</p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e2ebe5] flex items-center gap-2">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={cvData.emailUrl}
                id="contact-email-btn"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#143d2b] hover:bg-[#1b4332] rounded-md transition-all shadow-2xs"
              >
                <Mail className="w-4 h-4" />
                <span>Email Me</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => handleCopy(cvData.email, 'email')}
                className="p-2.5 rounded-md border border-[#dbe5df] bg-white text-[#2b332d] hover:bg-[#ebf3ed] transition-colors cursor-pointer"
                title="Copy email address"
                aria-label="Copy email address"
              >
                {copiedField === 'email' ? (
                  <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                    <Check className="w-4 h-4 text-[#205c3b]" />
                  </motion.div>
                ) : (
                  <Copy className="w-4 h-4 text-[#52796f]" />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* WhatsApp & Location Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            id="contact-card-whatsapp"
            className="group bg-[#f7faf8] border border-[#dbe5df] hover:border-[#205c3b] hover:shadow-md rounded-lg p-6 flex flex-col justify-between transition-all hover:bg-white"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#ebf3ed] border border-[#d2e2d7] group-hover:border-[#205c3b] flex items-center justify-center text-[#205c3b] mb-4 transition-transform duration-200 group-hover:scale-110">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#52796f]">Instant Messaging</span>
              <p className="mt-1 text-xl font-bold text-[#143d2b] tracking-tight group-hover:text-[#205c3b] transition-colors">
                WhatsApp Chat
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-[#52796f]">
                <MapPin className="w-3.5 h-3.5 text-[#205c3b] shrink-0" />
                <span>{cvData.location}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e2ebe5]">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={cvData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp-btn"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0e3b26] bg-[#e1efe6] hover:bg-[#d0e5d8] border border-[#b4d6c1] rounded-md transition-all shadow-2xs"
              >
                <MessageSquare className="w-4 h-4 text-[#143d2b]" />
                <span>WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#143d2b] ml-0.5" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Recruitment verification banner */}
        <motion.div
          className="mt-10 p-6 bg-[#ebf3ed] border border-[#c8dcd0] rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#205c3b] shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-[#143d2b]">Recruitment Notice</h4>
              <p className="text-xs text-[#38483e] mt-0.5">
                Rishiram Pokhrel is located in Abu Hamour, Doha, Qatar with immediate reachability for warehouse supervisor, logistics coordinator, and fresh goods distribution positions.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#205c3b] animate-pulse"></span>
            <span className="text-xs font-bold text-[#143d2b]">Qatar Resident</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
