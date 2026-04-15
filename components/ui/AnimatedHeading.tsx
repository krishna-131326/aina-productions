'use client';

import { motion } from 'framer-motion';

interface AnimatedHeadingProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const word = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 14, stiffness: 100 },
  },
};

export default function AnimatedHeading({
  children,
  className = '',
  as: Component = 'h1',
}: AnimatedHeadingProps) {
  const words = children.split(' ');

  return (
    <Component
      className={className}
      style={{ fontFamily: 'var(--font-bebas-neue), cursive', letterSpacing: '0.05em' }}
    >
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        className="inline-flex flex-wrap gap-x-2"
      >
        {words.map((w, i) => (
          <motion.span key={i} variants={word} className="inline-block">
            {w}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}