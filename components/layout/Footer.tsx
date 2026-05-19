  import Link from 'next/link';

  export default function Footer() {
    return (
      <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-20">

          {/* Main row */}
          <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between">

            {/* Brand */}
            <div
              className="text-xl uppercase tracking-tighter text-[var(--text)]"
              style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
            >
              Aina Productions
            </div>

            {/* Social links */}
            <div className="flex gap-8">
              {[
                { label: 'Instagram', href: 'https://instagram.com/aina_productions' },
                { label: 'YouTube', href: 'https://youtube.com/@aina_productions' },
                { label: 'Vimeo', href: 'https://vimeo.com/aina_productions' },
                { label: 'LinkedIn', href: 'https://linkedin.com/company/aina-productions' },
              ].map((social) => (
                <a
                  key = {social.label}
                  href = {social.href}
                  target = "_blank"
                  rel = "noopener noreferrer"
                  className = "text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                  style = {{ fontFamily: 'var(--font-space-mono), monospace' }}
                >
                  {social.label}
                </a>
              ))}
            </div>

            {/* Legal links */}
            <div className="flex gap-6">
              {[
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                  style={{ fontFamily: 'var(--font-space-mono), monospace' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 border-t border-[var(--border)] pt-8">
            <p
              className="text-center text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]"
              style={{ fontFamily: 'var(--font-space-mono), monospace' }}
            >
              © 2024 Aina Productions. All rights reserved. Directed by Craft.
            </p>
          </div>
        </div>
      </footer >
    );
  }