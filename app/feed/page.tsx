'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import RippleEffect from '@/components/RippleEffect';

const InteractiveFish = dynamic(() => import('@/components/InteractiveFish').then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-blue-950 flex items-center justify-center text-white">Loading aquarium...</div>,
});

export default function FeedPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-accent/20">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="relative z-20">
        <Suspense fallback={<div className="w-full h-screen bg-blue-950" />}>
          <InteractiveFish />
        </Suspense>
      </div>

      {/* Back Button */}
      <Link
        href="/"
        className="fixed bottom-8 left-8 z-30 px-6 py-2 bg-accent text-accent-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
      >
        ← Back Home
      </Link>
    </div>
  );
}
