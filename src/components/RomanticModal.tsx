import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

interface RomanticModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'loading';
}

export function RomanticModal({ isOpen, onClose, title, message, type = 'success' }: RomanticModalProps) {
  const isLoading = type === 'loading';
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-lavender-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative glass-card p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full text-center overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose/30 via-rose to-rose/30" />
            
            {!isLoading && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-lavender-400 hover:text-rose transition-colors"
              >
                <X size={20} />
              </button>
            )}

            <div className="mb-6 flex justify-center">
              <div className={`p-4 rounded-full ${isLoading ? 'bg-lavender-50' : type === 'success' ? 'bg-rose-light/30' : 'bg-red-50'}`}>
                <motion.div
                  animate={isLoading ? { rotate: 360 } : { scale: [1, 1.1, 1] }}
                  transition={isLoading ? { repeat: Infinity, duration: 2, ease: "linear" } : { repeat: Infinity, duration: 2 }}
                >
                  {isLoading ? (
                    <div className="relative">
                      <Heart className="w-10 h-10 text-lavender-300" fill="none" strokeWidth={1} />
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <Heart className="w-6 h-6 text-rose" fill="currentColor" strokeWidth={0} />
                      </motion.div>
                    </div>
                  ) : (
                    <Heart 
                      className={`w-10 h-10 ${type === 'success' ? 'text-rose' : 'text-red-400'}`} 
                      fill={type === 'success' ? 'currentColor' : 'none'} 
                      strokeWidth={type === 'success' ? 0 : 2}
                    />
                  )}
                </motion.div>
              </div>
            </div>

            <h3 className="font-script text-4xl text-lavender-600 mb-4 leading-tight">
              {title}
            </h3>
            
            <p className="font-serif text-lg text-wedding-text-light mb-8">
              {message}
            </p>

            {!isLoading && (
              <button
                onClick={onClose}
                className="px-10 py-3 bg-gradient-to-r from-rose to-rose-dark text-white font-sans text-sm tracking-widest uppercase rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                OK
              </button>
            )}
            
            {/* Subtle corner petals */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-rose-light/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-lavender-200/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
