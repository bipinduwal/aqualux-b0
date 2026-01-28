'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

export default function RippleEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      loadScripts();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const loadScripts = () => {
    if (typeof window === 'undefined') return;

    // Load jQuery
    if (!window.$) {
      const jqueryScript = document.createElement('script');
      jqueryScript.src = 'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js';
      jqueryScript.onload = loadRipplesLibrary;
      jqueryScript.onerror = () => console.error('jQuery failed to load');
      document.head.appendChild(jqueryScript);
    } else {
      loadRipplesLibrary();
    }
  };

  const loadRipplesLibrary = () => {
    if (typeof window === 'undefined') return;

    // Check if jQuery is available
    if (!window.$) {
      setTimeout(loadRipplesLibrary, 100);
      return;
    }

    // Load ripples plugin
    const ripplesScript = document.createElement('script');
    ripplesScript.src = 'https://cdn.jsdelivr.net/gh/lolrazh/enhanced-jquery-ripples@main/jquery.ripples.js';
    ripplesScript.onload = initRipples;
    ripplesScript.onerror = () => console.error('Ripples plugin failed to load');
    document.head.appendChild(ripplesScript);
  };

  const initRipples = () => {
    if (typeof window === 'undefined') return;

    const $ = window.$;
    if (!$ || !$.fn.ripples) {
      console.warn('jQuery or ripples not available, retrying...');
      setTimeout(initRipples, 200);
      return;
    }

    if (containerRef.current) {
      try {
        $(containerRef.current).ripples({
          resolution: 512,
          dropRadius: 30,
          perturbance: 0.1,
          interactive: true,
        });
      } catch (err) {
        console.error('Error initializing ripples:', err);
      }
    }
  };

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (cursorRef.current && e.touches.length > 0) {
        const touch = e.touches[0];
        cursorRef.current.style.left = touch.clientX + 'px';
        cursorRef.current.style.top = touch.clientY + 'px';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <>
      {/* Ripple Container - Full screen background with ripple effect */}
      <div
        ref={containerRef}
        className="fixed z-10 inset-0 w-full h-screen cursor-none"
        style={{
          backgroundImage: 'url(https://picsum.photos/1920/1080?random=1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
          top: 0,
          left: 0,
        }}
      />

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-cyan-300/70 rounded-full pointer-events-none z-50"
        style={{
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}
