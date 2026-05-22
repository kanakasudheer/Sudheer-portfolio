import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../hooks/usePortfolio';
import SocialLinks from './SocialLinks';
import TextType from './TextType';
import ScrollFloat from './ScrollFloat';
import SectionMotion from './SectionMotion';

export default function HeroSection() {

  const profile = useProfile();
  const [imgError, setImgError] = useState(false);



  return (
    <SectionMotion
      id="hero"
      className="section-anchor relative min-h-screen flex items-center px-6 overflow-hidden bg-dark"
    >

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* LEFT COLUMN — Name, tagline, role, socials */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="text-white">I'M </span>
              <TextType
                text={[profile.shortName]}
                typingSpeed={80}
                initialDelay={500}
                pauseDuration={5000}
                deletingSpeed={40}
                loop={false}
                showCursor={true}
                cursorCharacter="|"
                cursorBlinkDuration={0.5}
                contentClassName="animated-gradient-text"
                cursorClassName="text-cyan-400 font-light"
              />
            </motion.h1>

            <motion.div
              className="text-lg md:text-xl text-muted max-w-xl mt-4 mb-6 flex items-center flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <ScrollFloat
                variant="reveal"
                scrollStart="top bottom"
                scrollEnd="top top+=20%"
              >
                {profile.tagline}
              </ScrollFloat>
              <span className="inline-block w-[3px] h-[1em] bg-gradient-to-b from-[#F59E0B] to-[#EAB308] ml-1 animate-pulse flex-shrink-0" />
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="px-4 py-1.5 rounded-full bg-dark-card border border-dark-border text-sm text-white">
                {profile.role}
              </span>
              <span className="text-muted text-sm">
                {profile.specialization}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <SocialLinks social={profile.social} />
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Avatar with orbit rings */}
          <div className="flex items-center justify-center md:justify-end">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Outer orbit ring */}
              <motion.div
                className="absolute -inset-8 rounded-full border border-[#F59E0B]/15"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <motion.div
                  className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/40 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>

              {/* Second outer orbit ring */}
              <motion.div
                className="absolute -inset-14 rounded-full border border-[#EAB308]/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#EAB308]/30 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
                  animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.7, 1.3, 0.7] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />
              </motion.div>

              {/* Avatar */}
              <motion.div
                className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-[#F59E0B] via-[#EAB308] to-[#F97316] p-[3px]"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-full h-full rounded-full bg-dark overflow-hidden relative group">
                  {imgError ? (
                    <div className="w-full h-full flex items-center justify-center text-5xl md:text-6xl font-bold text-white">
                      {profile.shortName.charAt(0)}
                    </div>
                  ) : (
                    <img
                      src={profile.avatarSvg}
                      alt={profile.name}
                      className="w-full h-full object-cover rounded-full"
                      onError={() => setImgError(true)}
                    />
                  )}
                  {/* Hover glow overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 bg-gradient-to-tl from-[#F59E0B]/40 to-transparent transition-opacity duration-300"
                    initial={false}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted tracking-widest">SCROLL</span>
          <div className="w-6 h-10 rounded-full border-2 border-dark-border flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-gradient-to-b from-[#F59E0B] to-[#EAB308]" />
          </div>
        </div>
      </div>
    </SectionMotion>
  );
}
