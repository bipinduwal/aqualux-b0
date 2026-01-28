'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Fish {
  id: number;
  name: string;
  emoji: string;
  size: number;
  speed: number;
  yPosition: number;
  delay: number;
}

const FISH_DATA: Fish[] = [
  { id: 1, name: 'Betta', emoji: '🐠', size: 40, speed: 15, yPosition: 20, delay: 0 },
  { id: 2, name: 'Goldfish', emoji: '🐟', size: 45, speed: 20, yPosition: 45, delay: 2 },
  { id: 3, name: 'Angelfish', emoji: '🐟', size: 35, speed: 18, yPosition: 60, delay: 4 },
  { id: 4, name: 'Tetra', emoji: '🐠', size: 25, speed: 12, yPosition: 75, delay: 1 },
];

export default function AquariumScene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredFish, setHoveredFish] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Aquarium background gradient */}
      {/* <div className="absolute inset-0 bg-linear-to-b from-blue-950 via-blue-900 to-blue-800 opacity-90" /> */}
      
      {/* Animated water effect */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <filter id="waterWave">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="2" />
            <feDisplacementMap in="SourceGraphic" scale="50" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="#0ea5e9" filter="url(#waterWave)" />
      </svg>

      {/* Floating bubbles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full border border-accent/20 bg-accent/5"
            style={{
              left: `${Math.random() * 100}%`,
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
            }}
            animate={{
              y: [0, -window.innerHeight - 50],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Light rays effect */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-accent/10 to-transparent blur-3xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      {/* Animated fish */}
      <div className="absolute inset-0">
        {FISH_DATA.map((fish) => (
          <motion.div
            key={fish.id}
            className="absolute cursor-pointer"
            style={{
              top: `${fish.yPosition}%`,
              width: fish.size,
              height: fish.size,
            }}
            animate={{
              x: ['0%', '100vw', '0%'],
              y: hoveredFish === fish.id ? -20 : 0,
              scale: hoveredFish === fish.id ? 1.15 : 1,
            }}
            transition={{
              x: {
                duration: fish.speed,
                repeat: Infinity,
                ease: 'linear',
              },
              y: {
                duration: 2,
                ease: 'easeInOut',
              },
              scale: {
                duration: 0.3,
              },
            }}
            // initial={{ delay: fish.delay }}
            onMouseEnter={() => setHoveredFish(fish.id)}
            onMouseLeave={() => setHoveredFish(null)}
          >
            <motion.div
              className="text-4xl"
              animate={{
                scaleX: fish.yPosition % 2 === 0 ? 1 : -1,
              }}
            >
              {fish.emoji}
            </motion.div>

            {/* Hover info */}
            {hoveredFish === fish.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 bg-card/80 backdrop-blur px-3 py-1 rounded text-xs whitespace-nowrap border border-accent/30"
              >
                {fish.name}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Center branding */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-light text-accent text-balance text-center z-55 "
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          AquaLux
        </motion.h1>
        <p className="text-accent/70 mt-4 text-sm tracking-widest relative z-55">PREMIUM AQUATIC EXPERIENCE</p>
      </motion.div>
    </div>
  );
}
