'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Films', href: '/films' },
  { name: 'Team', href: '/team' },
  { name: 'Blog', href: '/blog' },
  { name: 'Join Us', href: '/join' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 80);
  });

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-[var(--border)] transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="font-bebas-neue text-2xl text-[var(--accent)] hover:text-[var(--accent-dim)] transition-colors">
            AINA
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-dm-sans text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[var(--text)] hover:text-[var(--accent)] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-[var(--surface)] border-b border-[var(--border)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block font-dm-sans text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}