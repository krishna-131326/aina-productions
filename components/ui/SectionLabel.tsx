import { ReactNode } from 'react';

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`font-space-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-4 ${className}`}>
      {children}
    </div>
  );
}