import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { submitRSVP, auth, signInWithGoogle, onAuthStateChanged, User } from '../lib/firebase';
import { Heart, LogIn } from 'lucide-react';
import { RomanticModal } from './RomanticModal';

export function RSVPSection() {
  const [name, setName] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [attendance, setAttendance] = useState<'attending' | 'declining' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [modal, setModal] = useState({ 
    isOpen: false, 
    title: '', 
    message: '', 
    type: 'success' as 'success' | 'error' | 'loading' 
  });
  const [submittedData, setSubmittedData] = useState<{ name: string; attendance: string; email: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const savedRSVP = localStorage.getItem('wedding_rsvp_response');
    if (savedRSVP) {
      try {
        setSubmittedData(JSON.parse(savedRSVP));
        setSubmitStatus('success');
      } catch (e) {
        console.error('Error parsing saved RSVP', e);
      }
    }
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    const result = await signInWithGoogle();
    setIsLoggingIn(false);
    if (!result.success) {
      setModal({
        isOpen: true,
        title: 'Sign In Failed',
        message: 'We couldn\'t sign you in. Please try again.',
        type: 'error'
      });
    }
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userEmail = user?.email || '';
    console.log('RSVP Form submitted', { name, userEmail, attendance });
    if (!name.trim() || !userEmail || !attendance) {
      console.warn('Missing name, user email, or attendance');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setModal({
      isOpen: true,
      title: 'Sending Your Love...',
      message: 'Please wait a moment while we save your response.',
      type: 'loading'
    });

    try {
      console.log('Calling submitRSVP...');
      const userEmail = user?.email || '';
      const result = await submitRSVP(name, attendance, userEmail);
      console.log('submitRSVP result:', result);
      setIsSubmitting(false);
      
      if (result.success) {
        setSubmitStatus('success');
        const isAttending = attendance === 'attending';
        setModal({
          isOpen: true,
          title: isAttending ? 'Response Updated!' : 'Response Updated!',
          message: isAttending 
            ? `Thank you, ${name}! Your response has been saved/updated.` 
            : `Thank you for letting us know, ${name}. Your response has been saved/updated.`,
          type: 'success'
        });
        
        // Save to localStorage to prevent multiple submissions
        const dataToSave = { name, attendance, email: userEmail };
        localStorage.setItem('wedding_rsvp_response', JSON.stringify(dataToSave));
        setSubmittedData(dataToSave);
      } else {
        setSubmitStatus('error');
        setModal({
          isOpen: true,
          title: 'Almost There...',
          message: `Notice: ${result.error}. Please make sure you have enabled Firestore and set Rules to 'Test Mode' in the Firebase Console!`,
          type: 'error'
        });
      }
    } catch (err) {
      console.error('Fatal error in handleSubmit:', err);
      setIsSubmitting(false);
      setSubmitStatus('error');
      setModal({
        isOpen: true,
        title: 'Connection Issue',
        message: 'A fatal error occurred. Please check your internet connection.',
        type: 'error'
      });
    }
  };
  return (
    <AnimatedSection id="rsvp" className="py-24 px-4 bg-white relative">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-25 animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(231,209,161,0.4) 0%, transparent 70%)', animationDelay: '3s' }} />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="glass-card p-8 md:p-16 shadow-xl border-gold-200 rounded-2xl text-center relative overflow-hidden">
          {/* Glowing corner decorations */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold-300 rounded-tl-lg opacity-50" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold-300 rounded-tr-lg opacity-50" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold-300 rounded-bl-lg opacity-50" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold-300 rounded-br-lg opacity-50" />

          {/* Animated heart */}
          <div className="flex justify-center mb-5">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
              <Heart className="w-9 h-9 text-gold-500" fill="currentColor" strokeWidth={0} />
            </motion.div>
          </div>

          <h2 className="font-script text-5xl md:text-6xl text-gold-500 mb-2">
            Kindly Respond
          </h2>
          <p className="font-sans text-xs tracking-[0.2em] text-wedding-text-muted uppercase mb-10">
            By the first of May 2026
          </p>

          {submitStatus === 'success' ?
          <div className="py-12 animate-fade-in">
              <h3 className="font-serif text-2xl text-wedding-text mb-4">
                Thank you, {submittedData?.name || name}!
              </h3>
              <p className="font-serif text-lg text-wedding-text-light">
                {(submittedData?.attendance || attendance) === 'attending' ?
              'We look forward to celebrating with you.' :
              'We will miss you, thank you for letting us know.'}
              </p>
              <p className="mt-6 font-sans text-[10px] text-wedding-text-muted uppercase tracking-widest opacity-50">
                Your response has been saved
              </p>
              <button 
                onClick={() => {
                  setName(submittedData?.name || user?.displayName || '');
                  setSubmitStatus('idle');
                }}
                className="mt-8 text-gold-600 font-sans text-[10px] tracking-widest uppercase hover:text-gold-500 transition-colors border-b border-gold-200">
                Update My Response
              </button>
            </div> :
          !user ?
          <div className="py-12 space-y-6">
              <p className="font-serif text-lg text-wedding-text-light">
                Please sign in with Google to confirm your attendance.
              </p>
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoggingIn}
                className="inline-flex items-center gap-3 px-8 py-3 bg-white border-2 border-gold-200 text-gold-600 font-sans text-xs tracking-[0.15em] uppercase rounded-full hover:bg-gold-50 hover:border-gold-300 transition-all duration-300 shadow-sm">
                <LogIn size={16} />
                {isLoggingIn ? 'Signing In...' : 'Sign In with Google'}
              </button>
              <p className="text-[10px] text-wedding-text-muted/60 font-sans uppercase tracking-tighter max-w-xs mx-auto">
                We use your email as a secure key to let you update your response later.
              </p>
            </div> :

          <form onSubmit={handleSubmit} className="space-y-8 text-left">
              <div className="flex items-center gap-4 p-4 bg-gold-50/50 rounded-xl border border-gold-100">
                {user.photoURL && (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-10 h-10 rounded-full border border-gold-200" />
                )}
                <div className="text-left">
                  <p className="font-sans text-[10px] text-gold-600 uppercase tracking-widest leading-none mb-1">Signed in as</p>
                  <p className="font-serif text-sm text-wedding-text font-medium">{user.email}</p>
                </div>
              </div>

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
                className="w-full bg-transparent border-b-2 border-gold-200 py-3 px-2 font-serif text-xl text-wedding-text placeholder:text-wedding-text-muted/60 focus:outline-none focus:border-gold-400 transition-colors" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <button
                type="button"
                onClick={() => setAttendance('attending')}
                className={`py-4 px-6 font-serif text-lg transition-all duration-300 border-2 rounded-xl ${attendance === 'attending' ? 'bg-gold-500 border-gold-500 text-white shadow-md' : 'bg-transparent border-gold-200 text-wedding-text hover:border-gold-400'}`}>
                
                  Joyfully Accepts
                </button>
                <button
                type="button"
                onClick={() => setAttendance('declining')}
                className={`py-4 px-6 font-serif text-lg transition-all duration-300 border-2 rounded-xl ${attendance === 'declining' ? 'bg-champagne-dark border-champagne-dark text-white shadow-md' : 'bg-transparent border-gold-200 text-wedding-text hover:border-champagne-dark'}`}>
                
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
                className="inline-block px-12 py-4 bg-gradient-to-r from-gold-400 to-gold-600 text-white font-sans text-sm tracking-[0.15em] uppercase rounded-full hover:shadow-lg hover:shadow-gold-300/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none">
                
                  {isSubmitting ? 'Sending...' : submittedData ? 'Update Response' : 'Send Reply'}
                </button>
              </div>
            </form>
          }
        </div>
      </div>
      
      <RomanticModal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </AnimatedSection>);

}