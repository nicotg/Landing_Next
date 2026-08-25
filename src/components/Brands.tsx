import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

import logoCustom from '../assets/technologies/Marca-Custom.png';
import logoPolarys from '../assets/technologies/Marca-Polarys.png';
import logoProlayer from '../assets/technologies/Marca-AR-Prolayer.png';
import logoMinux from '../assets/technologies/Marca-AR-Minux.png';
import logoArsion from '../assets/technologies/Marca-AR-Arsion.png';

import imgCustom from '../assets/technologies/custom-portrait.jpg';
import imgPolarys from '../assets/technologies/polarys-portrait.jpg';
import imgProlayer from '../assets/technologies/prolayer-portrait.jpg';
import imgMinux from '../assets/technologies/minux-portrait.jpg';
import imgArsion from '../assets/technologies/arsion-portrait.jpg';

const brands = [
  "Ray-Ban",
  "Oakley",
  "Vulk",
  "Infinit",
  "Rusty",
  "B+D",
  "Armani",
  "Vogue"
];

const brandLogos: Record<string, React.ReactNode> = {
  // Único logo sin texto: es SVG puro, así que sin <title> la marca no existe
  // ni para los lectores de pantalla ni para los buscadores.
  "Ray-Ban": (
    <svg viewBox="0 0 187.09 92.49" className="h-12 md:h-14 w-auto" fill="currentColor" fillRule="evenodd" role="img">
      <title>Ray-Ban</title>
      <path d="M183.51,19.79c-1.99,0-3.6,1.61-3.6,3.58s1.61,3.6,3.6,3.6,3.58-1.61,3.58-3.6-1.6-3.58-3.58-3.58h0ZM183.51,26.53c-1.75,0-3.16-1.41-3.16-3.17s1.41-3.15,3.16-3.15,3.15,1.41,3.15,3.15-1.41,3.17-3.15,3.17h0Z" />
      <path d="M185.35,22.43c0-.34-.15-.7-.45-.86-.3-.18-.64-.2-.98-.2h-1.75v4.01h.49v-1.85h.9l1.15,1.85h.58l-1.21-1.85h0c.71-.02,1.27-.31,1.27-1.1h0ZM183.41,23.14h-.75v-1.42h1.15c.5,0,1.04.08,1.04.7,0,.82-.87.72-1.44.72h0Z" />
      <path d="M63.36,82.55l-23.38-11.42h0c-.51-.27-.78-.95-.77-1.39h0l.06-6.3h0c0-.44.1-.9.68-1.32,2.5-1.59,10.24-5.88,18.24-17.55,10.65-15.55,0-28.61-16.65-25.05-14.79,3.16-29.84,11.16-36.37,15.52C-.65,38.91.16,43.6,0,47.8c.32,1.78.97,1.62,2.42-.16,10.83-10.02,27.32-17.62,30.39-18.91,3.07-1.29,10.34-5.66,18.91-3.72,8.23,1.86,6.23,13.05,3.72,17.78-2.75,5.17-10.59,12.69-14.14,14.55-1.35.71-1.86,0-1.86-1.13h0l.57-24.33h0c0-1.62-.73-2.34-2.34-1.78h0l-2.59,1.29h0c-1.78,1.05-1.7,1.45-1.86,2.75h0l-.39,28.04h0c-.01.61-.3,1.09-.63,1.24h0l-8.44,4.75h0c-1.94.97-1.45,2.42,0,2.91h0l6.79,3.23h0c1.62.65,2.1,1.13,2.1,2.75h0l-.24,13.58h0c6.06-1.21,6.47-4.12,6.63-6.06h0v-4.12h0c.16-.97.73-1.29,1.54-1.13h0l19.72,9.54h0c1.78.81,2.75.48,4.04-1.78,1.29-2.26,1.45-3.39-.97-4.53h0Z" />
      <path d="M97.82,48.3c-2.74,1.58-4.01,4.54-2.93,6.41,1.08,1.87,4.34,2.18,7.08.6,2.74-1.58,3.93-4.46,2.85-6.33-1.08-1.87-4.26-2.26-7-.68h0Z" />
      <path d="M87.71,50.31c-.75.91-2.18,3.68-2.99,5.37-.81,1.7-2.51,5.54-4.2,5.54-1.79,0-2.02-4.45-2.02-6.06s-.97-1.86-1.45-1.78c-.49.08-1.86.57-2.26,2.26-.4,1.7-2.59,9.05-5.01,9.05-1.54,0-2.67-4.45-2.75-5.82-.08-1.37-.73-2.51-2.1-2.51-.97,0-2.18.48-2.67,1.05-.48.57-.57,1.45-3.15.89-2.34-.08-4.61,1.13-7.35,5.74-1.65,2.77-3,7.94-.49,10.02,2.34,1.94,6.47-1.54,7.68-2.99,1.21-1.45,2.26-2.51,2.75-3.31.48-.81.97-.73,1.21.08.24.81,1.62,3.96,3.39,3.88,1.78-.08,4.04-1.45,6.71-6.14.48-.97,1.21-.89,1.37-.08.16.81,1.21,3.48,2.99,3.48s3.59-2.7,4.53-4.28c.65-1.09,1.62-.57,1.62.49s-.49,25.86-.49,25.86c0,1.13.44,1.45,1.25,1.45h3.52c.65,0,1.21-.57,1.21-1.45h0l.73-40.21h0c0-.97-1.09-1.66-2.02-.53h0ZM60.23,66.15c-.73,1.21-2.67,4.45-4.36,3.88-.89-.49.3-3.72.89-4.85.89-1.7,3.49-4.4,4.69-3.72,1.13.65-.48,3.47-1.21,4.69h0Z" />
      <path d="M183.37,41.36c-.32.28-.85.77-2.02.24-2.02-.81-2.18-4.61-3.23-8.08-.94-3.12-3.22-2.93-4.04-1.5h0l-2.47,3.96h0c-.44.81-1.41,2.67-2.38,2.67-1.13,0-.63-1.62-.57-3.23.04-1.09-.65-2.46-1.78-2.46-1.29,0-2.67,1.98-3.72,4.24-.73,1.58-2.63,7.64-5.01,7.64-1.54,0-1.7-4.44-1.78-5.82-.08-1.37-.57-3.07-1.94-3.07-.93,0-1.54.48-2.02,1.05-.48.57-.57,1.05-2.26.81-2.34-.08-6.22,2.1-8.97,6.71-1.65,2.77-3.64,8.59-1.13,10.67,2.34,1.94,6.55-2.59,7.76-4.04,1.21-1.45,2.26-2.51,2.75-3.31.48-.81.97-.73,1.21.08.24.81,1.62,3.96,3.39,3.88,1.78-.08,3.23-.48,5.9-5.17.49-.97,1.37-1.09,1.54-.28.16.81.32,2.95,2.02,2.95,2.91,0,6.21-7.08,7.03-8.73.73-1.45,1.9-1.05,2.3.04.58,1.56,1.09,6.59,4.24,6.59s5.29-3.35,5.94-4.4c.73-1.05.35-2.39-.77-1.41h0ZM149.11,46.21c-.73,1.21-2.34,3.88-4.04,3.31-.89-.49.22-2.83.81-3.96.89-1.7,3.49-4.44,4.69-3.76,1.13.65-.73,3.19-1.45,4.4h0Z" />
      <path d="M133.49,41.97s-6.87-5.01-8.81-7.27c-1.3-1.52-.4-2.67.4-3.31,4.85-3.23,12.45-8.24,15.44-16,2.88-7.48-1.62-13.98-4.85-15.03-4.43-1.44-13.82,1.45-18.51,10.18-3.04,5.65-4.44,7.52-4.85,22.87-.08,2.91-.16,6.22-.16,9.86s-.4,13.5-.81,15.35c-1.54,4.36,3.07,1.78,5.17.08,2.1-1.7,1.94-4.24,1.94-5.33,0-1.37.08-25.62.81-31.03.45-3.37.97-9.62,4.53-15.03,3.56-5.41,7.19-3.23,8.16-2.34.97.89,2.34,3.15,1.62,7.76-1.13,7.15-9.37,14.95-11.48,17.38-2.1,2.42-1.62,4.53-.4,6.22.86,1.21,2.99,3.56,5.17,5.74,2.18,2.18,1.94,4.12,1.62,5.58-1.13,4.36-12.93,16.16-12.93,16.16-2.51,2.67.08,7.03.97,8.49.89,1.45,2.02.97,2.75-.24,2.91-5.41,15.44-18.51,15.44-18.51,3.64-4.61,2.1-9.05-1.21-11.56h0Z" />
    </svg>
  ),
  "Oakley": (
    <div className="flex flex-col items-center gap-2 leading-none">
      <svg viewBox="0 0 100 24" className="h-8 md:h-10 w-auto" fill="currentColor">
        <path d="M50 2C35.5 2 24 6.5 24 12C24 17.5 35.5 22 50 22C64.5 22 76 17.5 76 12C76 6.5 64.5 2 50 2ZM50 17C43 17 37 14.8 37 12C37 9.2 43 7 50 7C57 7 63 9.2 63 12C63 14.8 57 17 50 17Z" />
      </svg>
      <span className="text-[11px] font-black tracking-[0.25em] font-sans text-center translate-x-[0.125em]">OAKLEY</span>
    </div>
  ),
  "Vulk": (
    <div className="flex items-center select-none leading-none">
      <span className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans lowercase font-black scale-y-90 scale-x-95">vulk</span>
      <span className="text-[9px] font-bold align-super ml-0.5">®</span>
    </div>
  ),
  "Infinit": (
    <div className="flex flex-col items-center gap-1.5 leading-none select-none">
      <span className="text-4xl md:text-5.5xl font-light text-current leading-none scale-y-95 translate-y-0.5">∞</span>
      <span className="text-sm md:text-base font-black tracking-[0.08em] font-sans text-current">INFINIT</span>
    </div>
  ),
  "Rusty": (
    <div className="flex flex-col items-center select-none leading-none">
      <svg viewBox="0 0 100 24" className="h-8 md:h-10 w-auto" fill="currentColor">
        <path d="M50 0 C47 0 44 2 43 5.5 C42 9 43.5 12.5 45.5 14.5 C47.5 16.5 51 17.5 54.7 16.5 C58.2 15.5 60.7 13 61.9 9.5 L56.3 7 C55.7 9 54.5 10.5 52.7 11 C50.9 11.5 49.2 11 48.2 10 C47.2 9 47 7.5 47.6 5.5 C48.2 3.5 49.6 2 51.4 1.5 C53.2 1 54.9 1.5 55.9 2.5 L61.5 0 C59.5 -2.5 56 -3.5 52.1 -3.5 Z" transform="translate(13, 3) scale(0.7)" />
      </svg>
      <span className="text-[10px] font-extrabold tracking-[0.3em] font-sans text-center translate-x-[0.15em] mt-1">RUSTY</span>
      <span className="text-[5.5px] font-semibold tracking-[0.4em] font-sans text-center translate-x-[0.2em] mt-0.5 opacity-80">EYEWEAR</span>
    </div>
  ),
  "B+D": (
    <div className="flex items-center gap-4 select-none leading-none">
      <div className="w-6.5 h-6.5 rounded-full bg-current opacity-60 shrink-0" />
      <span className="text-3xl md:text-4xl font-black tracking-tight text-current">B+D</span>
    </div>
  ),
  "Armani": (
    <div className="flex items-center gap-2 select-none leading-none">
      <span className="text-xs md:text-sm font-semibold tracking-[0.05em] font-serif uppercase" style={{ fontFamily: "Georgia, serif" }}>EMPORIO</span>
      <svg viewBox="0 0 20 20" className="h-5 md:h-6 w-auto" fill="currentColor">
        <path d="M0 4h20v2H0zm3 3h14v2H3zm-3 3h20v2H0zm5 3h10v2H5z" />
      </svg>
      <span className="text-xs md:text-sm font-semibold tracking-[0.05em] font-serif uppercase" style={{ fontFamily: "Georgia, serif" }}>ARMANI</span>
    </div>
  ),
  "Vogue": (
    <div className="flex flex-col items-center select-none leading-none gap-1">
      <span className="text-3xl md:text-4xl font-extrabold tracking-[0.08em] font-serif lowercase" style={{ fontFamily: "'Didot', 'Bodoni MT', 'Cinzel', serif" }}>
        vogue
      </span>
      <span className="text-[9px] font-medium tracking-[0.25em] font-sans uppercase">eyewear</span>
    </div>
  )
};

