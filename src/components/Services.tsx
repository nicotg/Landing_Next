import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { DottedBackground } from './DottedBackground';
import { EyeIcon, GlassesIcon, SunglassesIcon, ContactLensIcon } from './icons';
import examenVisualImg from '../assets/services/img-Destacado-ExamenVisual.webp';
import lentesRecetadosImg from '../assets/services/img-Destacado-LentesRecetados.webp';
import lentesSolImg from '../assets/services/img-Destacado-LentesSol.webp';
import lentesContactoImg from '../assets/services/img-Destacado-LentesContacto.webp';

type Service = {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  alt: string;
};

const services: Service[] = [
  {
    number: '01',
    title: 'Examen visual',
    description: 'Diagnóstico completo de tu salud visual con tecnología de última generación. Agudeza, fondo de ojo y presión intraocular en un mismo turno.',
    icon: <EyeIcon className="text-primary" size={26} />,
    image: examenVisualImg,
    alt: 'Examen visual con tecnología óptica',
  },
  {
    number: '02',
    title: 'Anteojos recetados',
    description: 'Diseños exclusivos que combinan estilo y precisión óptica. Te asesoramos para que encuentres el armazón que mejor te queda.',
    icon: <GlassesIcon className="text-primary" size={26} />,
    image: lentesRecetadosImg,
    alt: 'Persona usando anteojos recetados',
  },
  {
    number: '03',
    title: 'Anteojos de sol',
    description: 'Protección UV total y diseño premium de las mejores marcas. Cuidá tus ojos sin renunciar al estilo.',
    icon: <SunglassesIcon className="text-primary" size={26} />,
    image: lentesSolImg,
    alt: 'Persona usando anteojos de sol',
  },
  {
    number: '04',
    title: 'Lentes de contacto',
    description: 'Adaptación personalizada para una visión nítida sin armazón. Materiales premium y comodidad durante todo el día.',
    icon: <ContactLensIcon className="text-primary" size={26} />,
    image: lentesContactoImg,
    alt: 'Lentes de contacto',
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
    const idx = Math.min(services.length - 1, Math.max(0, Math.floor(latest * services.length)));
    setActiveIdx(idx);
  });

  // Mask gradient: difumina los bordes superior e inferior del slider para
  // que el contenido se "diluya" al entrar/salir, sin tocar la opacity.
  const maskStyle = {
    WebkitMaskImage:
      'linear-gradient(to bottom, transparent 0%, black 9%, black 91%, transparent 100%)',
    maskImage:
      'linear-gradient(to bottom, transparent 0%, black 9%, black 91%, transparent 100%)',
  };

  return (
    <section id="servicios" ref={ref} className="relative bg-[#eaeaf0] h-[280vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <DottedBackground colorR={255} colorG={255} colorB={255} baseAlpha={0.45} maxAlpha={1} />

        <div className="relative z-10 h-full flex flex-col">

          {/* Texto fijo centrado arriba */}
          <div className="pt-32 md:pt-36 text-center px-6 shrink-0">
            {/* Era un h2 y ahora es un p (el título real de la sección es el h2).
                font-display se declara a mano porque index.css solo la aplica a h1-h6. */}
            <p className="font-display text-accent font-semibold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">
              Servicios
            </p>
            <h2 className="text-5xl md:text-7xl font-light text-primary leading-[1.05] tracking-tight">
              Soluciones para cada necesidad visual
            </h2>
          </div>

          {/* Slider vertical (animación de velocidad constante) */}
          <div className="flex-1 relative overflow-hidden" style={maskStyle}>
            <motion.div
              animate={{ y: `-${activeIdx * 100}%` }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
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
                        
                        {/* Lado Izquierdo: Imagen del servicio */}
                        <div className="w-full md:w-[48%] aspect-[4/3] rounded-[24px] md:rounded-[32px] overflow-hidden bg-zinc-200 shadow-lg border border-white/50 shrink-0 transition-transform duration-300 ease-out hover:scale-[1.02]">
                          <img
                            src={service.image}
                            alt={service.alt}
                            loading={idx === 0 ? 'eager' : 'lazy'}
                            className="w-full h-full object-cover"
                          />
                        </div>

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
                              <h3 className="text-3xl md:text-5xl font-light text-primary tracking-tight mt-1">
                                {service.title}
                              </h3>
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
                  isActive={i === activeIdx}
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
  isActive: boolean;
}> = ({ index, isActive }) => {
  return (
    <div className="w-10 md:w-14 h-[3px] bg-primary/15 rounded-full overflow-hidden">
      <motion.div
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
        className="h-full bg-primary rounded-full"
      />
    </div>
  );
};
