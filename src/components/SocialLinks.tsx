import { motion } from 'framer-motion';
import { GitBranch, UserCheck, Camera, Mail, Phone, Link2 } from 'lucide-react';
import type { SocialLinks as SocialLinksType } from '../types/portfolio';

interface Props {
  social: SocialLinksType;
}

const socialItems = [
  { key: 'github' as const, icon: GitBranch, label: 'GitHub' },
  { key: 'linkedin' as const, icon: UserCheck, label: 'LinkedIn' },
  { key: 'instagram' as const, icon: Camera, label: 'Instagram' },
  { key: 'email' as const, icon: Mail, label: 'Email' },
  { key: 'phone' as const, icon: Phone, label: 'Phone' },
  { key: 'website' as const, icon: Link2, label: 'Website' },
];

const linkVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] as const },
  }),
};

export default function SocialLinks({ social }: Props) {
  const getHref = (key: string, value: string): string => {
    switch (key) {
      case 'email': return `mailto:${value}`;
      case 'phone': return `tel:${value}`;
      default: return value;
    }
  };

  const visibleItems = socialItems.filter(({ key }) => social[key]);

  return (
    <motion.div
      className="flex flex-wrap items-center gap-3"
      initial="hidden"
      animate="visible"
    >
      {visibleItems.map(({ key, icon: Icon, label }, i) => {
        const value = social[key];
        return (
          <motion.a
            key={key}
            href={getHref(key, value!)}
            target={key === 'email' || key === 'phone' ? undefined : '_blank'}
            rel={key === 'email' || key === 'phone' ? undefined : 'noopener noreferrer'}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-dark-border bg-dark-card/50 text-muted hover:text-white transition-all duration-200 text-sm relative overflow-hidden group"
            variants={linkVariants}
            custom={i}
            whileHover={{
              scale: 1.05,
              borderColor: 'rgba(168, 85, 247, 0.3)',
              boxShadow: '0 0 25px rgba(168, 85, 247, 0.12)',
              backgroundColor: 'rgba(168, 85, 247, 0.05)',
            }}
            whileTap={{ scale: 0.95 }}
            title={label}
          >
            {/* Shine effect on hover */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.6 }}
            />
            <Icon size={16} className="relative z-10" />
            <span className="hidden sm:inline relative z-10">{label}</span>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
