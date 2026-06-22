import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import heroImg from '../assets/foto_ejemplo_hero.jpg';

const chapters = [
  {
    eyebrow: '01 — Examinamos',
    title: 'Diagnosticamos tu visión con la mejor tecnología.',
    description: 'Examen visual completo: agudeza, salud ocular y fondo de ojo en un mismo turno.',
  },
  {
    eyebrow: '02 — Asesoramos',
    title: 'Encontramos los anteojos que reflejan quién sos.',
    description: 'Más de 30 marcas, prueba sin compromiso y asesoramiento personalizado de principio a fin.',
  },
  {
    eyebrow: '03 — Diseñamos',
    title: 'Cristales hechos a tu medida.',
    description: 'Progresivos, polarizados y antirreflejo de las mejores marcas, calibrados a tu uso diario.',
  },
];

type Range = [number, number, number, number];

const chapterRanges: Range[] = [
  [0.00, 0.05, 0.28, 0.35],
  [0.32, 0.40, 0.60, 0.68],
  [0.65, 0.72, 0.95, 1.00],
];

const Chapter: React.FC<{
  chapter: typeof chapters[number];
  range: Range;
  scrollYProgress: MotionValue<number>;
}> = ({ chapter, range, scrollYProgress }) => {
  const opacity = useTransform(scrollYProgress, range, [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, range, [40, 0, 0, -40]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="px-6 md:px-16 max-w-7xl mx-auto w-full">
        <span className="block text-accent text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-6 drop-shadow-lg">
          {chapter.eyebrow}
        </span>
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 max-w-4xl drop-shadow-lg tracking-tight leading-[1.05]">
          {chapter.title}
        </h2>
        <p className="text-lg md:text-2xl text-light max-w-xl drop-shadow-md font-light leading-relaxed">
          {chapter.description}
        </p>
      </div>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0 z-0 origin-center">
          <img
            src={heroImg}
            alt="Next Ópticas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent"></div>
        </motion.div>

        <div className="relative z-10 h-full w-full pt-20">
          {chapters.map((chapter, idx) => (
            <Chapter
              key={idx}
              chapter={chapter}
              range={chapterRanges[idx]}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <div className="absolute bottom-10 md:bottom-14 left-0 right-0 z-20 pointer-events-none">
          <div className="px-6 md:px-16 max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full max-w-md">
              <div className="flex-1 h-px bg-white/25 relative overflow-hidden rounded-full">
                <motion.div
                  style={{ scaleX: progressScaleX, transformOrigin: 'left' }}
                  className="absolute inset-0 bg-accent rounded-full"
                />
              </div>
              <span className="text-white/70 text-xs font-medium tracking-widest uppercase whitespace-nowrap">
                {chapters.map((_, i) => (
                  <ChapterCounter key={i} index={i} scrollYProgress={scrollYProgress} total={chapters.length} />
                ))}
              </span>
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

const ChapterCounter: React.FC<{
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}> = ({ index, total, scrollYProgress }) => {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start - 0.01, start, end, end + 0.01], [0, 1, 1, 0]);
  return (
    <motion.span style={{ opacity }} className="absolute">
      {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </motion.span>
  );
};
