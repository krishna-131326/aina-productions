'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { label: 'Films', value: 12, suffix: '+' },
  { label: 'Views', value: 3000, suffix: '+' },
  { label: 'Crew Members', value: 8, suffix: '' },
  { label: 'Awards', value: 2, suffix: '' },
];

function Counter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const steps = 60;
    const increment = value / steps;
    const stepMs = 2000 / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepMs);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="bg-[var(--surface)] border-y border-[var(--border)] py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div
                className="text-4xl md:text-5xl text-[var(--accent)] mb-2"
                style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
              >
                <Counter value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>
              <div
                className="text-xs uppercase tracking-widest text-[var(--muted)]"
                style={{ fontFamily: 'var(--font-space-mono), monospace' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}