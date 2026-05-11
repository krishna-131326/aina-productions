'use client';

import { motion, useInView } from 'framer-motion';
import { Fragment, useEffect, useRef, useState } from 'react';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stats: StatItem[] = [
  { label: 'Films', value: 12, suffix: '+' },
  { label: 'Views', value: 3000, suffix: '+' },
  { label: 'Crew Members', value: 8, suffix: '' },
  { label: 'Awards', value: 2, suffix: '' },
];

function Counter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const steps = 60;
    const increment = value / steps;
    const stepMs = 2000 / steps;
    let current = 0;

    const timer = window.setInterval(() => {
      current += increment;

      if (current >= value) {
        setCount(value);
        window.clearInterval(timer);
        return;
      }

      setCount(Math.floor(current));
    }, stepMs);

    return () => window.clearInterval(timer);
  }, [isInView, value]);

  const progress = value === 0 ? 0 : count / value;
  const textShadowOpacity = Math.min(progress * 0.4, 0.4);

  return (
    <span
      style={{
        textShadow: `0 0 30px rgba(232, 197, 71, ${textShadowOpacity})`,
      }}
    >
      {count.toLocaleString()}
      {suffix ? <span className="text-[var(--accent)]">{suffix}</span> : null}
    </span>
  );
}

export default function StatsBanner() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="border-y border-[var(--border)] bg-[var(--surface)] py-16">
      <motion.div
        className="mx-auto max-w-7xl px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, ease: easeOutExpo }}
        style={{ willChange: 'transform' }}
      >
        <div className="flex flex-wrap items-center justify-center gap-y-8 md:flex-nowrap md:justify-between">
          {stats.map((stat, index) => (
            <Fragment key={stat.label}>
              <motion.div
                className="w-1/2 text-center md:w-auto md:flex-1"
                initial={{ opacity: 0, y: 26 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
                transition={{ duration: 0.6, ease: easeOutExpo, delay: index * 0.15 + 0.15 }}
                style={{ willChange: 'transform' }}
              >
                <div
                  className="mb-2 text-4xl uppercase text-[var(--accent)] md:text-6xl"
                  style={{ fontFamily: 'var(--font-bebas-neue), cursive', letterSpacing: '0.05em' }}
                >
                  <Counter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                </div>
                <div
                  className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]"
                  style={{ fontFamily: 'var(--font-space-mono), monospace' }}
                >
                  {stat.label}
                </div>
              </motion.div>

              {index < stats.length - 1 ? (
                <div className="hidden h-12 w-px bg-[var(--border)] md:block" aria-hidden="true" />
              ) : null}
            </Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