const technologies = [
  {
    name: "Custom",
    category: "Lentes Digitales",
    description: "Diseñados para adaptarse a tu forma de ver. La línea de progresivos Custom combina tecnología, precisión y múltiples opciones para ofrecer una visión más natural, cómoda y personalizada.",
    logo: logoCustom,
    image: imgCustom,
  },
  {
    name: "Polarys",
    category: "Lentes Digitales",
    description: "Diseñados para brindar una visión cómoda y natural en cada momento del día. Una solución confiable que combina tecnología, confort y calidad visual.",
    logo: logoPolarys,
    image: imgPolarys,
  },
  {
    name: "Prolayer",
    category: "Antirreflejo",
    description: "La máxima expresión en tratamientos antirreflejo. Prolayer combina tecnología de última generación para ofrecer una visión más nítida, mayor transparencia y un confort visual superior.",
    logo: logoProlayer,
    image: imgProlayer,
  },
  {
    name: "Minux",
    category: "Antirreflejo",
    description: "El equilibrio ideal entre tecnología y confort visual. Minux reduce los reflejos y proporciona una visión más cómoda y natural para el uso diario.",
    logo: logoMinux,
    image: imgMinux,
  },
  {
    name: "Arsion",
    category: "Antirreflejo",
    description: "Arsion ofrece un tratamiento antirreflejo confiable que combina calidad, confort visual y una excelente relación precio-calidad.",
    logo: logoArsion,
    image: imgArsion,
  },
];

