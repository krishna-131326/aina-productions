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

// Metadata removed - move to layout if needed

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
        reset();
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <SectionLabel>LET&apos;S TALK</SectionLabel>
          <AnimatedHeading as="h1" className="text-6xl md:text-8xl mb-6">
            GET IN TOUCH
          </AnimatedHeading>
          <p className="font-dm-sans text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Have a project in mind? Want to collaborate? Or just want to say hello?
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bebas-neue text-2xl text-[var(--text)] mb-4">REACH OUT</h3>
              <div className="space-y-4">
                <a
                  href="https://instagram.com/aina_productions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  <Instagram size={20} />
                  <span className="font-space-mono text-xs uppercase tracking-widest">@aina_productions</span>
                </a>
                <a
                  href="https://youtube.com/@aina_productions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  <Youtube size={20} />
                  <span className="font-space-mono text-xs uppercase tracking-widest">@aina_productions</span>
                </a>
                <a
                  href="mailto:hello@aina-productions.com"
                  className="flex items-center space-x-3 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  <Mail size={20} />
                  <span className="font-space-mono text-xs uppercase tracking-widest">hello@aina-productions.com</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bebas-neue text-2xl text-[var(--text)] mb-4">LOCATION</h3>
              <p className="font-dm-sans text-sm text-[var(--muted)] leading-relaxed">
                Based in the heart of the city, we work with filmmakers and creatives worldwide.
                Remote collaboration welcome.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-space-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-2">
                  Name *
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  id="name"
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded px-4 py-3 font-dm-sans text-[var(--text)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block font-space-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-2">
                  Email *
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  id="email"
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded px-4 py-3 font-dm-sans text-[var(--text)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block font-space-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  id="message"
                  rows={6}
                  placeholder="Tell us about your project or idea..."
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded px-4 py-3 font-dm-sans text-[var(--text)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <div className="text-center">
                <GoldButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </GoldButton>
                {submitMessage && (
                  <p className={`mt-4 text-sm ${submitMessage.includes('Thank you') ? 'text-green-500' : 'text-red-500'}`}>
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