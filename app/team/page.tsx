'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../../components/ui/SectionLabel';
import AnimatedHeading from '../../components/ui/AnimatedHeading';
import MemberCard from '../../components/team/MemberCard';
import { staggerContainer, scaleIn } from '../../lib/variants';

// Mock data - replace with Sanity fetch
const teamMembers = [
  {
    id: '1',
    name: 'Alex Rivera',
    role: 'Director & Founder',
    avatar: '/images/team/member-1.webp',
    bio: 'Passionate filmmaker with over 8 years of experience in short film production and community storytelling.',
    instagramUrl: 'https://instagram.com/alexrivera',
    order: 1,
  },
  {
    id: '2',
    name: 'Jordan Chen',
    role: 'Cinematographer',
    avatar: '/images/team/member-2.webp',
    bio: 'Visual storyteller specializing in atmospheric lighting and dynamic camera work for narrative films.',
    instagramUrl: 'https://instagram.com/jordanchen',
    order: 2,
  },
  {
    id: '3',
    name: 'Sam Taylor',
    role: 'Editor',
    avatar: '/images/team/member-3.png',
    bio: 'Post-production wizard who brings raw footage to life through precise editing and sound design.',
    instagramUrl: 'https://instagram.com/samtaylor',
    order: 3,
  },
  // Add more members...
];

// Metadata removed - move to layout if needed

export default function TeamPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>THE CREW</SectionLabel>
              <AnimatedHeading as="h1" className="text-5xl md:text-6xl mb-6">
                MEET OUR TEAM
              </AnimatedHeading>
            </div>
            <div>
              <p className="font-dm-sans text-lg text-[var(--muted)] leading-relaxed">
                Aina Productions is built on collaboration and creativity. Our diverse team brings together filmmakers,
                artists, and storytellers from various backgrounds, united by a shared passion for cinematic storytelling
                and community-driven projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section ref={ref} className="py-20 px-4 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {teamMembers
              .sort((a, b) => a.order - b.order)
              .map((member) => (
                <motion.div key={member.id} variants={scaleIn}>
                  <MemberCard member={member} />
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}