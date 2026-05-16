"use client";

import { useEffect, useRef } from "react";

export default function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fade: number;
      color: string;
    }[] = [];

    const colors = ["#c084fc", "#a855f7", "#ffffff", "#e879f9", "#818cf8"];

    function spawnParticle() {
      particles.push({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        size: Math.floor(Math.random() * 3 + 1) * 3,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        fade: Math.random() * 0.008 + 0.002,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    for (let i = 0; i < 60; i++) spawnParticle();

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        ctx!.globalAlpha = p.opacity;
        ctx!.fillStyle = p.color;
        ctx!.fillRect(p.x, p.y, p.size, p.size);

        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity -= p.fade;

        if (p.opacity <= 0) {
          particles.splice(i, 1);
          spawnParticle();
        }
      }

      ctx!.globalAlpha = 1;
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="pixel-bg" />;
}