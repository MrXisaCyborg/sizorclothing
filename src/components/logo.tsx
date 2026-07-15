import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/theme-context';
import logoMark from '@/assets/sizor-logo-v2.png';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = logoMark;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // 1. Remove black background (if any)
        if (r < 30 && g < 30 && b < 30) {
          data[i + 3] = 0; // Make transparent
          continue;
        }

        // 2. In light mode, turn white text to black
        if (theme === 'light') {
          // White text has high values for all.
          // Target pixels with high blue (white text) and change them to ink (#0A0A0B).
          // The green Z has low blue.
          if (a > 0 && b > 150) {
            data[i] = 10;     // R
            data[i + 1] = 10; // G
            data[i + 2] = 11; // B
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className={className} />;
}
