import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { submitRSVP } from '../lib/firebase';
import { Heart } from 'lucide-react';

export function RSVPSection() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<
    'attending' | 'declining' | null>(
    null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'>(
    'idle');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attendance) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    const result = await submitRSVP(name, attendance);
    setIsSubmitting(false);
    if (result.success) {
      setSubmitStatus('success');
    } else {
      setSubmitStatus('error');
    }
  };
  return (
    <AnimatedSection id="rsvp" className="py-24 px-4 bg-white relative">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-25 animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(200,162,200,0.5) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(212,132,154,0.4) 0%, transparent 70%)', animationDelay: '3s' }} />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="glass-card p-8 md:p-16 shadow-xl border-lavender-200 rounded-2xl text-center relative overflow-hidden">
          {/* Glowing corner decorations */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-lavender-300 rounded-tl-lg opacity-50" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-lavender-300 rounded-tr-lg opacity-50" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-lavender-300 rounded-bl-lg opacity-50" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-lavender-300 rounded-br-lg opacity-50" />

          {/* Animated heart */}
          <div className="flex justify-center mb-5">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
              <Heart className="w-9 h-9 text-rose" fill="currentColor" strokeWidth={0} />
            </motion.div>
          </div>

          <h2 className="font-script text-5xl md:text-6xl text-lavender-500 mb-2">
            Kindly Respond
          </h2>
          <p className="font-sans text-xs tracking-[0.2em] text-wedding-text-muted uppercase mb-10">
            By the first of May 2026
          </p>

          {submitStatus === 'success' ?
          <div className="py-12 animate-fade-in">
              <h3 className="font-serif text-2xl text-wedding-text mb-4">
                Thank you, {name}!
              </h3>
              <p className="font-serif text-lg text-wedding-text-light">
                {attendance === 'attending' ?
              'We look forward to celebrating with you.' :
              'We will miss you, thank you for letting us know.'}
              </p>
            </div> :

          <form onSubmit={handleSubmit} className="space-y-8 text-left">
              <div>
                <label htmlFor="rsvp-name" className="sr-only">
                  Guest Name(s)
                </label>
                <input
                type="text"
                id="rsvp-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name(s)..."
                className="w-full bg-transparent border-b-2 border-lavender-200 py-3 px-2 font-serif text-xl text-wedding-text placeholder:text-wedding-text-muted/60 focus:outline-none focus:border-lavender-400 transition-colors" />
              
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <button
                type="button"
                onClick={() => setAttendance('attending')}
                className={`py-4 px-6 font-serif text-lg transition-all duration-300 border-2 rounded-xl ${attendance === 'attending' ? 'bg-lavender-500 border-lavender-500 text-white shadow-md' : 'bg-transparent border-lavender-200 text-wedding-text hover:border-lavender-400'}`}>
                
                  Joyfully Accepts
                </button>
                <button
                type="button"
                onClick={() => setAttendance('declining')}
                className={`py-4 px-6 font-serif text-lg transition-all duration-300 border-2 rounded-xl ${attendance === 'declining' ? 'bg-rose border-rose text-white shadow-md' : 'bg-transparent border-lavender-200 text-wedding-text hover:border-rose-light'}`}>
                
                  Respectfully Declines
                </button>
              </div>

              {submitStatus === 'error' &&
            <p className="text-red-500 font-sans text-sm text-center">
                  Something went wrong. Please try again.
                </p>
            }

              <div className="pt-8 text-center">
                <button
                type="submit"
                disabled={!name.trim() || !attendance || isSubmitting}
                className="inline-block px-12 py-4 bg-gradient-to-r from-rose to-rose-dark text-white font-sans text-sm tracking-[0.15em] uppercase rounded-full hover:shadow-lg hover:shadow-rose/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none">
                
                  {isSubmitting ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </form>
          }
        </div>
      </div>
    </AnimatedSection>);

}