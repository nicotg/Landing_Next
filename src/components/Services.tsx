import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { DottedBackground } from './DottedBackground';
import examenVisualImg from '../assets/services/examen-visual.png';
import anteojosRecetaImg from '../assets/services/anteojos-receta.png';
import lentesContactoImg from '../assets/services/lentes-contacto.png';
import gafasSolImg from '../assets/services/gafas-sol.png';

type Service = {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const services: Service[] = [
  {
    number: '01',
    title: 'Examen Visual',
    description: 'Diagnóstico completo de tu salud visual con tecnología de última generación. Agudeza, fondo de ojo y presión intraocular en un mismo turno.',
    image: examenVisualImg,
    alt: 'Lentes de prueba para examen visual',
  },
  {
    number: '02',
    title: 'Anteojos de Receta',
    description: 'Diseños exclusivos que combinan estilo y precisión óptica. Te asesoramos para que encuentres el armazón que mejor te queda.',
    image: anteojosRecetaImg,
    alt: 'Anteojos de receta',
  },
  {
    number: '03',
    title: 'Lentes de Contacto',
    description: 'Adaptación personalizada para una visión nítida sin armazón. Materiales premium y comodidad durante todo el día.',
    image: lentesContactoImg,
    alt: 'Lente de contacto',
  },
  {
    number: '04',
    title: 'Gafas de Sol',
    description: 'Protección UV total y diseño premium de las mejores marcas. Cuidá tus ojos sin renunciar al estilo.',
    image: gafasSolImg,
    alt: 'Gafas de sol',
  },
];

export const Services: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // El track se traslada continuamente con el scroll. Cada slide ocupa 100%
  // de la altura del slider area, así que para mostrar el último hay que
  // mover -(N-1) * 100%. Eso da la sensación de "scroll real" sin opacity.
  const trackY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(services.length - 1) * 100}%`]
  );

  return (
    <section id="servicios" ref={ref} className="relative bg-dark h-[700vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <DottedBackground />

        <div className="relative z-10 h-full flex flex-col">

          {/* Texto fijo centrado arriba */}
          <div className="pt-24 md:pt-28 text-center px-6 shrink-0">
            <h2 className="text-accent font-semibold tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
              Especialidades
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight">
              ¿Qué Ofrecemos?
            </h3>
          </div>

          {/* Slider vertical (scroll-driven, continuo) */}
          <div className="flex-1 relative overflow-hidden">
            <motion.div
              style={{ y: trackY }}
              className="absolute inset-0 flex flex-col"
            >
              {services.map((service, idx) => {
                const isRight = idx % 2 === 1;
                const blockAlign = isRight ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0';
                const textAlign = isRight ? 'md:text-right' : 'md:text-left';
                const rowDirection = isRight ? 'md:flex-row-reverse' : 'md:flex-row';

                return (
                  <div
                    key={idx}
                    className="shrink-0 h-full flex items-center px-6 md:px-16"
                  >
                    <div className="w-full max-w-6xl mx-auto">
                      <div className={`max-w-3xl mx-auto text-center ${blockAlign} ${textAlign}`}>
                        {/* Título del servicio */}
                        <div className="mb-8 md:mb-10">
                          <div className="inline-block transition-transform duration-300 ease-out hover:scale-105">
                            <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3 block">
                              {service.number} / {String(services.length).padStart(2, '0')}
                            </span>
                            <h4 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                              {service.title}
                            </h4>
                          </div>
                        </div>

                        {/* Silueta + descripción */}
                        <div className={`flex flex-col ${rowDirection} gap-6 md:gap-10 items-center`}>
                          <div className="shrink-0 transition-transform duration-300 ease-out hover:scale-110">
                            <img
                              src={service.image}
                              alt={service.alt}
                              className="w-[160px] h-[160px] md:w-[240px] md:h-[240px] object-contain drop-shadow-[0_0_30px_rgba(145,209,242,0.35)]"
                            />
                          </div>
                          <p className="text-base md:text-lg text-light/70 font-light leading-relaxed max-w-md transition-transform duration-300 ease-out hover:scale-105">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Dots de progreso abajo (fijos) */}
          <div className="pb-10 px-6 shrink-0">
            <div className="flex items-center justify-center gap-2">
              {services.map((_, i) => (
                <ServiceDot
                  key={i}
                  index={i}
                  total={services.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const ServiceDot: React.FC<{
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}> = ({ index, total, scrollYProgress }) => {
  const start = index / total;
  const end = (index + 1) / total;
  const scaleX = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });
  return (
    <div className="w-10 md:w-14 h-[3px] bg-white/15 rounded-full overflow-hidden">
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="h-full bg-accent rounded-full"
      />
    </div>
  );
};
