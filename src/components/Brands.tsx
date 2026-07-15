import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

import logoCustom from '../assets/technologies/Marca-Custom.png';
import logoPolarys from '../assets/technologies/Marca-Polarys.png';
import logoProlayer from '../assets/technologies/Marca-AR-Prolayer.png';
import logoMinux from '../assets/technologies/Marca-AR-Minux.png';
import logoArsion from '../assets/technologies/Marca-AR-Arsion.png';

import imgCustom from '../assets/technologies/custom-portrait.png';
import imgPolarys from '../assets/technologies/polarys-portrait.png';
import imgProlayer from '../assets/technologies/prolayer-portrait.png';
import imgMinux from '../assets/technologies/minux-portrait.png';
import imgArsion from '../assets/technologies/arsion-portrait.png';

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
  "Ray-Ban": (
    <span className="text-3xl md:text-4xl italic font-serif tracking-tight font-black select-none skew-x-[-15deg] leading-none" style={{ fontFamily: "'Brush Script MT', cursive, sans-serif" }}>
      Ray-Ban
    </span>
  ),
  "Oakley": (
    <div className="flex flex-col items-center gap-1.5 leading-none">
      <svg viewBox="0 0 100 24" className="h-6 md:h-7 w-auto" fill="currentColor">
        <path d="M50 2C35.5 2 24 6.5 24 12C24 17.5 35.5 22 50 22C64.5 22 76 17.5 76 12C76 6.5 64.5 2 50 2ZM50 17C43 17 37 14.8 37 12C37 9.2 43 7 50 7C57 7 63 9.2 63 12C63 14.8 57 17 50 17Z" />
      </svg>
      <span className="text-[9px] font-black tracking-[0.25em] font-sans text-center translate-x-[0.125em]">OAKLEY</span>
    </div>
  ),
  "Vulk": (
    <div className="flex items-center select-none leading-none">
      <span className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans lowercase font-black scale-y-90 scale-x-95">vulk</span>
      <span className="text-[7px] font-bold align-super ml-0.5">®</span>
    </div>
  ),
  "Infinit": (
    <div className="flex flex-col items-center gap-1 leading-none select-none">
      <span className="text-3xl md:text-4.5xl font-light text-current leading-none scale-y-95 translate-y-0.5">∞</span>
      <span className="text-xs md:text-sm font-black tracking-[0.08em] font-sans text-current">INFINIT</span>
    </div>
  ),
  "Rusty": (
    <div className="flex flex-col items-center select-none leading-none">
      <svg viewBox="0 0 100 24" className="h-6 md:h-7 w-auto" fill="currentColor">
        <path d="M50 0 C47 0 44 2 43 5.5 C42 9 43.5 12.5 45.5 14.5 C47.5 16.5 51 17.5 54.7 16.5 C58.2 15.5 60.7 13 61.9 9.5 L56.3 7 C55.7 9 54.5 10.5 52.7 11 C50.9 11.5 49.2 11 48.2 10 C47.2 9 47 7.5 47.6 5.5 C48.2 3.5 49.6 2 51.4 1.5 C53.2 1 54.9 1.5 55.9 2.5 L61.5 0 C59.5 -2.5 56 -3.5 52.1 -3.5 Z" transform="translate(13, 3) scale(0.7)" />
      </svg>
      <span className="text-[8px] font-extrabold tracking-[0.3em] font-sans text-center translate-x-[0.15em] mt-1">RUSTY</span>
      <span className="text-[4px] font-semibold tracking-[0.4em] font-sans text-center translate-x-[0.2em] mt-0.5 opacity-80">EYEWEAR</span>
    </div>
  ),
  "B+D": (
    <div className="flex items-center gap-3 select-none leading-none">
      <div className="w-5 h-5 rounded-full bg-current opacity-60 shrink-0" />
      <span className="text-2xl md:text-3xl font-black tracking-tight text-current">B+D</span>
    </div>
  ),
  "Armani": (
    <div className="flex items-center gap-1.5 select-none leading-none">
      <span className="text-[10px] md:text-xs font-semibold tracking-[0.05em] font-serif uppercase" style={{ fontFamily: "Georgia, serif" }}>EMPORIO</span>
      <svg viewBox="0 0 20 20" className="h-4 md:h-5 w-auto" fill="currentColor">
        <path d="M0 4h20v2H0zm3 3h14v2H3zm-3 3h20v2H0zm5 3h10v2H5z" />
      </svg>
      <span className="text-[10px] md:text-xs font-semibold tracking-[0.05em] font-serif uppercase" style={{ fontFamily: "Georgia, serif" }}>ARMANI</span>
    </div>
  ),
  "Vogue": (
    <div className="flex flex-col items-center select-none leading-none gap-0.5">
      <span className="text-2xl md:text-3xl font-extrabold tracking-[0.08em] font-serif lowercase" style={{ fontFamily: "'Didot', 'Bodoni MT', 'Cinzel', serif" }}>
        vogue
      </span>
      <span className="text-[7px] font-medium tracking-[0.25em] font-sans uppercase">eyewear</span>
    </div>
  )
};

const technologies = [
  {
    name: "Progresivos Custom",
    category: "Progresivos",
    description: "Lentes progresivos a medida: cada parámetro óptico se ajusta a tu uso diario para una adaptación inmediata y una visión natural a toda distancia.",
    logo: logoCustom,
    image: imgCustom,
  },
  {
    name: "Polarys",
    category: "Polarizado",
    description: "Lentes polarizados que eliminan los reflejos sobre superficies brillantes para una visión más nítida, contraste real y menos fatiga al aire libre.",
    logo: logoPolarys,
    image: imgPolarys,
  },
  {
    name: "Prolayer",
    category: "Antirreflejo",
    description: "Antirreflejo multicapa que reduce el deslumbramiento y mejora la nitidez frente a pantallas y luces nocturnas.",
    logo: logoProlayer,
    image: imgProlayer,
  },
  {
    name: "Minux",
    category: "Antirreflejo",
    description: "Antirreflejo premium con repelente al agua y al polvo: tus cristales se mantienen limpios y transparentes por más tiempo.",
    logo: logoMinux,
    image: imgMinux,
  },
  {
    name: "Arsion",
    category: "Antirreflejo",
    description: "Tratamiento antirreflejo de alta resistencia, con superficie endurecida para uso intensivo y mayor durabilidad.",
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
          <div className="mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-accent font-semibold tracking-[0.2em] uppercase text-xs md:text-sm mb-3"
            >
              Marcas
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl font-light text-primary leading-[1.1] tracking-tight max-w-2xl mx-auto"
            >
              Armazones de las marcas más reconocidas
            </motion.h3>
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
                className="flex items-center justify-center p-4 text-gray-400 hover:text-primary transition-colors duration-300 cursor-default select-none h-16"
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
          <h3 className="text-4xl md:text-6xl font-light text-primary mb-4 tracking-tight">Lentes que hacen la diferencia</h3>
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
                      <img src={tech.image} alt={tech.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                      <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-white shadow-lg border border-gray-50 flex items-center justify-center p-3.5">
                        <img src={tech.logo} alt="" className="h-full w-full object-contain" />
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-xs font-semibold tracking-widest uppercase text-primary/75 mb-2 block">
                          {tech.category}
                        </span>
                        <h4 className="text-2xl font-bold text-dark mb-3 tracking-tight">{tech.name}</h4>
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
