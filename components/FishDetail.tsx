'use client';

import { motion } from 'framer-motion';
import { Fish } from '@/lib/fishData';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface FishDetailProps {
  fish: Fish;
  onClose: () => void;
}

export default function FishDetail({ fish, onClose }: FishDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Handle add to cart
    console.log(`Added ${quantity} ${fish.commonName}(s) to cart`);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
          <h2 className="text-2xl font-light">{fish.commonName}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Info Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left - Visual */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-900/20 to-transparent rounded-lg p-12">
              <motion.div
                className="text-9xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {fish.emoji}
              </motion.div>
            </div>

            {/* Right - Quick Info */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Scientific Name
                </p>
                <p className="italic text-foreground">{fish.scientificName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Habitat</p>
                  <p className="text-accent font-medium">{fish.habitat}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Behavior</p>
                  <p className="text-accent font-medium">{fish.behavior}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Experience Level
                </p>
                <p className="text-accent font-medium">
                  {fish.experienceLevel}
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-3xl font-light text-accent">
                  ${fish.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-medium mb-2">About this species</h3>
            <p className="text-muted-foreground leading-relaxed">
              {fish.description}
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Size</p>
              <p className="text-lg font-medium">
                {fish.size.min}-{fish.size.max} cm
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Lifespan</p>
              <p className="text-lg font-medium">
                {fish.lifespan.min}-{fish.lifespan.max} years
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">
                Tank Size
              </p>
              <p className="text-lg font-medium">
                {fish.tankSizeGallons} gallons
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Temperature</p>
              <p className="text-lg font-medium">
                {fish.temperature.min}-{fish.temperature.max}°C
              </p>
            </div>
          </div>

          {/* Diet */}
          <div>
            <h3 className="text-lg font-medium mb-3">Diet</h3>
            <div className="flex flex-wrap gap-2">
              {fish.diet.map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Temperament */}
          <div>
            <h3 className="text-lg font-medium mb-2">Temperament</h3>
            <p className="text-muted-foreground">{fish.temperament}</p>
          </div>

          {/* Add to Cart Section */}
          <div className="border-t border-border pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Quantity:</span>
              <div className="flex items-center gap-2 border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart - ${(fish.price * quantity).toFixed(2)}
            </motion.button>

            <div className={`text-center text-sm font-medium ${
              fish.availability === 'In Stock'
                ? 'text-green-400'
                : fish.availability === 'Low Stock'
                  ? 'text-yellow-400'
                  : 'text-blue-400'
            }`}>
              {fish.availability}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
