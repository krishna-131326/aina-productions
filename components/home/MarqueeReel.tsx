'use client';

const marqueeItems = [
  'SHORT FILMS',
  'AINA PRODUCTIONS',
  'STORIES',
  'COMMUNITY',
  'CINEMATOGRAPHY',
  'DIRECTION',
  'EDITING',
  '2024',
];

const repeatedItems = Array.from({ length: 4 }, () => marqueeItems).flat();

export default function MarqueeReel() {
  return (
    <section className="overflow-hidden border-y border-[var(--border)] bg-[var(--surface)] py-4">
      <div
        className="space-y-2"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="flex overflow-hidden">
          <div
            className="flex min-w-max shrink-0 items-center gap-6 pr-6"
            style={{
              animation: 'marquee-left 30s linear infinite',
              willChange: 'transform',
              fontFamily: 'var(--font-space-mono), monospace',
            }}
          >
            {repeatedItems.map((item, index) => (
              <span
                key={`left-${item}-${index}`}
                className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]"
              >
                {item} <span className="ml-6">/</span>
              </span>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="flex min-w-max shrink-0 items-center gap-6 pr-6"
            style={{
              animation: 'marquee-left 30s linear infinite',
              willChange: 'transform',
              fontFamily: 'var(--font-space-mono), monospace',
            }}
          >
            {repeatedItems.map((item, index) => (
              <span
                key={`left-duplicate-${item}-${index}`}
                className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]"
              >
                {item} <span className="ml-6">/</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex overflow-hidden">
          <div
            className="flex min-w-max shrink-0 items-center gap-6 pr-6"
            style={{
              animation: 'marquee-right 22s linear infinite',
              color: 'var(--accent)',
              opacity: 0.4,
              willChange: 'transform',
              fontFamily: 'var(--font-space-mono), monospace',
            }}
          >
            {repeatedItems.map((item, index) => (
              <span key={`right-${item}-${index}`} className="text-[11px] uppercase tracking-[0.2em]">
                {item} <span className="ml-6">/</span>
              </span>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="flex min-w-max shrink-0 items-center gap-6 pr-6"
            style={{
              animation: 'marquee-right 22s linear infinite',
              color: 'var(--accent)',
              opacity: 0.4,
              willChange: 'transform',
              fontFamily: 'var(--font-space-mono), monospace',
            }}
          >
            {repeatedItems.map((item, index) => (
              <span
                key={`right-duplicate-${item}-${index}`}
                className="text-[11px] uppercase tracking-[0.2em]"
              >
                {item} <span className="ml-6">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translate3d(-100%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}
