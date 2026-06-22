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

// WAAPI exige que los offsets estén dentro de [0,1] y sean monotonically
// non-decreasing. Por eso el primer chapter arranca visible (sin fade-in) y
// el último termina visible (sin fade-out): cada uno usa su propio array de
// keyframes.
// Plateaus largos para dar tiempo de lectura (≈ 30/24/30% del scroll cada uno),
// con fades cortos (≈ 5%) entre chapters. Todo dentro de [0,1] (WAAPI).
const chapterTransforms: {
  opacityRange: number[];
  opacityOutput: number[];
  yRange: number[];
  yOutput: number[];
}[] = [
  {
    opacityRange: [0, 0.30, 0.35],
    opacityOutput: [1, 1, 0],
    yRange: [0, 0.30, 0.35],
    yOutput: [0, 0, -40],
  },
  {
    opacityRange: [0.35, 0.40, 0.62, 0.67],
    opacityOutput: [0, 1, 1, 0],
    yRange: [0.35, 0.40, 0.62, 0.67],
    yOutput: [40, 0, 0, -40],
  },
  {
    opacityRange: [0.67, 0.72, 1],
    opacityOutput: [0, 1, 1],
    yRange: [0.67, 0.72, 1],
    yOutput: [40, 0, 0],
  },
];

const Chapter: React.FC<{
  chapter: typeof chapters[number];
  transforms: typeof chapterTransforms[number];
  scrollYProgress: MotionValue<number>;
}> = ({ chapter, transforms, scrollYProgress }) => {
  const opacity = useTransform(scrollYProgress, transforms.opacityRange, transforms.opacityOutput);
  const y = useTransform(scrollYProgress, transforms.yRange, transforms.yOutput);

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

export const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative h-[500vh]">
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
              transforms={chapterTransforms[idx]}
              scrollYProgress={scrollYProgress}
            />
          ))}
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
