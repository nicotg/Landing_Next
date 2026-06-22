import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import heroImg from '../assets/foto_ejemplo_hero.jpg';

type Align = 'left' | 'right';

type ChapterData = {
  eyebrow: string;
  title: string;
  description: string;
  align: Align;
};

const chapters: ChapterData[] = [
  {
    eyebrow: '01 — Examinamos',
    title: 'Diagnosticamos tu visión con la mejor tecnología.',
    description: 'Examen visual completo: agudeza, salud ocular y fondo de ojo en un mismo turno.',
    align: 'left',
  },
  {
    eyebrow: '02 — Asesoramos',
    title: 'Encontramos los anteojos que reflejan quién sos.',
    description: 'Más de 30 marcas, prueba sin compromiso y asesoramiento personalizado de principio a fin.',
    align: 'right',
  },
  {
    eyebrow: '03 — Diseñamos',
    title: 'Cristales hechos a tu medida.',
    description: 'Progresivos, polarizados y antirreflejo de las mejores marcas, calibrados a tu uso diario.',
    align: 'left',
  },
];

export const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const [activeIdx, setActiveIdx] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(chapters.length - 1, Math.max(0, Math.floor(latest * chapters.length)));
    setActiveIdx(idx);
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const chapter = chapters[activeIdx];
  const blockAlign = chapter.align === 'right' ? 'ml-auto' : 'mr-auto';
  const textAlign = chapter.align === 'right' ? 'text-right' : 'text-left';

  return (
    <section id="hero" ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0 z-0 origin-center">
          <img
            src={heroImg}
            alt="Next Ópticas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark/85 via-dark/55 to-dark/85"></div>
        </motion.div>

        <div className="relative z-10 h-full w-full pt-20 flex items-center">
          <div className="w-full px-6 md:px-16 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`max-w-3xl ${blockAlign} ${textAlign}`}
              >
                <span className="block text-accent text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-6 drop-shadow-lg">
                  {chapter.eyebrow}
                </span>
                <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg tracking-tight leading-[1.05]">
                  {chapter.title}
                </h2>
                <p
                  className={`text-lg md:text-2xl text-light max-w-xl drop-shadow-md font-light leading-relaxed ${
                    chapter.align === 'right' ? 'ml-auto' : ''
                  }`}
                >
                  {chapter.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute bottom-10 md:bottom-14 left-0 right-0 z-20 pointer-events-none">
          <div className="px-6 md:px-16 max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              {chapters.map((_, i) => (
                <ChapterDot
                  key={i}
                  index={i}
                  total={chapters.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
            <motion.span
              style={{ opacity: hintOpacity }}
              className="hidden md:inline text-white/60 text-xs font-medium tracking-[0.3em] uppercase"
            >
              Scroll para descubrir ↓
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
};

const ChapterDot: React.FC<{
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}> = ({ index, total, scrollYProgress }) => {
  const start = index / total;
  const end = (index + 1) / total;
  const scaleX = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });
  return (
    <div className="w-10 md:w-16 h-[3px] bg-white/25 rounded-full overflow-hidden">
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="h-full bg-accent rounded-full"
      />
    </div>
  );
};
