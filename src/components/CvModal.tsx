import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Check, Copy } from 'lucide-react';
import { cvData } from '../data/cvData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl?: string | null;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, photoUrl }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyAll = () => {
    const text = `
${cvData.name.toUpperCase()}
${cvData.title}
Phone: ${cvData.phone} | Email: ${cvData.email}
Location: ${cvData.location}
Driving License: ${cvData.license}

PROFESSIONAL SUMMARY
${cvData.heroIntro}
${cvData.heroSupporting}

CORE SKILLS
${cvData.skills.map((s) => `• ${s}`).join('\n')}

WORK EXPERIENCE
${cvData.experiences
  .map(
    (e) => `
${e.role} — ${e.company}, ${e.location}
${e.period}
${e.responsibilities.map((r) => `  - ${r}`).join('\n')}`
  )
  .join('\n')}

EDUCATION
${cvData.education.degree}
${cvData.education.institution}, ${cvData.education.location}

LANGUAGES
${cvData.languages.join(', ')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="cv-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-cv-title"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-[#dbe5df] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Action Header (No-print) */}
        <div className="no-print bg-[#143d2b] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#0f2d20] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#40916c]"></span>
            <span className="text-sm font-semibold tracking-wide" id="modal-cv-title">
              Official Curriculum Vitae — Rishiram Pokhrel
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#205c3b] hover:bg-[#286644] text-white rounded transition-colors"
              title="Copy plain text CV"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              id="modal-print-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-white text-[#143d2b] hover:bg-[#f4f8f5] rounded transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#143d2b]" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              id="modal-close-btn"
              className="p-1.5 text-white/80 hover:text-white rounded hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document Container */}
        <div className="overflow-y-auto p-6 sm:p-10 bg-[#ffffff] text-[#1e2420] text-sm leading-normal">
          {/* Header */}
          <div className="border-b-2 border-[#143d2b] pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#143d2b] tracking-tight uppercase">
                {cvData.name}
              </h1>
              <h2 className="text-lg sm:text-xl font-bold text-[#205c3b] mt-1">
                {cvData.title}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-[#38483e]">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#205c3b]" />
                  {cvData.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#205c3b]" />
                  {cvData.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#205c3b]" />
                  {cvData.location}
                </span>
              </div>

              <div className="mt-2 text-xs font-semibold text-[#143d2b]">
                <span>License: {cvData.license}</span>
              </div>
            </div>

            {photoUrl && (
              <div className="shrink-0 flex sm:justify-end">
                <div className="w-20 h-26 rounded-[50%] p-1 border-2 border-[#143d2b] bg-white shadow-xs">
                  <div className="w-full h-full rounded-[50%] overflow-hidden border border-[#84b99d]">
                    <img
                      src={photoUrl}
                      alt={cvData.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.fallbackTried) {
                          target.dataset.fallbackTried = 'true';
                          target.src = './profile.jpg';
                        }
                      }}
                      className="w-full h-full object-cover rounded-[50%]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Professional Summary */}
          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#143d2b] border-b border-[#dbe5df] pb-1">
              Professional Profile
            </h3>
            <p className="mt-2 text-sm text-[#2b332d] leading-relaxed">
              {cvData.heroIntro}
            </p>
            <p className="mt-1.5 text-sm text-[#2b332d] leading-relaxed">
              {cvData.heroSupporting}
            </p>
          </div>

          {/* Core Skills */}
          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#143d2b] border-b border-[#dbe5df] pb-1">
              Core Skills & Capabilities
            </h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm text-[#2b332d]">
              {cvData.skills.map((skill, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-[#205c3b] font-bold">•</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#143d2b] border-b border-[#dbe5df] pb-1">
              Work Experience
            </h3>

            <div className="mt-4 space-y-6">
              {cvData.experiences.map((exp, idx) => (
                <div key={idx} className="page-break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h4 className="text-sm sm:text-base font-bold text-[#143d2b]">
                      {exp.role}
                    </h4>
                    <span className="text-xs font-semibold text-[#52796f]">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#205c3b]">
                    {exp.company} — {exp.location}
                  </p>

                  <ul className="mt-2 space-y-1 text-xs sm:text-sm text-[#2b332d]">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="text-[#205c3b] font-bold mt-0.5">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Languages */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#dbe5df] page-break-inside-avoid">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#143d2b] border-b border-[#dbe5df] pb-1">
                Education
              </h3>
              <div className="mt-2">
                <p className="text-sm font-bold text-[#143d2b]">{cvData.education.degree}</p>
                <p className="text-xs text-[#205c3b] font-semibold">{cvData.education.institution}</p>
                <p className="text-xs text-[#52796f]">{cvData.education.location}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#143d2b] border-b border-[#dbe5df] pb-1">
                Languages
              </h3>
              <p className="mt-2 text-sm text-[#2b332d]">
                {cvData.languages.join(' • ')}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="no-print bg-[#f7faf8] px-6 py-3.5 border-t border-[#dbe5df] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-[#52796f]">
            Verified CV Record • Standard Recruitment A4 Format
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#143d2b] hover:bg-[#1b4332] rounded transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Save as PDF / Print</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs sm:text-sm font-medium text-[#2b332d] hover:bg-[#ebf3ed] rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
