import { motion } from 'framer-motion';
import { useEducation } from '../hooks/usePortfolio';
import { Calendar, Trophy } from 'lucide-react';
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

const eduItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] as const },
  },
};

export default function EducationSection() {
  const education = useEducation();

  return (
    <SectionMotion id="education" className="section-anchor py-24 px-6 relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-cyan-500/3 blur-3xl pointer-events-none"
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-40 right-10 w-40 h-40 rounded-full bg-purple-500/3 blur-3xl pointer-events-none"
        animate={{ y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={headerVariants}>
            <h2 className="text-sm tracking-[0.2em] text-muted mb-2">EDUCATION</h2>
            <h3 className="chrome-gradient-text text-4xl md:text-5xl font-bold mb-16 inline-block">
              Academic Background
              <motion.span
                className="block h-[3px] bg-gradient-to-r from-accent-start via-accent-mid to-accent-end rounded-full mt-2"
                initial={{ width: 0 }}
                whileInView={{ width: '60px' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              />
            </h3>
          </motion.div>

          <div className="space-y-0 relative">
            {/* Connecting timeline line */}
            <motion.div
              className="absolute left-[5px] md:left-[7px] top-0 w-px bg-gradient-to-b from-cyan-400/50 via-purple-500/50 to-accent-end/50 pointer-events-none"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />

            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={eduItemVariants}
                className="relative border-t border-dark-border py-10 first:border-t-0 group pl-8 md:pl-12"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-[2px] md:left-[4px] top-12 w-3 h-3 rounded-full bg-blue-500 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4, type: 'spring', stiffness: 200 }}
                />

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
                      <span className="group-hover:text-cyan-400 transition-colors duration-300">
                        {edu.institution}
                      </span>
                    </motion.h4>

                    {/* Degree (if available) */}
                    {edu.degree && (
                      <motion.p
                        className="text-muted text-sm mb-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                      >
                        {edu.degree}
                      </motion.p>
                    )}

                    {/* Achievements/CGPA/Marks */}
                    {(edu.CGPA || edu.Marks) && (
                      <motion.div
                        className="flex items-center gap-2 mt-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <Trophy size={14} className="text-amber-400/70" />
                        <span className="text-sm text-amber-400/80 font-medium">
                          {edu.CGPA ? `CGPA: ${edu.CGPA}` : `Marks: ${edu.Marks}`}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Period */}
                  <motion.div
                    className="md:col-span-3 md:text-right"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <motion.span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-dark-card border border-dark-border text-xs font-mono text-cyan-400 tracking-wider"
                      whileHover={{
                        borderColor: '#06B6D4',
                        boxShadow: '0 0 15px rgba(6, 182, 212, 0.1)',
                      }}
                    >
                      <Calendar size={10} />
                      {edu.period}
                    </motion.span>
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
