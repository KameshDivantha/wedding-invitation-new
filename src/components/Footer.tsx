import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const HEARTS = [
  { x: '10%', y: '20%', size: 14, delay: 0,   duration: 6  },
  { x: '80%', y: '15%', size: 10, delay: 1,   duration: 7  },
  { x: '50%', y: '60%', size: 18, delay: 2.5, duration: 5  },
  { x: '25%', y: '75%', size: 11, delay: 0.8, duration: 8  },
  { x: '70%', y: '55%', size: 13, delay: 3,   duration: 6  },
];

export function Footer() {
  return (
    <footer className="bg-wedding-bg py-16 text-center border-t border-gold-200 relative overflow-hidden">

      {/* Gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-gold-100/40 to-transparent pointer-events-none" />

      {/* Floating animated hearts */}
      {HEARTS.map((h, i) => (
        <motion.div
          key={i}
          className="absolute text-gold-400 pointer-events-none"
          style={{ left: h.x, top: h.y }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ repeat: Infinity, duration: h.duration, delay: h.delay, ease: 'easeInOut' }}>
          <Heart size={h.size} fill="currentColor" />
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Monogram */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-script text-6xl text-gold-500 mb-3 animate-glow-pulse">
          K &amp; S
        </motion.h2>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300" />
          <Heart size={10} className="text-gold-400 opacity-50" fill="currentColor" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300" />
        </div>

        <p className="font-sans text-xs tracking-[0.25em] text-wedding-text-muted uppercase mb-6">
          June 4, 2026 • Matara
        </p>

        {/* Romantic quote */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif italic text-base text-wedding-text-light max-w-sm mx-auto mb-4 leading-relaxed opacity-80">
          "To love and to be loved is to feel the sun from both sides."
        </motion.p>

        <p className="font-serif italic text-sm text-wedding-text-light opacity-50">
          Made with love ♡
        </p>
      </div>
    </footer>
  );
}