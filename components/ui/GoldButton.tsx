'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GoldButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const baseClasses = `
  relative inline-flex items-center justify-center px-8 py-3
  bg-transparent border-2 border-[var(--accent)] text-[var(--accent)]
  uppercase text-xs tracking-widest
  transition-all duration-300 ease-out
  hover:bg-[var(--accent)] hover:text-[var(--bg)]
  focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]
  overflow-hidden
  disabled:opacity-50 disabled:cursor-not-allowed
`;

const shimmerClass = `
  absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
  -translate-x-full group-hover:translate-x-full
  transition-transform duration-700 ease-out
`;

export default function GoldButton({
  children,
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: GoldButtonProps) {
  if (href) {
    return (
      <motion.a
        href={href}
        className={`group ${baseClasses} ${className}`}
        style={{ fontFamily: 'var(--font-space-mono), monospace' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className={shimmerClass} />
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${baseClasses} ${className}`}
      style={{ fontFamily: 'var(--font-space-mono), monospace' }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <span className={shimmerClass} />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}