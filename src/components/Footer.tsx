import { useProfile } from '../hooks/usePortfolio';
import SocialLinks from './SocialLinks';
import { Mail, Copy, Check, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const colVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] as const },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

export default function Footer() {
  const profile = useProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavClick = (href: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      id="contact"
      className="section-anchor border-t border-dark-border py-16 px-6 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-accent-start/3 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid md:grid-cols-3 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Brand */}
          <motion.div variants={colVariants}>
            <motion.h3
              className="chrome-gradient-text text-2xl font-bold mb-2"
              whileHover={{ scale: 1.02 }}
            >
              {profile.shortName}
            </motion.h3>
            <p className="text-muted text-sm mb-1">{profile.specialization}</p>
            <p className="text-muted text-sm">{profile.location}</p>
          </motion.div>

          {/* Navigate */}
          <motion.div variants={colVariants}>
            <h4 className="text-white font-semibold mb-4 tracking-wider">NAVIGATE</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-muted hover:text-white transition-colors text-sm relative group inline-block"
                  >
                    {link.label}
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-[1px] bg-gradient-to-r from-accent-start to-accent-mid"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Reach Out */}
          <motion.div variants={colVariants}>
            <h4 className="text-white font-semibold mb-4 tracking-wider">REACH OUT</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-card border border-dark-border text-muted hover:text-white hover:border-white/20 transition-all text-sm relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {copied ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Check size={14} className="text-green-400" />
                    </motion.span>
                  ) : (
                    <Copy size={14} />
                  )}
                  <span>{copied ? 'Copied!' : profile.social.email}</span>
                  {copied && (
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-green-500/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.button>
              </div>
              {profile.social.phone && (
                <motion.div
                  className="flex items-center gap-2 text-muted text-sm"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail size={14} />
                  <a href={`tel:${profile.social.phone}`} className="hover:text-white transition-colors">
                    {profile.social.phone}
                  </a>
                </motion.div>
              )}
              <motion.div variants={colVariants}>
                <SocialLinks social={profile.social} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom strip */}
        <motion.div
          className="border-t border-dark-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {profile.shortName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* <p className="text-xs text-muted">
              Built with React, Tailwind CSS &amp; Framer Motion
            </p> */}
            <motion.button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-muted hover:text-white hover:border-accent-start/30 transition-all"
              whileHover={{ y: -3, boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)' }}
              whileTap={{ scale: 0.9 }}
              title="Back to top"
            >
              <ArrowUp size={14} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
