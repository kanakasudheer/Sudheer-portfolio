import { motion } from 'framer-motion';
import { useProfile } from '../hooks/usePortfolio';
import { MapPin, Briefcase } from 'lucide-react';
import ScrollFloat from './ScrollFloat';
import SectionMotion from './SectionMotion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] as const },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, x: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] as const },
  }),
};

export default function AboutSection() {
  const profile = useProfile();

  const infoCards = [
    { label: 'ROLE', value: profile.role, icon: Briefcase },
    { label: 'LOCATION', value: profile.location, icon: MapPin, iconColor: 'text-accent-start' },
    // { label: 'EXPERIENCE', value: `${profile.yearsOfExperience} years`, icon: Sparkles },
    // { label: 'SPECIALIZATION', value: profile.specialization, icon: Code2 },
  ];

  return (
    <SectionMotion id="about" className="section-anchor py-24 px-6 relative overflow-hidden">

      {/* Background decoration */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-accent-start/3 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={itemVariants}>
            <ScrollFloat
              variant="fade"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              containerClassName="text-sm tracking-[0.2em] mb-2"
              textClassName="text-slate-300"
            >
              ABOUT
            </ScrollFloat>
            <ScrollFloat
              variant="float"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              containerClassName="text-4xl md:text-5xl font-bold"
              textClassName="text-white"
            >
              About Me
            </ScrollFloat>
            <motion.span
              className="block h-[3px] bg-gradient-to-r from-accent-start via-accent-mid to-accent-end rounded-full mt-2 mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: '60px' }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            />
          </motion.div>

          <div className="grid md:grid-cols-5 gap-10">
            <motion.div className="md:col-span-3" variants={itemVariants}>
              <motion.p
                className="text-base md:text-lg text-muted leading-relaxed"
                style={{ overflowWrap: 'normal', wordBreak: 'normal' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {profile.bio}
              </motion.p>
            </motion.div>

            <motion.div className="md:col-span-2" variants={itemVariants}>
              <motion.div
                className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4"
                whileHover={{
                  borderColor: 'rgba(168, 85, 247, 0.2)',
                  boxShadow: '0 0 30px rgba(168, 85, 247, 0.05)',
                }}
                transition={{ duration: 0.3 }}
              >
                {infoCards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.label}
                      custom={i}
                      variants={cardItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          className="w-8 h-8 rounded-lg bg-dark border border-dark-border flex items-center justify-center flex-shrink-0 mt-0.5"
                          whileHover={{ scale: 1.1, borderColor: '#A855F7' }}
                        >
                          <Icon size={14} className={card.iconColor || 'text-accent-start'} />
                        </motion.div>
                        <div>
                          <span className="text-xs tracking-widest text-muted">{card.label}</span>
                          <p className="text-white font-medium text-sm">{card.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionMotion>
  );
}
