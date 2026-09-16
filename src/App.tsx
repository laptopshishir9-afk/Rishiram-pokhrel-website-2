import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProfileSection } from './components/ProfileSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationLanguagesSection } from './components/EducationLanguagesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';
import { cvData } from './data/cvData';
import { Phone, Mail, MapPin } from 'lucide-react';
import defaultProfilePhoto from './assets/images/profile.jpg';

const PHOTO_VERSION = '1789569320';

export default function App() {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    try {
      const storedVersion = localStorage.getItem('rishiram_photo_version');
      if (storedVersion === PHOTO_VERSION) {
        const stored = localStorage.getItem('rishiram_custom_uploaded_photo');
        if (stored) return stored;
      } else {
        // Clear older version from previous turns
        localStorage.removeItem('rishiram_custom_uploaded_photo');
        localStorage.setItem('rishiram_photo_version', PHOTO_VERSION);
      }
    } catch {
      // ignore
    }
    return defaultProfilePhoto;
  });

  // Sync photo with server across all devices on mount
  useEffect(() => {
    const syncPhotoWithServer = async () => {
      try {
        const res = await fetch(`./photo-meta.json?t=${Date.now()}`);
        if (res.ok) {
          const meta = await res.json();
          if (meta?.hasCustomPhoto && meta?.timestamp) {
            const serverPhotoUrl = `./profile.jpg?v=${meta.timestamp}`;
            setPhotoUrl(serverPhotoUrl);
            try {
              localStorage.setItem('rishiram_photo_version', String(meta.timestamp));
              localStorage.setItem('rishiram_custom_uploaded_photo', serverPhotoUrl);
            } catch {
              // ignore
            }
          }
        }
      } catch {
        // network or static fallback
      }
    };

    syncPhotoWithServer();
  }, []);

  const handlePhotoChange = (newPhoto: string) => {
    setPhotoUrl(newPhoto);
    try {
      localStorage.setItem('rishiram_custom_uploaded_photo', newPhoto);
    } catch {
      // storage unavailable
    }
  };

  const handleResetPhoto = () => {
    setPhotoUrl(defaultProfilePhoto);
    try {
      localStorage.removeItem('rishiram_custom_uploaded_photo');
    } catch {
      // ignore
    }
  };

  const isCustomPhoto = photoUrl !== defaultProfilePhoto;

  return (
    <div className="min-h-screen bg-[#f7faf8] text-[#1e2420] flex flex-col font-sans selection:bg-[#143d2b] selection:text-white">
      {/* Interactive Website View */}
      <div className="flex-1 flex flex-col no-print">
        <Navbar onOpenCvModal={() => setIsCvModalOpen(true)} />

        <main className="flex-1">
          <HeroSection
            onOpenCvModal={() => setIsCvModalOpen(true)}
            photoUrl={photoUrl}
            onPhotoChange={handlePhotoChange}
            onResetPhoto={handleResetPhoto}
            isCustomPhoto={isCustomPhoto}
          />
          <ProfileSection />
          <SkillsSection />
          <ExperienceSection />
          <EducationLanguagesSection />
          <ContactSection />
        </main>

        <Footer />
      </div>

      {/* CV Modal for interactive review and print/save */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        photoUrl={photoUrl}
      />

      {/* Print-Only Pure CV Document for Native Browser Print (Ctrl+P or Print Button) */}
      <div className="print-only hidden p-8 bg-white text-black max-w-4xl mx-auto">
        <div className="border-b-2 border-black pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-tight">{cvData.name}</h1>
            <h2 className="text-xl font-bold text-gray-800 mt-0.5">{cvData.title}</h2>
            <div className="mt-2 text-xs text-gray-700 flex flex-wrap gap-x-4">
              <span>Phone: {cvData.phone}</span>
              <span>Email: {cvData.email}</span>
              <span>Location: {cvData.location}</span>
              <span>License: {cvData.license}</span>
            </div>
          </div>

          {photoUrl && (
            <div className="shrink-0 ml-4">
              <div className="w-18 h-24 rounded-[50%] p-0.5 border-2 border-black">
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
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
            Professional Summary
          </h3>
          <p className="mt-1.5 text-xs text-gray-800 leading-relaxed">{cvData.heroIntro}</p>
          <p className="mt-1 text-xs text-gray-800 leading-relaxed">{cvData.heroSupporting}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
            Core Skills
          </h3>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-800">
            {cvData.skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span>•</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
            Work Experience
          </h3>
          <div className="mt-2 space-y-4">
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="page-break-inside-avoid">
                <div className="flex justify-between text-xs font-bold text-black">
                  <span>{exp.role}</span>
                  <span>{exp.period}</span>
                </div>
                <div className="text-xs font-semibold text-gray-700">
                  {exp.company}, {exp.location}
                </div>
                <ul className="mt-1 text-xs text-gray-800 space-y-0.5">
                  {exp.responsibilities.map((r, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-1.5">
                      <span className="mt-0.5">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-400 pt-2 page-break-inside-avoid">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
              Education
            </h3>
            <div className="mt-1 text-xs text-gray-800">
              <p className="font-bold">{cvData.education.degree}</p>
              <p>{cvData.education.institution}</p>
              <p className="text-gray-600">{cvData.education.location}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1">
              Languages
            </h3>
            <p className="mt-1 text-xs text-gray-800">
              {cvData.languages.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
