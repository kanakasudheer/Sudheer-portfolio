import { motion } from 'framer-motion';
import type { Variants, HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
    },
  },
};

interface SectionMotionProps extends HTMLMotionProps<'section'> {
  children: ReactNode;
}

export default function SectionMotion({
  children,
  className,
  ...rest
}: SectionMotionProps) {
  return (
    <motion.section
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
