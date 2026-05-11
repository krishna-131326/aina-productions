'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootLoaderProps {
  onComplete?: () => void;
}

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const triggerExit = () => {
    setFadeOut(true);
  };

  useEffect(() => {
    // Only show intro once per browser session
    const hasSeen = sessionStorage.getItem('aina_intro_seen');
    if (hasSeen) {
      onComplete?.();
      return;
    }

    setShow(true);
    sessionStorage.setItem('aina_intro_seen', 'true');

    // Lock scroll while intro plays
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Fallback: force exit after 6 seconds if video fails
    const fallbackTimer = setTimeout(() => {
      triggerExit();
    }, 6000);

    return () => {
      clearTimeout(fallbackTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          key="bootloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          className="fixed inset-0 z-[9999] bg-black"
          aria-hidden="true"
        >
          {/* Actual animated exit wrapper */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 1, filter: 'blur(0px)' }}
            animate={fadeOut ? { opacity: 0, filter: 'blur(10px)' } : { opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            onAnimationComplete={() => {
              if (fadeOut) {
                setShow(false);
                document.body.style.overflow = '';
                onComplete?.();
              }
            }}
          />

          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            onCanPlay={() => videoRef.current?.play().catch(() => triggerExit())}
            onEnded={triggerExit}
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/intro.webm" type="video/webm" />
            <source src="/intro.mp4" type="video/mp4" />
          </video>

          {/* Vignette overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)',
            }}
          />

          {/* Bottom cinematic fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-black to-transparent" />

          {/* Grain layer */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Skip button */}
          <button
            onClick={triggerExit}
            className="absolute bottom-8 right-8 z-50 px-5 py-2 text-xs uppercase tracking-widest text-white/50 border border-white/20 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            Skip Intro
          </button>

        </motion.div>
      )}
    </AnimatePresence>
  );
}