import { ReactNode } from 'react';
import { motion } from 'framer-motion';
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}
export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  id
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{
        opacity: 0,
        y: 30
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        margin: '-100px'
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut'
      }}>
      
      {children}
    </motion.section>);

}