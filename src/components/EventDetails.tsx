import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, MapPinIcon, Heart } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

const CornerFlourish = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.35" stroke="currentColor" strokeWidth="1" fill="none">
      <path d="M2 2 Q20 2 30 12 Q40 22 38 40" />
      <path d="M2 8 Q16 8 24 16 Q32 24 30 38" />
      <path d="M8 2 Q22 4 28 14 Q34 24 32 36" />
      <circle cx="34" cy="8" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="8" cy="34" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="42" cy="18" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="18" cy="42" r="1.5" fill="currentColor" opacity="0.3" />
      <path d="M36 4 Q40 8 38 14" />
      <path d="M4 36 Q8 40 14 38" />
    </g>
  </svg>
);

const WEDDING_DATE = new Date('2026-06-04T09:00:00');

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = WEDDING_DATE.getTime() - Date.now();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    const id = setInterval(() => {
      const diff = WEDDING_DATE.getTime() - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const days    = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const units = [
    { label: 'Days',    value: days },
    { label: 'Hours',   value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.15 }}
      className="mb-14">

      {/* "Counting down to" label */}
      <p className="font-sans text-xs tracking-[0.3em] uppercase text-wedding-text-muted text-center mb-6">
        Counting down to forever
      </p>

      <div className="flex gap-3 md:gap-6 justify-center">
        {units.map(({ label, value }, i) => (
          <div key={label} className="flex flex-col items-center gap-2">
            {/* Bold highlighted tile */}
            <div className="relative group">
              {/* Glow ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-lavender-300 to-rose opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative rounded-2xl bg-gradient-to-br from-lavender-50 to-white border border-lavender-200 shadow-lg px-5 py-4 md:px-8 md:py-5 min-w-[72px] md:min-w-[96px] text-center">
                <motion.span
                  key={value}
                  initial={{ opacity: 0, y: -8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="block font-script text-4xl md:text-6xl text-lavender-600 leading-none tabular-nums">
                  {String(value).padStart(2, '0')}
                </motion.span>
              </div>
            </div>
            <p className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-wedding-text-muted">
              {label}
            </p>
            {/* Separator dot between tiles */}
            {i < units.length - 1 && (
              <span className="absolute hidden" />
            )}
          </div>
        ))}
      </div>

      {/* Pulse bar under countdown */}
      <div className="flex justify-center mt-6 gap-1">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-lavender-300"
            animate={{ height: [6, 18, 6] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.12, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function EventDetails() {
  return (
    <AnimatedSection id="details" className="py-24 px-4 bg-wedding-bg relative">
      {/* Background blobs */}
      <div
        className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl opacity-25 animate-blob"
        style={{ background: 'radial-gradient(circle, rgba(200,162,200,0.5) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-20 animate-blob"
        style={{ background: 'radial-gradient(circle, rgba(212,132,154,0.4) 0%, transparent 70%)', animationDelay: '3s' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-rose mb-3">
            Save the date
          </p>
          <h2 className="font-script text-5xl md:text-6xl text-lavender-500 mb-4">
            When &amp; Where
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-lavender-300" />
            <Heart size={12} className="text-rose opacity-60" fill="currentColor" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-lavender-300" />
          </div>
        </div>

        {/* Live countdown — prominent */}
        <CountdownTimer />

        {/* Single combined card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-lavender-200 shadow-xl group">

          {/* Card gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-lavender-50/90 via-white to-rose-light/20 pointer-events-none" />

          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: `radial-gradient(circle, #9B7CB8 1px, transparent 1px)`,
              backgroundSize: '18px 18px',
            }}
          />

          {/* Top gradient stripe */}
          <div className="w-full h-2 bg-gradient-to-r from-lavender-300 via-rose to-lavender-300" />

          {/* Corner flourishes */}
          <CornerFlourish className="absolute top-1 left-1 w-16 h-16 text-lavender-400" />
          <CornerFlourish className="absolute top-1 right-1 w-16 h-16 text-lavender-400 -scale-x-100" />
          <CornerFlourish className="absolute bottom-1 left-1 w-16 h-16 text-lavender-400 -scale-y-100" />
          <CornerFlourish className="absolute bottom-1 right-1 w-16 h-16 text-lavender-400 -scale-x-100 -scale-y-100" />

          {/* Three panels in a row */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-lavender-100">

            {/* When */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center text-center px-8 py-10 gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-lavender-100 to-lavender-50 flex items-center justify-center text-lavender-500 shadow-inner ring-2 ring-lavender-100 mb-1">
                <CalendarIcon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-wedding-text-muted tracking-wide uppercase text-sm">When</h3>
              <div className="h-px w-10 bg-lavender-200" />
              <p className="font-sans text-wedding-text-light text-sm tracking-wide">Thursday</p>
              <p className="font-serif italic text-4xl text-lavender-500 leading-tight font-medium">June 4</p>
              <p className="font-sans text-wedding-text text-sm font-semibold tracking-widest uppercase">2026</p>
            </motion.div>

            {/* Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col items-center text-center px-8 py-10 gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-light/40 to-rose-light/10 flex items-center justify-center text-rose shadow-inner ring-2 ring-rose-light/40 mb-1">
                <ClockIcon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-wedding-text-muted tracking-wide uppercase text-sm">Time</h3>
              <div className="h-px w-10 bg-rose-light" />
              <div className="flex flex-col items-center gap-1">
                <span className="font-serif italic text-2xl text-rose leading-tight font-medium">9:00 AM</span>
                <span className="font-sans text-xs tracking-[0.2em] text-wedding-text-muted uppercase">to</span>
                <span className="font-serif italic text-2xl text-rose leading-tight font-medium">4:00 PM</span>
              </div>
            </motion.div>

            {/* Where */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center text-center px-8 py-10 gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-lavender-100 to-lavender-50 flex items-center justify-center text-lavender-500 shadow-inner ring-2 ring-lavender-100 mb-1">
                <MapPinIcon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-wedding-text-muted tracking-wide uppercase text-sm">Where</h3>
              <div className="h-px w-10 bg-lavender-200" />
              <p className="font-serif italic text-2xl text-lavender-500 leading-tight font-medium">Red Diamond Ballroom</p>
              <p className="font-sans text-wedding-text text-sm font-medium tracking-wide">Matara Solis Hotel</p>
              <p className="font-sans text-wedding-text-muted text-xs tracking-widest uppercase">Matara</p>
              <a
                href="https://www.google.com/maps/search/Matara+Solis+Hotel"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 px-5 py-2 border border-lavender-300 text-lavender-500 font-sans text-xs tracking-[0.15em] uppercase rounded-full hover:bg-lavender-500 hover:text-white transition-all duration-300">
                <MapPinIcon className="w-3 h-3" strokeWidth={1.5} />
                View Map
              </a>
            </motion.div>
          </div>

          {/* Bottom gradient stripe */}
          <div className="w-full h-1 bg-gradient-to-r from-lavender-200 via-rose-light to-lavender-200" />
        </motion.div>
      </div>
    </AnimatedSection>
  );
}