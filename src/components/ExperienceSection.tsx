import { motion } from 'framer-motion';
import { useExperience } from '../hooks/usePortfolio';
import { MapPin } from 'lucide-react';
import ScrollFloat from './ScrollFloat';
import SectionMotion from './SectionMotion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] as const },
  },
};

const expItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] as const },
  },
};

const highlightVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' as const },
  }),
};

export default function ExperienceSection() {
  const experience = useExperience();

  return (
    <SectionMotion id="experience" className="section-anchor py-24 px-6 relative overflow-hidden">

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={headerVariants}>
            <ScrollFloat
              variant="fade"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              containerClassName="text-sm tracking-[0.2em] mb-2"
              textClassName="text-slate-300"
            >
              EXPERIENCE
            </ScrollFloat>
            <ScrollFloat
              variant="float"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              containerClassName="text-4xl md:text-5xl font-bold"
              textClassName="text-white"
            >
              Work Experience
            </ScrollFloat>
            <motion.span
              className="block h-[3px] bg-gradient-to-r from-accent-start via-accent-mid to-accent-end rounded-full mt-2 mb-16"
              initial={{ width: 0 }}
              whileInView={{ width: '60px' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            />
          </motion.div>

          <div className="space-y-0 relative">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                variants={expItemVariants}
                className="relative border-t border-dark-border py-10 first:border-t-0 group"
              >
                <div className="grid md:grid-cols-12 gap-6">
                  {/* Content */}
                  <div className="md:col-span-9">
                    <motion.h4
                      className="text-xl md:text-2xl font-semibold text-white mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <span className="group-hover:text-accent-start transition-colors duration-300">{exp.company}</span>
                      <span className="text-muted"> — </span>
                      <span>{exp.role}</span>
                    </motion.h4>
                    <motion.p
                      className="text-muted mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {exp.summary}
                    </motion.p>
                    <motion.ul className="space-y-2">
                      {exp.highlights.slice(0, 3).map((highlight, i) => (
                        <motion.li
                          key={i}
                          custom={i}
                          variants={highlightVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="flex items-start gap-2 text-sm text-muted"
                        >
                          <motion.span
                            className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-start flex-shrink-0"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                          />
                          {highlight}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  {/* Period + Location */}
                  <motion.div
                    className="md:col-span-3 md:text-right"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <motion.span
                      className="inline-block px-3 py-1 rounded-md bg-dark-card border border-dark-border text-xs font-mono text-accent-start tracking-wider"
                      whileHover={{
                        borderColor: '#A855F7',
                        boxShadow: '0 0 15px rgba(168, 85, 247, 0.1)',
                      }}
                    >
                      {exp.period}
                    </motion.span>
                    <p className="text-xs text-muted mt-2 flex md:justify-end items-center gap-1">
                      <MapPin size={10} />
                      {exp.location}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionMotion>
  );
}
