import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark font-kanit flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <motion.h1
          className="hero-heading text-8xl md:text-9xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-xl text-muted mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          This page seems to have wandered off...
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-start via-accent-mid to-accent-end text-white font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={18} />
            Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
