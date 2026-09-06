import React, { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  twinkleAmp: number;
  parallaxFactor: number;
}

interface LayerConfig {
  count: number;
  minSize: number;
  maxSize: number;
  minOpacity: number;
  maxOpacity: number;
  parallaxFactor: number;
  hasTwinkle: boolean;
  twinkleAmp: number;
}

const DESKTOP_LAYERS: LayerConfig[] = [
  // Distant — static, very faint
  {
    count: 260,
    minSize: 0.35,
    maxSize: 0.85,
    minOpacity: 0.12,
    maxOpacity: 0.42,
    parallaxFactor: 0.018,
    hasTwinkle: false,
    twinkleAmp: 0,
  },
  // Mid — slow twinkle
  {
    count: 140,
    minSize: 0.75,
    maxSize: 1.4,
    minOpacity: 0.32,
    maxOpacity: 0.72,
    parallaxFactor: 0.065,
    hasTwinkle: true,
    twinkleAmp: 0.1,
  },
  // Near — clearer, more active
  {
    count: 55,
    minSize: 1.1,
    maxSize: 2.0,
    minOpacity: 0.58,
    maxOpacity: 0.95,
    parallaxFactor: 0.15,
    hasTwinkle: true,
    twinkleAmp: 0.2,
  },
];

const MOBILE_LAYERS: LayerConfig[] = [
  {
    count: 130,
    minSize: 0.3,
    maxSize: 0.8,
    minOpacity: 0.1,
    maxOpacity: 0.38,
    parallaxFactor: 0.01,
    hasTwinkle: false,
    twinkleAmp: 0,
  },
  {
    count: 65,
    minSize: 0.65,
    maxSize: 1.2,
    minOpacity: 0.28,
    maxOpacity: 0.65,
    parallaxFactor: 0.035,
    hasTwinkle: true,
    twinkleAmp: 0.08,
  },
];

function generateLayer(cfg: LayerConfig, w: number, h: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < cfg.count; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: cfg.minSize + Math.random() * (cfg.maxSize - cfg.minSize),
      baseOpacity:
        cfg.minOpacity + Math.random() * (cfg.maxOpacity - cfg.minOpacity),
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.00035 + Math.random() * 0.0007,
      twinkleAmp: cfg.hasTwinkle ? cfg.twinkleAmp : 0,
      parallaxFactor: cfg.parallaxFactor,
    });
  }
  return stars;
}

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[][]>([]);
  const rafRef = useRef<number>(0);
  const isMobile = useRef(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isMobile.current = window.matchMedia('(max-width: 768px)').matches;
    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const layers = isMobile.current ? MOBILE_LAYERS : DESKTOP_LAYERS;
      starsRef.current = layers.map((cfg) =>
        generateLayer(cfg, canvas.width, canvas.height)
      );
    };

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollY = reducedMotion.current
        ? 0
        : parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
              '--scroll-y'
            ) || '0'
          );

      for (const layer of starsRef.current) {
        for (const s of layer) {
          const twinkle =
            s.twinkleAmp > 0 && !reducedMotion.current
              ? Math.sin(ts * s.twinkleSpeed + s.twinklePhase) * s.twinkleAmp
              : 0;

          const op = Math.max(0, Math.min(1, s.baseOpacity + twinkle));
          const parallax = reducedMotion.current ? 0 : scrollY * s.parallaxFactor;
          const y =
            ((s.y - parallax) % canvas.height + canvas.height) % canvas.height;

          ctx.beginPath();
          ctx.arc(s.x, y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${op})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    setup();
    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => {
      isMobile.current = window.matchMedia('(max-width: 768px)').matches;
      setup();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
};
