'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-light text-accent">
          AquaLux
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/shop"
            className="text-foreground hover:text-accent transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/categories"
            className="text-foreground hover:text-accent transition-colors"
          >
            Species
          </Link>
          <Link
            href="/about"
            className="text-foreground hover:text-accent transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-foreground hover:text-accent transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/feed"
            className="text-foreground hover:text-accent transition-colors"
          >
            🐟 Feed
          </Link>
        </div>

        {/* Cart & Menu Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="text-foreground hover:text-accent transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-accent"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-card border-b border-border"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="text-foreground hover:text-accent transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/categories"
                onClick={() => setIsOpen(false)}
                className="text-foreground hover:text-accent transition-colors"
              >
                Species
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="text-foreground hover:text-accent transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-foreground hover:text-accent transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/feed"
                onClick={() => setIsOpen(false)}
                className="text-foreground hover:text-accent transition-colors"
              >
                🐟 Feed
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
