'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BootLoaderProps {
  onComplete?: () => void;
}

type Phase = 'visible' | 'exiting' | 'gone';

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<Phase>('visible');

  const triggerExit = () => {
    setPhase('exiting');
  };

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('aina_intro_seen');
    if (hasSeen) {
      onComplete?.();
      return;
    }

    setShow(true);
    sessionStorage.setItem('aina_intro_seen', 'true');

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const fallbackTimer = setTimeout(triggerExit, 6500);

    return () => {
      clearTimeout(fallbackTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (!show || phase === 'gone') return null;

  const isExiting = phase === 'exiting';

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black"
      aria-hidden="true"
      animate={
        isExiting
          ? { opacity: 0, filter: 'blur(12px)' }
          : { opacity: 1, filter: 'blur(0px)' }
      }
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (isExiting) {
          setPhase('gone');
          document.body.style.overflow = '';
          onComplete?.();
        }
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={() => videoRef.current?.play().catch(triggerExit)}
        onEnded={triggerExit}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/intro.webm" type="video/webm" />
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Bottom bleed */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />

      {/* Grain layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Skip button */}
      <button
        onClick={triggerExit}
        className="absolute bottom-8 right-8 z-50 border border-white/20 px-5 py-2 text-xs uppercase tracking-widest text-white/50 transition-all duration-300 hover:border-white/40 hover:bg-white/5 hover:text-white"
        style={{ fontFamily: 'var(--font-space-mono), monospace' }}
      >
        Skip Intro
      </button>
    </motion.div>
  );
}