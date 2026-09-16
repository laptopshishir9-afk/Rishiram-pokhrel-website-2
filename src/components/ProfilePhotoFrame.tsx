import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, ShieldCheck } from 'lucide-react';

interface ProfilePhotoFrameProps {
  photoUrl?: string | null;
  onPhotoChange?: (newPhoto: string) => void;
  onResetPhoto?: () => void;
  isCustomPhoto?: boolean;
  className?: string;
}

export const ProfilePhotoFrame: React.FC<ProfilePhotoFrameProps> = ({
  photoUrl,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Outer motion wrapper giving gentle light movement */}
      <motion.div
        className="relative group"
        animate={{
          y: [0, -7, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Subtle decorative concentric accent ring with gentle breathing movement */}
        <motion.div
          className="absolute -inset-3 rounded-[50%] border border-[#c6decb] bg-gradient-to-b from-[#ebf3ed] to-[#f7faf8] pointer-events-none"
          animate={{
            scale: [1, 1.025, 1],
            opacity: [0.75, 1, 0.75],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Secondary fine decorative ambient border ring */}
        <div className="absolute -inset-1.5 rounded-[50%] border border-[#84b99d]/40 pointer-events-none" />

        {/* Unique Architectural Oval Frame */}
        <div
          id="unique-oval-photo-frame"
          className="relative w-56 sm:w-64 h-72 sm:h-80 rounded-[50%] p-2 bg-white shadow-lg border-4 border-[#143d2b] transition-shadow duration-300"
        >
          {/* Inner fine border ring and photo container */}
          <div className="w-full h-full rounded-[50%] border-2 border-[#84b99d]/60 overflow-hidden relative bg-[#f2f7f4] flex flex-col items-center justify-center">
            {photoUrl && !imgError ? (
              /* Displayed photograph */
              <motion.img
                key={photoUrl}
                src={photoUrl}
                alt="Rishiram Pokhrel"
                className="w-full h-full object-cover rounded-[50%]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallbackTried) {
                    target.dataset.fallbackTried = 'true';
                    target.src = './profile.jpg';
                  } else {
                    setImgError(true);
                  }
                }}
                animate={{
                  scale: [1, 1.015, 1],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ) : (
              /* Professional Logistics Silhouette Fallback */
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#3f4e44] bg-gradient-to-b from-[#f5faf6] to-[#e7f1ea]">
                <div className="w-20 h-20 rounded-full bg-white border-2 border-[#143d2b] flex items-center justify-center mb-3 shadow-xs">
                  <User className="w-10 h-10 text-[#143d2b]" />
                </div>
                <h4 className="text-xs font-bold text-[#143d2b] uppercase tracking-wider">
                  Warehouse Operations
                </h4>
                <p className="text-[11px] font-medium text-[#52796f] mt-1 max-w-[130px] leading-tight">
                  15+ Years Industry Experience
                </p>
              </div>
            )}
          </div>

          {/* Elegant name badge anchored at the bottom center of the oval */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#143d2b] text-white text-[11px] font-bold px-3.5 py-1 rounded-full border-2 border-white shadow-md flex items-center gap-1.5 whitespace-nowrap z-10">
            <ShieldCheck className="w-3 h-3 text-[#52b788]" />
            <span>Rishiram Pokhrel</span>
          </div>
        </div>
      </motion.div>

      {/* Professional status badge under photo without any change controls */}
      <div className="mt-5 flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-[#52796f]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#205c3b]"></span>
        <span>Verified Professional Profile • Doha, Qatar</span>
      </div>
    </div>
  );
};


