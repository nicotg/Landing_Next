import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { EyeIcon, GlassesIcon, LensIcon, SunIcon } from './icons';
import { DottedBackground } from './DottedBackground';

type IconComponent = React.FC<{ size?: number; className?: string }>;

type Service = {
  number: string;
  title: string;
  description: string;
  Icon: IconComponent;
};

const services: Service[] = [
  {
    number: '01',
    title: 'Examen Visual',
    description: 'Diagnóstico completo de tu salud visual con tecnología de última generación. Agudeza, fondo de ojo y presión intraocular en un mismo turno.',
    Icon: EyeIcon,
  },
  {
    number: '02',
    title: 'Anteojos de Receta',
    description: 'Diseños exclusivos que combinan estilo y precisión óptica. Te asesoramos para que encuentres el armazón que mejor te queda.',
    Icon: GlassesIcon,
  },
  {
    number: '03',
    title: 'Lentes de Contacto',
    description: 'Adaptación personalizada para una visión nítida sin armazón. Materiales premium y comodidad durante todo el día.',
    Icon: LensIcon,
  },
  {
    number: '04',
    title: 'Gafas de Sol',
    description: 'Protección UV total y diseño premium de las mejores marcas. Cuidá tus ojos sin renunciar al estilo.',
    Icon: SunIcon,
  },
];

export const Services: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const [activeIdx, setActiveIdx] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(
      services.length - 1,
      Math.max(0, Math.floor(latest * services.length))
    );
    setActiveIdx(idx);
  });

  const service = services[activeIdx];
  const Icon = service.Icon;
  const isRight = activeIdx % 2 === 1;
  const blockAlign = isRight ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0';
  const textAlign = isRight ? 'md:text-right' : 'md:text-left';
  const rowDirection = isRight ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <section id="servicios" ref={ref} className="relative bg-dark h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <DottedBackground />

        <div className="relative z-10 h-full flex flex-col">

          {/* Texto fijo centrado arriba */}
          <div className="pt-24 md:pt-28 text-center px-6">
            <h2 className="text-accent font-semibold tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
              Especialidades
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight">
              ¿Qué Ofrecemos?
            </h3>
          </div>

          {/* Servicio activo */}
          <div className="flex-1 flex items-center px-6 md:px-16">
            <div className="w-full max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={`max-w-3xl mx-auto text-center ${blockAlign} ${textAlign}`}
                >
                  {/* Título del servicio (arriba) */}
                  <div className="mb-8 md:mb-10">
                    <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3 block">
                      {service.number} / {String(services.length).padStart(2, '0')}
                    </span>
                    <h4 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                      {service.title}
                    </h4>
                  </div>

                  {/* Silueta + descripción lado a lado (silueta queda hacia el borde exterior) */}
                  <div className={`flex flex-col ${rowDirection} gap-6 md:gap-10 items-center`}>
                    <div className="shrink-0 text-accent/85">
                      {/* Placeholder de silueta - reemplazar por <img src={service.image} /> cuando estén los PNGs */}
                      <Icon className="w-[140px] h-[140px] md:w-[200px] md:h-[200px]" />
                    </div>
                    <p className="text-base md:text-lg text-light/70 font-light leading-relaxed max-w-md">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots de progreso abajo */}
          <div className="pb-10 px-6">
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
