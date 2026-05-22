import { motion } from 'framer-motion';
import { useSkills } from '../hooks/usePortfolio';
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

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] as const },
  },
};

const skillItemVariants = {
  hidden: { opacity: 0, scale: 0.8, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.3, ease: 'easeOut' as const },
  }),
};

const categoryIcons = ['⚡', '🤖', '🛠️'];

export default function SkillsSection() {
  const skills = useSkills();

  return (
    <SectionMotion id="skills" className="section-anchor py-24 px-6 relative overflow-hidden">

      {/* Background decorations */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 rounded-full bg-accent-end/3 blur-3xl pointer-events-none"
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-40 right-10 w-60 h-60 rounded-full bg-accent-start/3 blur-3xl pointer-events-none"
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

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
              SKILLS
            </ScrollFloat>
            <ScrollFloat
              variant="float"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              containerClassName="text-4xl md:text-5xl font-bold"
              textClassName="text-white"
            >
              Tech Stack
            </ScrollFloat>
            <motion.span
              className="block h-[3px] bg-gradient-to-r from-accent-start via-accent-mid to-accent-end rounded-full mt-2 mb-16"
              initial={{ width: 0 }}
              whileInView={{ width: '60px' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {skills.categories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={cardVariants}
                custom={index}
                className="bg-dark-card border border-dark-border rounded-2xl p-8 group"
                whileHover={{
                  y: -8,
                  borderColor: 'rgba(168, 85, 247, 0.2)',
                  boxShadow: '0 20px 60px rgba(168, 85, 247, 0.08)',
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
              >
                <motion.div
                  className="text-3xl mb-4 inline-block"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
                >
                  {categoryIcons[index] || '📦'}
                </motion.div>
                <h4 className="text-lg font-semibold text-white mb-4 group-hover:text-accent-start transition-colors duration-300">
                  {category.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, i) => (
                    <motion.span
                      key={item}
                      custom={i}
                      variants={skillItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="px-3 py-1.5 rounded-lg bg-dark border border-dark-border text-sm text-muted cursor-default"
                      whileHover={{
                        scale: 1.1,
                        color: '#ffffff',
                        borderColor: '#A855F7',
                        backgroundColor: 'rgba(168, 85, 247, 0.08)',
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionMotion>
  );
}
