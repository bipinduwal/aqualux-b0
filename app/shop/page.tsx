'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import FishCard from '@/components/FishCard';
import FishDetail from '@/components/FishDetail';
import { FISH_DATABASE, HABITATS, BEHAVIORS, EXPERIENCE_LEVELS } from '@/lib/fishData';
import { Fish } from '@/lib/fishData';
import { ChevronDown } from 'lucide-react';

type FilterKey = 'habitat' | 'behavior' | 'experienceLevel';

export default function ShopPage() {
  const [selectedFish, setSelectedFish] = useState<Fish | null>(null);
  const [filters, setFilters] = useState({
    habitat: [] as string[],
    behavior: [] as string[],
    experienceLevel: [] as string[],
  });
  const [expandedFilter, setExpandedFilter] = useState<FilterKey | null>(null);

  const toggleFilter = (key: FilterKey, value: string) => {
    setFilters((prev) => {
      const current = prev[key];
      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const filteredFish = FISH_DATABASE.filter((fish) => {
    const habitatMatch =
      filters.habitat.length === 0 || filters.habitat.includes(fish.habitat);
    const behaviorMatch =
      filters.behavior.length === 0 || filters.behavior.includes(fish.behavior);
    const experienceMatch =
      filters.experienceLevel.length === 0 ||
      filters.experienceLevel.includes(fish.experienceLevel);

    return habitatMatch && behaviorMatch && experienceMatch;
  });

  const hasActiveFilters =
    filters.habitat.length > 0 ||
    filters.behavior.length > 0 ||
    filters.experienceLevel.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-b from-card/50 to-background border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-light mb-4 text-balance"
          >
            Our Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Explore our curated selection of premium fish species. Filter by habitat,
            behavior, and experience level to find your perfect match.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={() =>
                      setFilters({
                        habitat: [],
                        behavior: [],
                        experienceLevel: [],
                      })
                    }
                    className="text-xs text-accent hover:opacity-70 transition-opacity"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Habitat Filter */}
              <div className="border-t border-border pt-4">
                <button
                  onClick={() =>
                    setExpandedFilter(
                      expandedFilter === 'habitat' ? null : 'habitat'
                    )
                  }
                  className="w-full flex items-center justify-between text-sm font-medium hover:text-accent transition-colors"
                >
                  Habitat
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedFilter === 'habitat' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedFilter === 'habitat' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-2"
                    >
                      {HABITATS.map((habitat) => (
                        <label
                          key={habitat}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={filters.habitat.includes(habitat)}
                            onChange={() =>
                              toggleFilter('habitat', habitat)
                            }
                            className="w-4 h-4 rounded bg-input border-border"
                          />
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {habitat}
                          </span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Behavior Filter */}
              <div className="border-t border-border pt-4 mt-4">
                <button
                  onClick={() =>
                    setExpandedFilter(
                      expandedFilter === 'behavior' ? null : 'behavior'
                    )
                  }
                  className="w-full flex items-center justify-between text-sm font-medium hover:text-accent transition-colors"
                >
                  Behavior
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedFilter === 'behavior' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedFilter === 'behavior' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-2"
                    >
                      {BEHAVIORS.map((behavior) => (
                        <label
                          key={behavior}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={filters.behavior.includes(behavior)}
                            onChange={() =>
                              toggleFilter('behavior', behavior)
                            }
                            className="w-4 h-4 rounded bg-input border-border"
                          />
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {behavior}
                          </span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Experience Level Filter */}
              <div className="border-t border-border pt-4 mt-4">
                <button
                  onClick={() =>
                    setExpandedFilter(
                      expandedFilter === 'experienceLevel'
                        ? null
                        : 'experienceLevel'
                    )
                  }
                  className="w-full flex items-center justify-between text-sm font-medium hover:text-accent transition-colors"
                >
                  Experience Level
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedFilter === 'experienceLevel' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedFilter === 'experienceLevel' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-2"
                    >
                      {EXPERIENCE_LEVELS.map((level) => (
                        <label
                          key={level}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={filters.experienceLevel.includes(level)}
                            onChange={() =>
                              toggleFilter('experienceLevel', level)
                            }
                            className="w-4 h-4 rounded bg-input border-border"
                          />
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {level}
                          </span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Fish Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredFish.length} of {FISH_DATABASE.length} species
              </p>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredFish.map((fish, index) => (
                  <motion.div
                    key={fish.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedFish(fish)}
                  >
                    <FishCard fish={fish} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredFish.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-muted-foreground mb-4">
                  No species match your filters
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      habitat: [],
                      behavior: [],
                      experienceLevel: [],
                    })
                  }
                  className="text-accent hover:opacity-70 transition-opacity"
                >
                  Reset filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Fish Detail Modal */}
      <AnimatePresence>
        {selectedFish && (
          <FishDetail
            fish={selectedFish}
            onClose={() => setSelectedFish(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
