import React, { useRef } from 'react';
import {
  cubicBezier,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { DottedBackground } from './DottedBackground';
import { EyeIcon, GlassesIcon, SunglassesIcon, ContactLensIcon } from './icons';
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
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    number: '01',
    title: 'Examen visual',
    description: 'Diagnóstico completo de tu salud visual con tecnología de última generación. Agudeza, fondo de ojo y presión intraocular en un mismo turno.',
    image: examenVisualImg,
    alt: 'Examen visual',
    icon: <EyeIcon className="text-primary" size={26} />,
  },
  {
    number: '02',
    title: 'Anteojos recetados',
    description: 'Diseños exclusivos que combinan estilo y precisión óptica. Te asesoramos para que encuentres el armazón que mejor te queda.',
    image: anteojosRecetaImg,
    alt: 'Anteojos recetados',
    icon: <GlassesIcon className="text-primary" size={26} />,
  },
  {
    number: '03',
    title: 'Anteojos de sol',
    description: 'Protección UV total y diseño premium de las mejores marcas. Cuidá tus ojos sin renunciar al estilo.',
    image: gafasSolImg,
    alt: 'Anteojos de sol',
    icon: <SunglassesIcon className="text-primary" size={26} />,
  },
  {
    number: '04',
    title: 'Lentes de contacto',
    description: 'Adaptación personalizada para una visión nítida sin armazón. Materiales premium y comodidad durante todo el día.',
    image: lentesContactoImg,
    alt: 'Lentes de contacto',
    icon: <ContactLensIcon className="text-primary" size={26} />,
  },
];

export const Services: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Patrón plateau-transition: cada slide queda quieto buena parte del scroll
  // y la transición al siguiente es corta y suave (cubic-bezier easeInOut).
  // Da sensación de permanencia sin perder fluidez.
  const trackY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.28, 0.44, 0.54, 0.70, 0.80, 1],
    ['0%', '0%', '-100%', '-100%', '-200%', '-200%', '-300%', '-300%'],
    { ease: cubicBezier(0.65, 0, 0.35, 1) }
  );

  // Mask gradient: difumina los bordes superior e inferior del slider para
  // que el contenido se "diluya" al entrar/salir, sin tocar la opacity.
  const maskStyle = {
    WebkitMaskImage:
      'linear-gradient(to bottom, transparent 0%, black 9%, black 91%, transparent 100%)',
    maskImage:
      'linear-gradient(to bottom, transparent 0%, black 9%, black 91%, transparent 100%)',
  };

  return (
    <section id="servicios" ref={ref} className="relative bg-[#eaeaf0] h-[450vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <DottedBackground colorR={255} colorG={255} colorB={255} baseAlpha={0.45} maxAlpha={1} />

        <div className="relative z-10 h-full flex flex-col">

          {/* Texto fijo centrado arriba */}
          <div className="pt-32 md:pt-36 text-center px-6 shrink-0">
            <h2 className="text-accent font-semibold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">
              Servicios
            </h2>
            <h3 className="text-5xl md:text-7xl font-light text-primary leading-[1.05] tracking-tight">
              Soluciones para cada necesidad visual
            </h3>
          </div>

          {/* Slider vertical (scroll-driven, continuo) */}
          <div className="flex-1 relative overflow-hidden" style={maskStyle}>
            <motion.div
              style={{ y: trackY }}
              className="absolute inset-0 flex flex-col"
            >
              {services.map((service, idx) => {
                return (
                  <div
                    key={idx}
                    className="shrink-0 h-full flex items-center px-6 md:px-16"
                  >
                    <div className="w-full max-w-5xl mx-auto">
                      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center justify-between">
                        
                        {/* Lado Izquierdo: Placeholder de Imagen (opaco) */}
                        <div className="w-full md:w-[48%] aspect-[4/3] rounded-[24px] md:rounded-[32px] overflow-hidden bg-zinc-300 shadow-lg border border-white/50 shrink-0 transition-transform duration-300 ease-out hover:scale-[1.02]" />

                        {/* Lado Derecho: Contenido de Texto */}
                        <div className="w-full md:w-[48%] flex flex-col items-start text-left">
                          {/* Cabecera con Círculo + Textos */}
                          <div className="flex items-center gap-5 mb-6">
                            {/* Círculo Blanco con Ícono */}
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100/50 shrink-0 transition-transform duration-300 hover:scale-105">
                              {service.icon}
                            </div>
                            
                            {/* Número + Título */}
                            <div className="flex flex-col">
                              <span className="text-accent text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
                                {service.number} / {String(services.length).padStart(2, '0')}
                              </span>
                              <h4 className="text-3xl md:text-5xl font-light text-primary tracking-tight mt-1">
                                {service.title}
                              </h4>
                            </div>
                          </div>

                          {/* Descripción */}
                          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-md">
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
    <div className="w-10 md:w-14 h-[3px] bg-primary/15 rounded-full overflow-hidden">
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="h-full bg-primary rounded-full"
      />
    </div>
  );
};