const AUTOPLAY_MS = 5000;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const Brands: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setVisibleCount(3);
      else if (window.matchMedia('(min-width: 768px)').matches) setVisibleCount(2);
      else setVisibleCount(1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, technologies.length - visibleCount);

  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, maxIndex]);

  const handlePrev = () => setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const handleNext = () => setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1));

  return (
    <section id="marcas" className="py-24 bg-light/30">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">
          <div className="mb-24">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-accent font-semibold tracking-[0.2em] uppercase text-xs md:text-sm mb-3"
            >
              Marcas
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl font-light text-primary leading-[1.1] tracking-tight max-w-2xl mx-auto"
            >
              Armazones de las marcas más reconocidas
            </motion.h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {brands.map((brand, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="flex items-center justify-center p-2 text-gray-400 hover:text-primary transition-colors duration-300 cursor-default select-none h-24"
              >
                {brandLogos[brand] || brand}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="w-full h-px bg-light/80 mb-20"></div>

        <motion.div
          id="tecnologia"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 scroll-mt-32"
        >
          <h2 className="text-4xl md:text-6xl font-light text-primary mb-4 tracking-tight">Lentes que hacen la diferencia</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-light">
            Trabajamos con tecnologías y tratamientos seleccionados para ofrecer una visión más cómoda, nítida y natural.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {technologies.map((tech, idx) => (
                <div key={idx} className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-3">
                  <div className="h-full bg-white rounded-[32px] shadow-sm border border-light flex flex-col overflow-hidden">
                    <div className="relative aspect-[4/3] w-full overflow-hidden shrink-0">
                      <img src={tech.image} alt={`Lentes ${tech.name} — ${tech.category}`} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                      <div className="absolute top-1/2 -translate-y-1/2 right-6 w-32 h-32 rounded-full bg-white shadow-lg border border-gray-50 overflow-hidden">
                        <img src={tech.logo} alt="" className="h-full w-full object-cover scale-[1.15]" />
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-xs font-semibold tracking-widest uppercase text-primary/75 mb-2 block">
                          {tech.category}
                        </span>
                        <h3 className="text-2xl font-bold text-dark mb-3 tracking-tight">{tech.name}</h3>
                        <p className="text-gray-500 font-light leading-relaxed text-sm">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            type="button"
            onClick={handlePrev}
            aria-label="Anterior"
            className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-primary hover:text-white text-dark flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeftIcon size={22} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Siguiente"
            className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-primary hover:text-white text-dark flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronRightIcon size={22} />
          </button>
        </motion.div>

        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex ? 'w-10 bg-primary' : 'w-2 bg-light hover:bg-primary/40'
              }`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
