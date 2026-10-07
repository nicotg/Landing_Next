import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useChapterScroll } from '../hooks/useChapterScroll';
import heroImg from '../assets/services/img-Hero.webp';

type Align = 'left' | 'right';

type ChapterData = {
  eyebrow: string;
  title: string;
  description: string;
  align: Align;
};

const chapters: ChapterData[] = [
  {
    eyebrow: '01 - EXAMINAMOS',
    title: 'Diagnosticamos tu visión con la mejor tecnología.',
    description: 'Examen visual completo: agudeza, salud ocular y fondo de ojo en un mismo turno.',
    align: 'left',
  },
  {
    eyebrow: '02 - ASESORAMOS',
    title: 'Encontramos los anteojos que reflejan quién sos.',
    description: 'Más de 30 marcas, prueba sin compromiso y asesoramiento personalizado de principio a fin.',
    align: 'left',
  },
  {
    eyebrow: '03 - DISEÑAMOS',
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
    setActiveIdx(Math.round(latest * (chapters.length - 1)));
  });

  useChapterScroll(ref, chapters.length, { reachBelow: false });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const blockAlign = 'mr-auto';
  const textAlign = 'text-left';

  return (
    <section id="hero" ref={ref} className="relative h-[300vh]">
      {/* El diseño del hero no tiene lugar para un titular fijo, pero la página
          necesita un H1 único con la propuesta de valor y la ubicación. */}
      <h1 className="sr-only">
        Next Ópticas — Óptica en Córdoba, Cerro de las Rosas: examen visual,
        anteojos recetados y de sol, y lentes de contacto
      </h1>

      <div className="sticky top-0 h-dvh md:h-screen overflow-hidden">
        {/* Fondo con imagen y gradiente azul que llega hasta la derecha */}
        <motion.div style={{ scale: imageScale }} className="absolute inset-0 z-0 origin-center">
          <img
            src={heroImg}
            alt="Pared exhibidora con anteojos de sol y armazones recetados"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-primary/25 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/92 to-primary/65"></div>
        </motion.div>

        <div className="relative z-20 h-full w-full pt-16 md:pt-32 flex items-center">
          {/* Los tres capítulos se renderizan siempre y se apilan en la misma
              celda del grid. Antes AnimatePresence montaba solo el activo, así
              que el prerender capturaba uno de tres y los otros dos no existían
              para los crawlers. El grid evita posicionarlos absolutos: la celda
              toma la altura del más alto y el centrado vertical sigue igual. */}
          <div className="grid w-full px-6 md:px-16 max-w-7xl mx-auto">
            {chapters.map((c, i) => {
              const activo = i === activeIdx;
              return (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{ opacity: activo ? 1 : 0, y: activo ? 0 : i < activeIdx ? -40 : 40 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden={!activo}
                  style={{ pointerEvents: activo ? 'auto' : 'none' }}
                  className={`col-start-1 row-start-1 max-w-3xl ${blockAlign} ${textAlign}`}
                >
                  <span className="block text-accent text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-4 md:mb-6 drop-shadow-lg">
                    {c.eyebrow}
                  </span>
                  <h2 className="text-[length:clamp(1.875rem,8.5vw,2.75rem)] md:text-7xl font-light text-white mb-4 md:mb-6 drop-shadow-lg tracking-tight leading-[1.05]">
                    {c.title}
                  </h2>
                  <p
                    className="text-base sm:text-lg md:text-2xl text-light max-w-xl drop-shadow-md font-light leading-relaxed"
                  >
                    {c.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-10 md:bottom-14 left-0 right-0 z-20 pointer-events-none">
          <div className="px-6 md:px-16 max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div className="hidden md:flex items-center gap-2">
              {chapters.map((_, i) => (
                <ChapterDot key={i} active={i <= activeIdx} />
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

const ChapterDot: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="w-10 md:w-16 h-[3px] bg-white/25 rounded-full overflow-hidden">
    <motion.div
      initial={false}
      animate={{ scaleX: active ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'left' }}
      className="h-full bg-accent rounded-full"
    />
  </div>
);
