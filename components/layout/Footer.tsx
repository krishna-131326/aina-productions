import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="font-bebas-neue text-xl text-[var(--accent)] mb-4">AINA PRODUCTIONS</h3>
            <p className="font-dm-sans text-sm text-[var(--muted)] leading-relaxed">
              Crafting stories that move. Short films, community filmmaking, and cinematic experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-space-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/films" className="block font-dm-sans text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                Films
              </Link>
              <Link href="/team" className="block font-dm-sans text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                Team
              </Link>
              <Link href="/blog" className="block font-dm-sans text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                Blog
              </Link>
              <Link href="/join" className="block font-dm-sans text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                Join Us
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-space-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/aina_productions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com/@aina_productions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                aria-label="Subscribe on YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border)] mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="font-space-mono text-xs text-[var(--muted)]">
            © 2024 Aina Productions. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="font-space-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="font-space-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}