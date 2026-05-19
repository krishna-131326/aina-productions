'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
  const pathname = usePathname();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 60);
  });

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-3'
        } border-b border-[var(--border)] bg-black/70 backdrop-blur-xl`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-20">

          {/* Brand */}
          <Link
            href="/"
            onClick={closeMenu}
            className="text-2xl uppercase tracking-tighter text-[var(--accent)] transition-opacity hover:opacity-70"
            style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
          >
            Aina Productions
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative pb-0.5 text-sm uppercase tracking-widest transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--text)] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-[var(--accent)]'
                      : 'text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                  style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Hire Us CTA — desktop */}
          <Link
            href="/join"
            className="hidden items-center bg-[var(--accent)] px-6 py-2 text-xs uppercase tracking-widest text-[var(--bg)] transition-opacity hover:opacity-80 md:inline-flex"
            style={{ fontFamily: 'var(--font-space-mono), monospace' }}
          >
            Hire Us
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`block h-px w-6 bg-[var(--text)] transition-all duration-300 ${
                isOpen ? 'translate-y-[5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-6 bg-[var(--text)] transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-px w-6 bg-[var(--text)] transition-all duration-300 ${
                isOpen ? '-translate-y-[5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--bg)] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07, duration: 0.35 }}
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="text-[clamp(36px,8vw,56px)] uppercase text-[var(--text)] transition-colors hover:text-[var(--accent)]"
                  style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.07 + 0.05 }}
            >
              <Link
                href="/join"
                onClick={closeMenu}
                className="mt-4 inline-block border-2 border-[var(--accent)] px-10 py-3 text-sm uppercase tracking-widest text-[var(--accent)]"
                style={{ fontFamily: 'var(--font-space-mono), monospace' }}
              >
                Hire Us
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </>
  );
}