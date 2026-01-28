'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import RippleEffect with no SSR
const RippleEffect = dynamic(() => import('@/components/RippleEffect'), {
  ssr: false,
});

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <RippleEffect />
      </Suspense>
      {children}
    </>
  );
}
