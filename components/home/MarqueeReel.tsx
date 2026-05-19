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

const rowStyle = (fontFamily: string): React.CSSProperties => ({
  fontFamily,
  willChange: 'transform',
});

export default function MarqueeReel() {
  return (
    <section className="overflow-hidden border-y border-[var(--border)] bg-[var(--surface)] py-4">
      <div
        className="space-y-2"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        {/* Row 1 — scrolls left */}
        <div className="flex overflow-hidden">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex min-w-max shrink-0 items-center gap-6 pr-6"
              style={{
                ...rowStyle('var(--font-space-mono), monospace'),
                animation: 'marquee-left 30s linear infinite',
              }}
            >
              {repeatedItems.map((item, index) => (
                <span
                  key={`r1-${copy}-${index}`}
                  className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]"
                >
                  {item} <span className="ml-6 opacity-40">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Row 2 — scrolls right */}
        <div className="flex overflow-hidden">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex min-w-max shrink-0 items-center gap-6 pr-6"
              style={{
                ...rowStyle('var(--font-space-mono), monospace'),
                animation: 'marquee-right 22s linear infinite',
                color: 'var(--accent)',
                opacity: 0.4,
              }}
            >
              {repeatedItems.map((item, index) => (
                <span key={`r2-${copy}-${index}`} className="text-[11px] uppercase tracking-[0.2em]">
                  {item} <span className="ml-6 opacity-40">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}