'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    {
      title: 'Freshwater Fish',
      description: 'Hardy, accessible species perfect for most home aquariums',
      count: 180,
      color: 'from-blue-900/40 to-blue-800/20',
      href: '/shop?habitat=Freshwater',
    },
    {
      title: 'Saltwater Fish',
      description: 'Vibrant marine species for advanced aquarists',
      count: 120,
      color: 'from-cyan-900/40 to-blue-900/20',
      href: '/shop?habitat=Saltwater',
    },
    {
      title: 'Peaceful Species',
      description: 'Gentle fish ideal for community tanks',
      count: 95,
      color: 'from-green-900/40 to-emerald-800/20',
      href: '/shop?behavior=Peaceful',
    },
    {
      title: 'Aggressive Species',
      description: 'Powerful predators for experienced keepers',
      count: 45,
      color: 'from-red-900/40 to-orange-800/20',
      href: '/shop?behavior=Aggressive',
    },
    {
      title: 'Schooling Fish',
      description: 'Social species that thrive in groups',
      count: 60,
      color: 'from-purple-900/40 to-pink-800/20',
      href: '/shop?behavior=Schooling',
    },
    {
      title: 'Territorial Species',
      description: 'Independent fish that command respect',
      count: 35,
      color: 'from-amber-900/40 to-yellow-800/20',
      href: '/shop?behavior=Territorial',
    },
  ];

  const experienceCategories = [
    {
      level: 'Beginner',
      description: 'Perfect starting point for new aquarists',
      count: 120,
    },
    {
      level: 'Intermediate',
      description: 'Good challenge with moderate care requirements',
      count: 150,
    },
    {
      level: 'Expert',
      description: 'Advanced specimens for seasoned professionals',
      count: 85,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-b from-card/50 to-background border-b border-border">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-light mb-4 text-balance"
          >
            Fish Categories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Explore our collection organized by habitat, behavior, and experience level
          </motion.p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Main Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-light mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={category.href}>
                  <div
                    className={`bg-gradient-to-br ${category.color} border border-border rounded-lg p-8 h-full hover:border-accent/50 transition-colors cursor-pointer group`}
                  >
                    <h3 className="text-2xl font-light mb-3 group-hover:text-accent transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-end justify-between">
                      <p className="text-sm text-accent font-medium">
                        {category.count} species
                      </p>
                      <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Level Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-border pt-16"
        >
          <h2 className="text-2xl font-light mb-8">By Experience Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experienceCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/shop?experienceLevel=${category.level}`}
                >
                  <div className="bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition-colors cursor-pointer group h-full">
                    <h3 className="text-2xl font-light mb-2 group-hover:text-accent transition-colors">
                      {category.level}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      {category.description}
                    </p>
                    <p className="text-accent font-medium text-sm">
                      {category.count} species available
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-light mb-4">Need Help Choosing?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our experts are ready to help you find the perfect species for your
            aquarium setup.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Get Expert Guidance
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
