'use client';

import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  bio: string;
  instagramUrl?: string;
  order: number;
}

export default function MemberCard({ member }: { member: Member }) {
  return (
    <motion.div
      className="group bg-[var(--bg)] border border-[var(--border)] p-6 text-center hover:border-[var(--accent)] transition-all duration-300"
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(232, 197, 71, 0.08)' }}
    >
      {/* Avatar circle with initials fallback */}
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[var(--surface)] border-2 border-[var(--border)] group-hover:border-[var(--accent)] transition-colors overflow-hidden flex items-center justify-center">
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            className="text-2xl text-[var(--accent)]"
            style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
          >
            {member.name.charAt(0)}
          </span>
        )}
      </div>

      <h3
        className="text-xl text-[var(--text)] mb-1"
        style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
      >
        {member.name}
      </h3>
      <p
        className="text-xs uppercase tracking-widest text-[var(--accent)] mb-4"
        style={{ fontFamily: 'var(--font-space-mono), monospace' }}
      >
        {member.role}
      </p>
      <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{member.bio}</p>

      {member.instagramUrl && (
        <a
          href={member.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          aria-label={`Follow ${member.name} on Instagram`}
        >
          <Instagram size={16} />
        </a>
      )}
    </motion.div>
  );
}