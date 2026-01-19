'use client';

import React from "react"

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

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
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Have questions about our fish or need expert guidance? We're here to
            help you create the perfect aquatic environment.
          </motion.p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-lg p-8 h-fit"
          >
            <div className="flex items-start gap-4 mb-4">
              <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-2">Location</h3>
                <p className="text-muted-foreground">
                  123 Aquatic Avenue
                  <br />
                  Marina City, MC 45678
                  <br />
                  United States
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-8 h-fit"
          >
            <div className="flex items-start gap-4 mb-4">
              <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-2">Phone & WhatsApp</h3>
                <a
                  href="tel:+15551234567"
                  className="text-accent hover:opacity-70 transition-opacity"
                >
                  +1 (555) 123-4567
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Available for WhatsApp
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-8 h-fit"
          >
            <div className="flex items-start gap-4 mb-4">
              <Clock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-2">Business Hours</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Form & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="John Aqua"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                  placeholder="Tell us about your aquarium journey..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                {submitted ? 'Message Sent!' : 'Send Message'}
              </motion.button>
            </form>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-900/30 border border-green-600/50 rounded-lg text-green-400 text-sm"
              >
                Thank you for your message. We'll be in touch shortly!
              </motion.div>
            )}
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-light mb-4">Why Choose AquaLux?</h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  'Health-guaranteed fish sourced from premium breeders',
                  'Expert guidance for all experience levels',
                  '15+ years of professional aquarium experience',
                  'Free consultation on tank setup and maintenance',
                  'Community support and exclusive updates',
                  'Same-week delivery available',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-accent mt-1">✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-lg font-medium mb-3">Quick Response</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We typically respond to inquiries within 2 hours during business
                hours.
              </p>
              <a
                href="mailto:hello@aqualux.com"
                className="inline-flex items-center gap-2 text-accent hover:opacity-70 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                hello@aqualux.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
