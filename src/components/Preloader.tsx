import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";

export function Preloader({ onComplete, onStartExit }: { onComplete: () => void, onStartExit?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Progress logic
  useEffect(() => {
    const duration = 1800; // 1.8 seconds total for progress
    const startTime = performance.now();

    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const nextProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Start exit animation
        setIsExiting(true);
        if (onStartExit) onStartExit();
        setTimeout(() => {
          onComplete();
        }, 500); // Wait for exit animation to finish
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  // Canvas Particles logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
    }

    const particles: Particle[] = [];
    const numParticles = Math.floor((width * height) / 15000); // density

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.5 + 0.1,
      });
    }

    const maxDistance = 120;
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isExiting) {
          // Collapse towards center
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          p.x += dx * 0.1;
          p.y += dy * 0.1;
          p.baseAlpha *= 0.9; // fade out
        } else {
          // Normal drift
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198, 255, 61, ${p.baseAlpha})`;
        ctx.fill();

        if (!isExiting) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              const opacity = (1 - dist / maxDistance) * 0.2;
              ctx.strokeStyle = `rgba(198, 255, 61, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isExiting]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-ink transition-opacity duration-500 ease-in-out ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="grain absolute inset-0 opacity-50 mix-blend-overlay"></div>
      
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full grain transition-transform duration-500 ease-in-out ${
          isExiting ? "scale-50 opacity-0" : "scale-100 opacity-100"
        }`}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="animate-hero-glitch-in mb-4">
          <Logo className="h-16 md:h-24 w-auto" />
        </div>
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="text-acid font-mono text-xs tracking-widest">
            {Math.floor(progress)}%
          </div>
          <div className="w-48 h-[1px] bg-line relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-acid"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="label-xs text-bone/30 mt-2">SYS.INIT_</div>
        </div>
      </div>
    </div>
  );
}
