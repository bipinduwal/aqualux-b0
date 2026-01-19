'use client';

import { motion } from 'framer-motion';
import { Fish } from '@/lib/fishData';
import { Zap } from 'lucide-react';

interface FishCardProps {
  fish: Fish;
}

export default function FishCard({ fish }: FishCardProps) {
  const getExperienceBadgeColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-900/30 text-green-400';
      case 'Intermediate':
        return 'bg-yellow-900/30 text-yellow-400';
      case 'Expert':
        return 'bg-red-900/30 text-red-400';
      default:
        return 'bg-accent/10 text-accent';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'In Stock':
        return 'text-green-400';
      case 'Low Stock':
        return 'text-yellow-400';
      case 'Pre-Order':
        return 'text-blue-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group cursor-pointer h-full"
    >
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-colors h-full flex flex-col">
        {/* Image/Emoji Section */}
        <div className="relative bg-gradient-to-b from-blue-900/20 to-background aspect-square flex items-center justify-center overflow-hidden">
          <motion.div
            className="text-9xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {fish.emoji}
          </motion.div>

          {/* Stock Badge */}
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(
              fish.availability
            )}`}
          >
            {fish.availability}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-grow flex flex-col">
          <div className="mb-3">
            <h3 className="text-lg font-medium text-foreground mb-1">
              {fish.commonName}
            </h3>
            <p className="text-sm text-muted-foreground italic">
              {fish.scientificName}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded">
              {fish.habitat}
            </span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getExperienceBadgeColor(
                fish.experienceLevel
              )}`}
            >
              {fish.experienceLevel}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
            {fish.description}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
            <div className="bg-card-foreground/5 rounded p-2">
              <p className="text-muted-foreground">Size</p>
              <p className="text-accent font-medium">
                {fish.size.min}-{fish.size.max} cm
              </p>
            </div>
            <div className="bg-card-foreground/5 rounded p-2">
              <p className="text-muted-foreground">Lifespan</p>
              <p className="text-accent font-medium">
                {fish.lifespan.min}-{fish.lifespan.max} yrs
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
            <div className="text-2xl font-light text-accent">
              ${fish.price.toFixed(2)}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Details
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
