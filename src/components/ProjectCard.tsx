import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import type { Project } from '../types/portfolio';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Props {
  project: Project;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] as const },
  },
};

const contentStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const contentItem = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export default function ProjectCard({ project, index }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xVal);
    y.set(yVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="sticky top-24"
      style={{ zIndex: 10 - index, perspective: 1000 }}
    >
      <motion.div
        className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden group"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ borderColor: 'rgba(168, 85, 247, 0.2)' }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="grid md:grid-cols-2 min-h-[400px]">
          {/* Image / Placeholder */}
          <div className="relative overflow-hidden">
            {project.image ? (
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setIsImageOpen(true)}
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.6 }}
              />
            ) : (
              <div className="w-full h-full min-h-[300px] md:min-h-full bg-gradient-to-br from-dark-card via-dark to-dark-card flex items-center justify-center relative overflow-hidden">
                {/* Animated grid pattern */}
                <motion.div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                  animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />

                <motion.div
                  className="text-center p-8 relative z-10"
                  animate={{ y: isHovered ? -5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent-start/10 flex items-center justify-center border border-accent-start/20"
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="text-3xl font-bold text-accent-start">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                  <h4 className="text-xl font-semibold text-white">{project.title}</h4>
                  <p className="text-sm text-muted mt-2">{project.subtitle}</p>
                </motion.div>

                {/* Shine overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                  initial={{ x: '-100%' }}
                  animate={{ x: isHovered ? '200%' : '-100%' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
              </div>
            )}

            {/* Gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content */}
          <motion.div
            className="p-8 md:p-10 flex flex-col justify-between"
            variants={contentStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <motion.div variants={contentItem} className="flex items-center gap-3 mb-4">
                <span className="text-sm text-accent-start font-mono">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {project.highlight && (
                  <motion.span
                    className="text-xs accent-gradient text-white rounded px-2 py-0.5"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Featured
                  </motion.span>
                )}
              </motion.div>

              <motion.h3
                variants={contentItem}
                className="text-2xl font-bold text-white mb-1 group-hover:text-accent-start transition-colors duration-300"
              >
                {project.title}
              </motion.h3>
              <motion.p variants={contentItem} className="text-muted text-sm mb-4">
                {project.subtitle}
              </motion.p>
              <motion.p variants={contentItem} className="text-muted text-sm leading-relaxed mb-6">
                {project.description}
              </motion.p>

              {/* Tech Stack */}
              <motion.div variants={contentItem} className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-dark border border-dark-border text-xs text-muted"
                    whileHover={{
                      scale: 1.1,
                      color: '#ffffff',
                      borderColor: '#A855F7',
                      backgroundColor: 'rgba(168, 85, 247, 0.08)',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

            </div>

            {/* Link */}
            {project.link && (
              <motion.div variants={contentItem} className="mt-6">
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full accent-gradient text-white text-sm font-medium relative overflow-hidden group/btn"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shimmer effect on button */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <ExternalLink size={16} className="relative z-10" />
                  <span className="relative z-10">LIVE PROJECT</span>
                </motion.a>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Glow border effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.08), inset 0 0 40px rgba(168, 85, 247, 0.02)',
          }}
        />

        <AnimatePresence>
          {isImageOpen && project.image && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImageOpen(false)}
            >
              <motion.div
                className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-slate-950/95"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setIsImageOpen(false)}
                  className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-white/10"
                >
                  ×
                </button>

                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="h-[80vh] w-full object-contain bg-slate-950"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
