import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const images = [
  {
    src: '/Image_(5).jpg',
    alt: 'Kamesh and Shashini walking together in a garden'
  },
  {
    src: '/Image_(6).jpg',
    alt: 'Kamesh and Shashini under a beautiful white arch'
  },
  {
    src: '/Image_(7).jpg',
    alt: 'Kamesh and Shashini in an intimate close-up moment'
  },
  {
    src: '/Image_(1).jpeg',
    alt: 'Kamesh and Shashini first steps'
  },
  {
    src: '/Image_(2).jpeg',
    alt: 'Kamesh and Shashini on garden steps'
  },
  {
    src: '/Image_(3).jpeg',
    alt: 'Kamesh and Shashini under the arch'
  },
  {
    src: '/Image_(12).jpeg',
    alt: 'Kamesh and Shashini hearts as one'
  },
  {
    src: '/Image_(13).jpeg',
    alt: 'Kamesh and Shashini forever'
  }
];

const PETALS = [
  { left: '5%',  size: 10, delay: 0,    duration: 12 },
  { left: '15%', size: 8,  delay: 2.5,  duration: 14 },
  { left: '28%', size: 12, delay: 5,    duration: 11 },
  { left: '42%', size: 7,  delay: 1,    duration: 15 },
  { left: '58%', size: 11, delay: 3.5,  duration: 13 },
  { left: '70%', size: 9,  delay: 7,    duration: 10 },
  { left: '82%', size: 13, delay: 4,    duration: 14 },
  { left: '92%', size: 8,  delay: 6,    duration: 12 },
];

const FloralDecoration = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.15" stroke="currentColor" strokeWidth="1" fill="none">
      <path d="M20 180 Q60 140 40 100 Q30 130 20 180Z" />
      <path d="M25 175 Q70 150 60 110 Q45 135 25 175Z" />
      <path d="M30 170 Q55 120 35 80 Q25 110 30 170Z" />
      <circle cx="45" cy="95" r="3" fill="currentColor" />
      <circle cx="55" cy="105" r="2.5" fill="currentColor" />
      <circle cx="38" cy="78" r="2" fill="currentColor" />
      <path d="M15 185 Q40 160 50 120" />
      <path d="M35 185 Q55 155 65 115" />
    </g>
  </svg>
);

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-wedding-bg pt-16">

      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(200,162,200,0.4) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(212,132,154,0.3) 0%, transparent 70%)', animationDelay: '3s' }}
        />
      </div>

      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,162,200,0.12)_0%,_transparent_70%)]" />

      {/* Floating petals */}
      {PETALS.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: p.left,
            bottom: '-20px',
            width: p.size,
            height: p.size,
            background: i % 2 === 0 ? 'rgba(200,162,200,0.6)' : 'rgba(212,132,154,0.5)',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Floral decorations */}
      <FloralDecoration className="absolute top-20 left-0 w-48 h-48 text-lavender-300 opacity-50" />
      <FloralDecoration className="absolute top-20 right-0 w-48 h-48 text-lavender-300 opacity-50 -scale-x-100" />
      <FloralDecoration className="absolute bottom-10 left-10 w-36 h-36 text-rose opacity-30 rotate-45" />
      <FloralDecoration className="absolute bottom-10 right-10 w-36 h-36 text-rose opacity-30 -rotate-45 -scale-x-100" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto px-4 py-12 md:py-20">

        {/* Animated Photo Slider */}
        <div
          className="relative flex items-center justify-center w-full mb-8 overflow-hidden md:overflow-visible"
          style={{ minHeight: '420px' }}>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, x: -100, scale: 0.9, rotate: -2 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="relative z-20">

              {/* Polaroid frame */}
              <div className="bg-white p-2 md:p-3 shadow-[0_20px_60px_rgba(155,124,184,0.25)] rounded-sm group">
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className="w-64 h-80 md:w-80 md:h-[460px] object-cover rounded-sm" />

                {/* Shimmer overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-sm" />
                {/* Decorative inner border */}
                <div className="absolute inset-0 border border-lavender-100/40 m-3 pointer-events-none" />
              </div>

              {/* Floating heart decor */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-5 -right-5 text-rose opacity-40 pointer-events-none hidden md:block">
                <Heart size={28} fill="currentColor" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-5 text-lavender-300 opacity-30 pointer-events-none hidden md:block">
                <Heart size={22} fill="currentColor" />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Blurred ghost images for depth */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-15 blur-sm scale-90 hidden lg:flex">
            <img
              src={images[(currentIndex + 1) % images.length].src}
              alt=""
              className="w-64 h-80 object-cover rounded-sm rotate-6 translate-x-36" />
            <img
              src={images[(currentIndex + images.length - 1) % images.length].src}
              alt=""
              className="w-64 h-80 object-cover rounded-sm -rotate-6 -translate-x-36" />
          </div>
        </div>

        {/* Slide indicator dots */}
        <div className="flex gap-2 mb-10 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-500 rounded-full ${
                i === currentIndex
                  ? 'w-6 h-2 bg-lavender-400'
                  : 'w-2 h-2 bg-lavender-200 hover:bg-lavender-300'
              }`}
            />
          ))}
        </div>

        {/* Together Forever text — glow */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
          className="font-script text-5xl md:text-7xl lg:text-8xl text-lavender-500 mb-4 animate-glow-pulse text-center">
          Together Forever
        </motion.h2>

        {/* Decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex items-center gap-3 mb-5">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-lavender-300" />
          <Heart size={12} className="text-rose opacity-60" fill="currentColor" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-lavender-300" />
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: 'easeOut' }}
          className="text-center">
          <h1 className="font-sans text-sm md:text-base tracking-[0.4em] uppercase text-rose mb-3">
            Kamesh &amp; Shashini
          </h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="font-serif italic text-xl md:text-2xl text-rose font-medium mt-1">
            We invite you to celebrate our wedding
          </motion.p>
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-6 font-sans tracking-[0.25em] text-xs md:text-sm text-wedding-text-muted uppercase">
          June 4, 2026
          <span className="mx-3 text-lavender-300">•</span>
          Matara
        </motion.div>

        {/* Twin hearts */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [1, 1.15, 1] }}
          transition={{
            opacity: { duration: 0.8, delay: 1.5 },
            scale: { repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 1.5 }
          }}
          className="mt-10 text-rose drop-shadow-sm">
          <div className="relative w-14 h-9 flex items-center justify-center">
            <Heart
              size={28}
              fill="currentColor"
              className="absolute -translate-x-2 -translate-y-1 rotate-[-15deg] opacity-75"
            />
            <Heart
              size={32}
              fill="currentColor"
              className="absolute translate-x-2 translate-y-1 rotate-[15deg]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}