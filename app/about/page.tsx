'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Award, Users, Leaf } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description:
        'We source only the healthiest, most vibrant fish from premium breeders around the world.',
    },
    {
      icon: Users,
      title: 'Community',
      description:
        'Building a passionate community of aquarium enthusiasts through education and support.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description:
        'Committed to ethical breeding practices and environmental responsibility.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-card/50 to-background border-b border-border">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-light mb-4 text-balance"
          >
            About AquaLux
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Pioneering the premium aquatic experience since 2009
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At AquaLux, we believe that aquariums are more than just tanks filled
              with water and fish. They are living ecosystems—windows into the
              natural world that bring beauty, calm, and wonder into our homes and
              offices. Our mission is to make premium aquatic life accessible to
              everyone, regardless of experience level.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-8 text-center"
                >
                  <Icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-light mb-8"
          >
            Our Story
          </motion.h2>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              AquaLux was founded in 2009 by aquarium enthusiasts who shared a
              passion for creating living art. What started as a small hobby quickly
              evolved into a mission to revolutionize how people experience aquatic
              life.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Over 15 years, we've cultivated relationships with premium breeders
              across the globe, ensuring every fish in our collection meets our
              rigorous health and vitality standards. We've learned that successful
              aquariums aren't built on trends—they're built on knowledge, care, and
              the right species matched to the right keeper.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Today, AquaLux serves thousands of aquarists—from curious beginners to
              seasoned experts. Our team of specialists provides personalized guidance
              at every step of the journey, ensuring that every customer finds not just
              fish, but a thriving, living ecosystem.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-light mb-12 text-center"
          >
            By The Numbers
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '15+', label: 'Years in Business' },
              { number: '500+', label: 'Species Available' },
              { number: '10K+', label: 'Happy Customers' },
              { number: '100%', label: 'Health Guarantee' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-light text-accent mb-2">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Philosophy Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-light mb-8"
          >
            Our Philosophy
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-lg p-12 text-center"
          >
            <p className="text-2xl font-light text-foreground mb-6 text-balance leading-relaxed">
              "An aquarium is not just a collection of fish—it's a living, breathing
              ecosystem that teaches us about patience, responsibility, and the
              interconnectedness of nature. We don't just sell fish; we guide you in
              creating a thriving world."
            </p>
            <p className="text-muted-foreground">— The AquaLux Team</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
