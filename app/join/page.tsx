'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SectionLabel from '../../components/ui/SectionLabel';
import AnimatedHeading from '../../components/ui/AnimatedHeading';
import GoldButton from '../../components/ui/GoldButton';
import { Camera, Users, Edit, Film } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  role: string;
  experience: string;
  portfolioUrl: string;
  message: string;
}

const roles = [
  {
    id: 'actor',
    title: 'Actor',
    icon: Users,
    description: 'Bring characters to life with your performance skills.',
    requirements: ['Acting experience', 'Reliability', 'Commitment to project'],
  },
  {
    id: 'director',
    title: 'Director',
    icon: Film,
    description: 'Lead creative vision and guide the production process.',
    requirements: ['Directing experience', 'Leadership skills', 'Storytelling ability'],
  },
  {
    id: 'editor',
    title: 'Editor',
    icon: Edit,
    description: 'Shape the final narrative through post-production magic.',
    requirements: ['Editing software proficiency', 'Creative vision', 'Attention to detail'],
  },
  {
    id: 'cinematographer',
    title: 'Cinematographer',
    icon: Camera,
    description: 'Capture stunning visuals that tell our stories.',
    requirements: ['Camera operation', 'Lighting knowledge', 'Visual storytelling'],
  },
];

const inputClass =
  'w-full bg-[var(--bg)] border border-[var(--border)] px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors';

export default function JoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitMessage("Thank you for your application! We'll be in touch soon.");
        reset();
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch {
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* CSS-only hero — no broken image */}
      <section
        className="relative h-[55vh] flex items-end px-8 pb-12 pt-36 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1200 50%, #0a0a0a 100%)' }}
      >
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 80px, var(--border) 80px, var(--border) 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, var(--border) 80px, var(--border) 81px)',
          }}
        />
        <div className="relative z-10">
          <SectionLabel>JOIN THE CREW</SectionLabel>
          <AnimatedHeading as="h1" className="text-6xl md:text-8xl">
            BE PART OF SOMETHING
          </AnimatedHeading>
        </div>
      </section>

      {/* Roles Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>OPEN ROLES</SectionLabel>
            <AnimatedHeading as="h2" className="text-5xl md:text-6xl">
              WHAT WE ARE LOOKING FOR
            </AnimatedHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.id}
                  className="bg-[var(--surface)] border border-[var(--border)] p-6 text-center hover:border-[var(--accent)] transition-colors"
                >
                  <div className="w-12 h-12 bg-[var(--accent)] flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-black" />
                  </div>
                  <h3
                    className="text-xl text-[var(--text)] mb-3"
                    style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
                  >
                    {role.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] mb-4">{role.description}</p>
                  <ul
                    className="text-xs text-[var(--muted)] space-y-1"
                    style={{ fontFamily: 'var(--font-space-mono), monospace' }}
                  >
                    {role.requirements.map((req, i) => (
                      <li key={i}>· {req}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-4 bg-[var(--surface)]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>APPLY NOW</SectionLabel>
            <AnimatedHeading as="h2" className="text-5xl md:text-6xl">
              LET US WORK TOGETHER
            </AnimatedHeading>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-xs uppercase tracking-widest text-[var(--muted)] mb-2"
                  style={{ fontFamily: 'var(--font-space-mono), monospace' }}
                >
                  Name *
                </label>
                <input {...register('name', { required: 'Required' })} className={inputClass} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label
                  className="block text-xs uppercase tracking-widest text-[var(--muted)] mb-2"
                  style={{ fontFamily: 'var(--font-space-mono), monospace' }}
                >
                  Email *
                </label>
                <input
                  {...register('email', {
                    required: 'Required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                  })}
                  type="email"
                  className={inputClass}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label
                className="block text-xs uppercase tracking-widest text-[var(--muted)] mb-2"
                style={{ fontFamily: 'var(--font-space-mono), monospace' }}
              >
                Role *
              </label>
              <select {...register('role', { required: 'Required' })} className={inputClass}>
                <option value="">Select a role</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.title}>{r.title}</option>
                ))}
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
            </div>

            <div>
              <label
                className="block text-xs uppercase tracking-widest text-[var(--muted)] mb-2"
                style={{ fontFamily: 'var(--font-space-mono), monospace' }}
              >
                Experience
              </label>
              <textarea {...register('experience')} rows={3} className={inputClass} />
            </div>

            <div>
              <label
                className="block text-xs uppercase tracking-widest text-[var(--muted)] mb-2"
                style={{ fontFamily: 'var(--font-space-mono), monospace' }}
              >
                Portfolio URL
              </label>
              <input {...register('portfolioUrl')} type="url" className={inputClass} />
            </div>

            <div>
              <label
                className="block text-xs uppercase tracking-widest text-[var(--muted)] mb-2"
                style={{ fontFamily: 'var(--font-space-mono), monospace' }}
              >
                Message *
              </label>
              <textarea
                {...register('message', { required: 'Required' })}
                rows={5}
                placeholder="Why do you want to join Aina Productions?"
                className={inputClass}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <div className="text-center">
              <GoldButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Application'}
              </GoldButton>
              {submitMessage && (
                <p className={`mt-4 text-sm ${submitMessage.includes('Thank you') ? 'text-green-400' : 'text-red-400'}`}>
                  {submitMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}