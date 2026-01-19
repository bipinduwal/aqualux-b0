'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { Trash2, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  // Mock cart state - in a real app this would be from a context or state management
  const cartItems = [
    {
      id: 1,
      commonName: 'Betta Fish',
      price: 12.99,
      quantity: 2,
      emoji: '🐠',
    },
    {
      id: 5,
      commonName: 'Clownfish',
      price: 24.99,
      quantity: 1,
      emoji: '🐠',
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

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
            Your Holding Tank
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Review your selected fish before checkout
          </motion.p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4 mb-8">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg p-6 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-6 flex-grow">
                      <div className="text-6xl">{item.emoji}</div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium mb-1">
                          {item.commonName}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">
                          Qty
                        </p>
                        <p className="text-lg font-medium">{item.quantity}</p>
                      </div>
                      <div className="text-right min-w-32">
                        <p className="text-sm text-muted-foreground mb-1">
                          Subtotal
                        </p>
                        <p className="text-lg font-medium text-accent">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <button className="p-2 hover:bg-muted rounded-lg transition-colors text-destructive">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/shop"
                  className="text-accent hover:opacity-70 transition-opacity"
                >
                  ← Continue Shopping
                </Link>
              </motion.button>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-32 h-fit"
            >
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-light mb-6">Order Summary</h2>

                <div className="space-y-4 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>FREE</span>
                  </div>
                </div>

                <div className="flex justify-between mt-6 mb-8">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-2xl font-light text-accent">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity mb-3"
                >
                  Proceed to Checkout
                </motion.button>

                <button className="w-full py-3 border border-border rounded-lg font-medium hover:bg-card transition-colors">
                  <Link href="/shop">Continue Shopping</Link>
                </button>

                <div className="mt-6 p-4 bg-muted/30 rounded-lg text-xs text-muted-foreground space-y-2">
                  <p>✓ Health guaranteed on all fish</p>
                  <p>✓ Same-week delivery available</p>
                  <p>✓ Expert care instructions included</p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="mb-6">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto opacity-50" />
            </div>
            <h2 className="text-2xl font-light mb-4">Your tank is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start exploring our collection of premium fish species. Each one is
              carefully selected for health and vitality.
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Explore Collection
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
