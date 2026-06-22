import React, { useEffect, useRef } from 'react';

const SPACING = 36;
const INFLUENCE_RADIUS = 180;
const BASE_SIZE = 1.4;
const MAX_SIZE = 4;
const BASE_ALPHA = 0.18;
const MAX_ALPHA = 0.9;
// Color primary #0033A0 → rgb(0, 51, 160)
const COLOR_R = 0;
const COLOR_G = 51;
const COLOR_B = 160;

type Dot = { baseX: number; baseY: number };

export const DottedBackground: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHover = window.matchMedia('(hover: hover)').matches;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    const target = { x: -10000, y: -10000 };
    const current = { x: -10000, y: -10000 };
    let raf = 0;

    const setup = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      // Capear DPR a 2 para no penalizar performance en pantallas hi-DPI
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const colsCount = Math.ceil(width / SPACING) + 1;
      const rowsCount = Math.ceil(height / SPACING) + 1;
      const offsetX = (width - (colsCount - 1) * SPACING) / 2;
      const offsetY = (height - (rowsCount - 1) * SPACING) / 2;
      for (let c = 0; c < colsCount; c++) {
        for (let r = 0; r < rowsCount; r++) {
          dots.push({
            baseX: offsetX + c * SPACING,
            baseY: offsetY + r * SPACING,
          });
        }
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(${COLOR_R}, ${COLOR_G}, ${COLOR_B}, ${BASE_ALPHA})`;
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.baseX, dot.baseY, BASE_SIZE, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawAnimated = () => {
      ctx.clearRect(0, 0, width, height);

      // Suavizado: el "current" interpola hacia el "target" cada frame
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;

      const r2 = INFLUENCE_RADIUS * INFLUENCE_RADIUS;

      for (const dot of dots) {
        const dx = current.x - dot.baseX;
        const dy = current.y - dot.baseY;
        const d2 = dx * dx + dy * dy;

        let size = BASE_SIZE;
        let alpha = BASE_ALPHA;

        if (d2 < r2) {
          const dist = Math.sqrt(d2);
          const t = 1 - dist / INFLUENCE_RADIUS;
          const eased = t * t;
          size = BASE_SIZE + eased * (MAX_SIZE - BASE_SIZE);
          alpha = BASE_ALPHA + eased * (MAX_ALPHA - BASE_ALPHA);
        }

        ctx.beginPath();
        ctx.arc(dot.baseX, dot.baseY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR_R}, ${COLOR_G}, ${COLOR_B}, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(drawAnimated);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    };

    setup();

    if (hasHover && !reducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
      raf = requestAnimationFrame(drawAnimated);
    } else {
      drawStatic();
    }

    const resizeObserver = new ResizeObserver(() => {
      setup();
      if (!hasHover || reducedMotion) drawStatic();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
};
