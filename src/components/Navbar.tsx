import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
const navLinks = [
{
  label: 'The Two of Us',
  href: '#hero'
},
{
  label: 'Our Story',
  href: '#story'
},
{
  label: 'When & Where',
  href: '#details'
}];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleNavClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string) =>
  {
    e.preventDefault();
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return (
    <motion.nav
      initial={{
        y: -100
      }}
      animate={{
        y: 0
      }}
      transition={{
        duration: 0.6,
        ease: 'easeOut'
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-wedding-border' : 'bg-transparent'}`}>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-script text-2xl text-lavender-500 hover:text-lavender-600 transition-colors">
            
            K & S
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-sans text-xs tracking-[0.2em] uppercase text-wedding-text-light hover:text-lavender-500 transition-colors duration-300">
              
                {link.label}
              </a>
            )}
            <a
              href="#rsvp"
              onClick={(e) => handleNavClick(e, '#rsvp')}
              className="font-sans text-xs tracking-[0.15em] uppercase px-6 py-2 bg-rose text-white rounded-full hover:bg-rose-dark transition-colors duration-300 shadow-sm">
              
              RSVP
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-wedding-text-light hover:text-lavender-500 transition-colors"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}>
            
            {isMobileOpen ?
            <XIcon className="w-6 h-6" /> :

            <MenuIcon className="w-6 h-6" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut'
          }}
          className="md:hidden bg-white/95 backdrop-blur-md border-b border-wedding-border overflow-hidden">
          
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) =>
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-sans text-sm tracking-[0.15em] uppercase text-wedding-text-light hover:text-lavender-500 transition-colors">
              
                  {link.label}
                </a>
            )}
              <a
              href="#rsvp"
              onClick={(e) => handleNavClick(e, '#rsvp')}
              className="font-sans text-sm tracking-[0.15em] uppercase px-6 py-3 bg-rose text-white rounded-full text-center hover:bg-rose-dark transition-colors shadow-sm">
              
                RSVP
              </a>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </motion.nav>);

}