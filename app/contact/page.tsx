'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SectionLabel from '../../components/ui/SectionLabel';
import AnimatedHeading from '../../components/ui/AnimatedHeading';
import GoldButton from '../../components/ui/GoldButton';
import { Instagram, Youtube, Mail } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const inputClass =
  'w-full bg-[var(--bg)] border border-[var(--border)] px-4 py-3 text-[var(--text)] transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]';

export default function ContactPage() {
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSubmitMessage("Thank you for your message! We'll get back to you soon.");
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
    <div className="min-h-screen px-4 py-32">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-16 text-center">
          <SectionLabel>Let&apos;s Talk</SectionLabel>
          <AnimatedHeading as="h1" className="mb-6 text-6xl md:text-8xl">
            GET IN TOUCH
          </AnimatedHeading>
          <p
            className="mx-auto max-w-2xl text-lg text-[var(--muted)]"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
          >
            Have a project in mind? Want to collaborate? Or just want to say hello?
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

          {/* Contact info */}
          <div className="space-y-10">
            <div>
              <h3
                className="mb-5 text-2xl uppercase text-[var(--text)]"
                style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
              >
                Reach Out
              </h3>
              <div className="space-y-4">
                {[
                  {
                    href: 'https://instagram.com/aina_productions',
                    icon: Instagram,
                    label: '@aina_productions',
                    external: true,
                  },
                  {
                    href: 'https://youtube.com/@aina_productions',
                    icon: Youtube,
                    label: '@aina_productions',
                    external: true,
                  },
                  {
                    href: 'mailto:hello@aina-productions.com',
                    icon: Mail,
                    label: 'hello@aina-productions.com',
                    external: false,
                  },
                ].map(({ href, icon: Icon, label, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    <Icon size={18} />
                    <span
                      className="text-xs uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-space-mono), monospace' }}
                    >
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3
                className="mb-4 text-2xl uppercase text-[var(--text)]"
                style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
              >
                Location
              </h3>
              <p
                className="text-sm leading-8 text-[var(--muted)]"
                style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
              >
                Based in Delhi, India. We work with filmmakers and creatives worldwide.
                Remote collaboration always welcome.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="border border-[var(--border)] bg-[var(--surface)] p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-[11px] uppercase tracking-widest text-[var(--muted)]"
                  style={{ fontFamily: 'var(--font-space-mono), monospace' }}
                >
                  Name *
                </label>
                <input
                  id="contact-name"
                  {...register('name', { required: 'Name is required' })}
                  className={inputClass}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-[11px] uppercase tracking-widest text-[var(--muted)]"
                  style={{ fontFamily: 'var(--font-space-mono), monospace' }}
                >
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
                  })}
                  className={inputClass}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-[11px] uppercase tracking-widest text-[var(--muted)]"
                  style={{ fontFamily: 'var(--font-space-mono), monospace' }}
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  placeholder="Tell us about your project or idea..."
                  {...register('message', { required: 'Message is required' })}
                  className={inputClass}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                )}
              </div>

              <div className="text-center">
                <GoldButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </GoldButton>
                {submitMessage && (
                  <p
                    className={`mt-4 text-sm ${
                      submitMessage.includes('Thank you') ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {submitMessage}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}