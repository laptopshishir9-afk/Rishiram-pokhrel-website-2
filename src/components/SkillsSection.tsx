import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Boxes,
  CheckCircle2,
  Apple,
  Package,
  FileSpreadsheet,
  Monitor,
  ShieldCheck,
  MapPin,
  Forklift,
  UserCheck,
  Clock,
  HeartHandshake,
  Bus,
  Truck,
  Sparkles,
} from 'lucide-react';
import { cvData } from '../data/cvData';

// Map icon to exact skill name
const skillIconMap: Record<string, React.ElementType> = {
  'Warehouse Management & Supervision': Boxes,
  'Inventory Control & Stock Accuracy': CheckCircle2,
  'Fruits & Vegetables Handling': Apple,
  'FMCG, Non-Food, DPH & LHH Items': Package,
  'Receiving, Dispatch & Documentation': FileSpreadsheet,
  'Computer Basic Knowledge': Monitor,
  'Safe and Punctual Driving': ShieldCheck,
  'Local Route Understanding (Qatar)': MapPin,
  'Forklift Operation': Forklift,
  'Responsible & Self-Motivated': UserCheck,
  'Time Management & Work Planning': Clock,
  'Customer-focused Service with Attention to Quality and Safety': HeartHandshake,
  'Staff Bus Driving Experience': Bus,
  'Delivery Driving': Truck,
};

type SkillCategory = 'all' | 'warehouse' | 'fresh_fmcg' | 'driving' | 'management';

const categories: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All Competencies (14)' },
  { id: 'warehouse', label: 'Warehouse & Inventory' },
  { id: 'fresh_fmcg', label: 'Fresh Produce & FMCG' },
  { id: 'driving', label: 'Driving & Qatar Routes' },
  { id: 'management', label: 'Work Planning & Service' },
];

const categoryMapping: Record<SkillCategory, string[]> = {
  all: cvData.skills,
  warehouse: [
    'Warehouse Management & Supervision',
    'Inventory Control & Stock Accuracy',
    'Receiving, Dispatch & Documentation',
    'Forklift Operation',
    'Computer Basic Knowledge',
  ],
  fresh_fmcg: [
    'Fruits & Vegetables Handling',
    'FMCG, Non-Food, DPH & LHH Items',
    'Customer-focused Service with Attention to Quality and Safety',
  ],
  driving: [
    'Delivery Driving',
    'Staff Bus Driving Experience',
    'Safe and Punctual Driving',
    'Local Route Understanding (Qatar)',
  ],
  management: [
    'Responsible & Self-Motivated',
    'Time Management & Work Planning',
    'Customer-focused Service with Attention to Quality and Safety',
  ],
};

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

  const filteredSkills = cvData.skills.filter((skill) =>
    activeCategory === 'all' ? true : categoryMapping[activeCategory]?.includes(skill)
  );

  return (
    <section id="skills" className="py-16 sm:py-20 bg-[#f7faf8] border-b border-[#e2ebe5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#205c3b] uppercase">
            <span className="w-6 h-0.5 bg-[#205c3b]"></span>
            <span>Verified Capabilities</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#143d2b] tracking-tight">
            Core Competencies & Skills
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#3f4e44] leading-relaxed">
            Direct competencies drawn strictly from active roles across warehouse supervision, stock
            control, fleet delivery, and fresh food handling.
          </p>
        </motion.div>

        {/* Category Filter Pills with animated active background indicator */}
        <motion.div
          className="mt-8 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-[#3f4e44] bg-white hover:bg-[#ebf3ed] border border-[#dbe5df]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-full bg-[#143d2b]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Animated Skills Grid */}
        <motion.div layout className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const Icon = skillIconMap[skill] || CheckCircle2;
              return (
                <motion.div
                  key={skill}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  id={`skill-card-${index}`}
                  className="bg-white rounded-lg p-4 border border-[#dbe5df] hover:border-[#205c3b] transition-all flex items-start gap-3.5 group shadow-xs hover:shadow-md cursor-default"
                >
                  <div className="shrink-0 w-9 h-9 rounded-md bg-[#ebf3ed] border border-[#d2e2d7] flex items-center justify-center text-[#143d2b] group-hover:bg-[#143d2b] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-4 h-4 text-[#205c3b] group-hover:text-white transition-colors duration-200" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-[#1e2420] group-hover:text-[#143d2b] leading-snug transition-colors">
                      {skill}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#205c3b]"></span>
                      <span className="text-[11px] font-medium text-[#52796f]">
                        15+ Yrs Industry Verified
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Practical Experience Callout */}
        <motion.div
          className="mt-10 p-5 rounded-lg bg-white border border-[#dbe5df] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-8 h-8 rounded-full bg-[#143d2b] text-white flex items-center justify-center font-bold text-xs shrink-0"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              ✓
            </motion.div>
            <div>
              <p className="text-sm font-semibold text-[#143d2b]">
                Strict Adherence to Quality, Hygiene, and Qatar Municipality Safety Standards
              </p>
              <p className="text-xs text-[#52796f] mt-0.5">
                Experienced in operating warehouse forklifts, coordinating logistics personnel, and managing fresh perishable storage.
              </p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xs font-semibold text-[#205c3b] bg-[#ebf3ed] px-3 py-1.5 rounded-md border border-[#c8dcd0] shrink-0 shadow-2xs"
          >
            Recruitment-Ready
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
