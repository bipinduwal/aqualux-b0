'use client';

import { useEffect, useRef, useState } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export default function RippleEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const animationRef = useRef<number | null>(null);

  // Draw ripples on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw ripples
      const newRipples = ripplesRef.current.filter((ripple) => ripple.opacity > 0);

      newRipples.forEach((ripple) => {
        ripple.radius += 3;
        ripple.opacity = Math.max(0, 1 - ripple.radius / ripple.maxRadius);

        // Draw ripple circle
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 211, 238, ${ripple.opacity * 0.8})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw fill
        ctx.fillStyle = `rgba(34, 211, 238, ${ripple.opacity * 0.15})`;
        ctx.fill();
      });

      ripplesRef.current = newRipples;

      if (newRipples.length > 0) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    if (ripplesRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(draw);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [ripples]);

  // Set canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cursor and ripple trigger
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = {
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 150,
        opacity: 1,
      };

      ripplesRef.current.push(newRipple);
      setRipples([...ripplesRef.current]);

      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(() => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const updatedRipples = ripplesRef.current.filter((ripple) => ripple.opacity > 0);

          updatedRipples.forEach((ripple) => {
            ripple.radius += 3;
            ripple.opacity = Math.max(0, 1 - ripple.radius / ripple.maxRadius);

            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(34, 211, 238, ${ripple.opacity * 0.8})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = `rgba(34, 211, 238, ${ripple.opacity * 0.15})`;
            ctx.fill();
          });

          ripplesRef.current = updatedRipples;

          if (updatedRipples.length > 0) {
            animationRef.current = requestAnimationFrame(() => {});
          } else {
            animationRef.current = null;
          }
        });
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
    document.addEventListener('click', handleClick);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <>
      {/* Background Container */}
      <div
        ref={containerRef}
        className="fixed inset-0 w-full h-screen pointer-events-none"
        style={{
          backgroundImage: 'url(https://picsum.photos/1920/1080?random=1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
          top: 0,
          left: 0,
        }}
      />

      {/* Canvas for ripple effects */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
        style={{
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
