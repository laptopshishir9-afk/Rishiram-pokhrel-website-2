import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Building2, Check, ArrowRight } from 'lucide-react';
import { cvData } from '../data/cvData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 bg-white border-b border-[#e2ebe5] overflow-hidden">
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
            <span>Career History</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#143d2b] tracking-tight">
            Work Experience
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#3f4e44] leading-relaxed">
            15+ continuous years of operational excellence in Qatar across warehouse supervision, fresh food
            logistics, distribution dispatch, and merchandise management.
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="mt-14 relative">
          {/* Vertical continuous line */}
          <div
            className="absolute left-4 sm:left-8 top-3 bottom-6 w-0.5 bg-[#dbe5df]"
            aria-hidden="true"
          ></div>

          <div className="space-y-12 sm:space-y-14">
            {cvData.experiences.map((exp, index) => (
              <motion.div
                key={index}
                id={`experience-entry-${index}`}
                className="relative pl-12 sm:pl-20 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline node */}
                <div
                  className={`absolute left-2.5 sm:left-6.5 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-transform duration-200 ${
                    exp.isCurrent
                      ? 'bg-[#143d2b] border-[#143d2b] ring-4 ring-[#ebf3ed]'
                      : 'bg-white border-[#205c3b] group-hover:bg-[#205c3b]'
                  }`}
                  aria-hidden="true"
                >
                  {exp.isCurrent && (
                    <motion.span
                      className="absolute -inset-1 rounded-full bg-[#205c3b]"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </div>

                {/* Experience Card */}
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-[#f7faf8] border border-[#dbe5df] group-hover:border-[#205c3b] rounded-lg p-6 sm:p-8 transition-all hover:bg-white shadow-xs hover:shadow-md cursor-default"
                >
                  {/* Top Meta: Dates & Current badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#e2ebe5]">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#143d2b]">
                      <Calendar className="w-4 h-4 text-[#205c3b]" />
                      <span className="tracking-wide">{exp.period}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {exp.isCurrent && (
                        <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white bg-[#143d2b] rounded-full shadow-2xs">
                          Present Role
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs text-[#52796f] font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#205c3b]" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Role & Company */}
                  <div className="mt-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#143d2b] leading-snug group-hover:text-[#205c3b] transition-colors">
                      {exp.role}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-base font-semibold text-[#205c3b]">
                      <Building2 className="w-4 h-4 text-[#205c3b]" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  {/* Responsibilities list */}
                  <div className="mt-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#52796f] mb-3">
                      Key Responsibilities & Achievements:
                    </h4>
                    <ul className="space-y-2.5">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-3 text-sm sm:text-base text-[#2b332d] leading-relaxed">
                          <span className="mt-1 w-4 h-4 rounded-full bg-[#ebf3ed] text-[#205c3b] flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary note */}
        <motion.div
          className="mt-12 text-center text-xs text-[#63756b] border-t border-[#e2ebe5] pt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span>Continuous track record in Qatar logistics from 2009 to Present. Validated directly from candidate CV.</span>
        </motion.div>
      </div>
    </section>
  );
};
