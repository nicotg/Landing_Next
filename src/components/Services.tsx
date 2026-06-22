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

  return (
    <section id="servicios" ref={ref} className="relative bg-white h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Texto fijo */}
          <div>
            <h2 className="text-primary font-semibold tracking-[0.3em] uppercase text-sm mb-5">
              Especialidades
            </h2>
            <h3 className="text-5xl md:text-7xl font-bold text-dark leading-[1.05] tracking-tight">
              ¿Qué<br />Ofrecemos?
            </h3>
            <p className="text-gray-500 mt-6 max-w-md font-light leading-relaxed">
              Cuatro servicios para cuidar tu visión de principio a fin.
            </p>
            <div className="flex items-center gap-2 mt-10">
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

          {/* Servicio activo */}
          <div className="relative min-h-[440px] md:min-h-[560px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
              >
                {/* Placeholder de silueta - reemplazar por <img src="..." /> cuando estén los PNGs */}
                <div className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] flex items-center justify-center mb-8 text-primary/85">
                  <Icon size={280} className="w-full h-full" />
                </div>
                <span className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-3">
                  {service.number} / {String(services.length).padStart(2, '0')}
                </span>
                <h4 className="text-3xl md:text-5xl font-bold text-dark mb-4 tracking-tight">
                  {service.title}
                </h4>
                <p className="text-lg text-gray-600 font-light max-w-md leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </AnimatePresence>
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
    <div className="w-10 md:w-14 h-[3px] bg-light rounded-full overflow-hidden">
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="h-full bg-primary rounded-full"
      />
    </div>
  );
};
