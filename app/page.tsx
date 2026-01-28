'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import { ChevronRight } from 'lucide-react';

// Dynamically import components with no SSR (they use browser APIs)
const AquariumScene = dynamic(() => import('@/components/AquariumScene'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="relative">
        <Navigation />
      
      {/* Hero Aquarium Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <AquariumScene />
        
        {/* Overlay with exploration prompt */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10"
        >
          <p className="text-sm text-accent mb-2">Explore the aquarium</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronRight className="w-5 h-5 text-accent mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light mb-6 text-balance"
          >
            Premium Aquatic Life Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed mb-8"
          >
            Discover carefully curated fish species from around the world. Each creature in our aquarium represents excellence in health, vitality, and genetic quality. We believe in creating living ecosystems, not just collections.
          </motion.p>
          
          <div className="grid grid-cols-3 gap-8 mt-16">
            {[
              { number: '500+', label: 'Species Available' },
              { number: '15+', label: 'Years Experience' },
              { number: '100%', label: 'Health Guaranteed' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl font-light text-accent mb-2">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 flex flex-col items-center gap-6">
        <Link 
          href="/shop"
          className="px-8 py-3 bg-accent text-accent-foreground rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          Explore Our Collection
          <ChevronRight className="w-4 h-4" />
        </Link>
      </section>
      </div>
    </div>
  );
}
