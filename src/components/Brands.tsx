import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

import logoCustom from '../assets/technologies/Marca-Custom.png';
import logoPolarys from '../assets/technologies/Marca-Polarys.png';
import logoProlayer from '../assets/technologies/Marca-AR-Prolayer.png';
import logoMinux from '../assets/technologies/Marca-AR-Minux.png';
import logoArsion from '../assets/technologies/Marca-AR-Arsion.png';

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
      Ray·Ban
    </span>
  ),
  "Oakley": (
    <svg viewBox="0 0 100 40" className="h-9 md:h-11 w-auto" fill="currentColor">
      <path d="M50 8C32.3 8 18 13.4 18 20C18 26.6 32.3 32 50 32C67.7 32 82 26.6 82 20C82 13.4 67.7 8 50 8ZM50 26.4C41.2 26.4 34 23.5 34 20C34 16.5 41.2 13.6 50 13.6C58.8 13.6 66 16.5 66 20C66 23.5 58.8 26.4 50 26.4Z" />
    </svg>
  ),
  "Vulk": (
    <span className="text-3xl md:text-4xl font-extrabold tracking-[0.12em] font-sans uppercase select-none scale-y-95 font-black leading-none">
      VULK
    </span>
  ),
  "Infinit": (
    <svg viewBox="0 0 140 40" className="h-9 md:h-11 w-auto" fill="currentColor">
      <path d="M22 13c-4.4 0-8 3.6-8 8s3.6 8 8 8c3 0 5.6-1.7 7-4.1c1.4 2.4 4 4.1 7 4.1c4.4 0 8-3.6 8-8s-3.6-8-8-8c-3 0-5.6 1.7-7 4.1c-1.4-2.4-4-4.1-7-4.1zm0 3c2.8 0 5 2.2 5 5s-2.2 5-5 5s-5-2.2-5-5s2.2-5 5-5zm14 0c2.8 0 5 2.2 5 5s-2.2 5-5 5s-5-2.2-5-5s2.2-5 5-5z" />
      <text x="60" y="27" fontSize="19" fontWeight="800" letterSpacing="0.25em" fontFamily="system-ui, -apple-system, sans-serif">INFINIT</text>
    </svg>
  ),
  "Rusty": (
    <span className="text-2xl md:text-3xl font-extrabold tracking-[0.2em] font-sans uppercase select-none font-black italic leading-none">
      RUSTY
    </span>
  ),
  "B+D": (
    <div className="flex items-center gap-1 select-none leading-none">
      <div className="w-8 h-8 rounded-full bg-current flex items-center justify-center text-white font-black text-xs md:text-sm">
        B
      </div>
      <span className="text-xl md:text-2xl font-black tracking-tighter text-current">B+D</span>
    </div>
  ),
  "Armani": (
    <span className="text-2xl md:text-3xl font-light tracking-[0.3em] font-serif select-none leading-none" style={{ fontFamily: "'Didot', 'Bodoni MT', 'Cinzel', serif" }}>
      ARMANI
    </span>
  ),
  "Vogue": (
    <span className="text-3xl md:text-4xl font-extrabold tracking-[0.18em] font-serif select-none leading-none" style={{ fontFamily: "'Didot', 'Bodoni MT', 'Cinzel', serif" }}>
      VOGUE
    </span>
  )
};

const technologies = [
  {
    name: "Progresivos Custom",
    category: "Progresivos",
    description: "Lentes progresivos a medida: cada parámetro óptico se ajusta a tu uso diario para una adaptación inmediata y una visión natural a toda distancia.",
    logo: logoCustom,
  },
  {
    name: "Polarys",
    category: "Polarizado",
    description: "Lentes polarizados que eliminan los reflejos sobre superficies brillantes para una visión más nítida, contraste real y menos fatiga al aire libre.",
    logo: logoPolarys,
  },
  {
    name: "Prolayer",
    category: "Antirreflejo",
    description: "Antirreflejo multicapa que reduce el deslumbramiento y mejora la nitidez frente a pantallas y luces nocturnas.",
    logo: logoProlayer,
  },
  {
    name: "Minux",
    category: "Antirreflejo",
    description: "Antirreflejo premium con repelente al agua y al polvo: tus cristales se mantienen limpios y transparentes por más tiempo.",
    logo: logoMinux,
  },
  {
    name: "Arsion",
    category: "Antirreflejo",
    description: "Tratamiento antirreflejo de alta resistencia, con superficie endurecida para uso intensivo y mayor durabilidad.",
    logo: logoArsion,
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-10"
          >
            Trabajamos con las mejores marcas de armazones
          </motion.p>
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
          <h3 className="text-4xl md:text-6xl font-bold text-dark mb-4 tracking-tight">Tecnología Óptica de Vanguardia</h3>
          <p className="text-gray-500 max-w-2xl mx-auto font-light">
            Incorporamos los mejores tratamientos y materiales del mundo para cuidar tu visión con la máxima precisión.
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
                  <div className="h-full bg-white p-8 rounded-3xl shadow-sm border border-light flex flex-col">
                    <div className="h-24 mb-6 flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-100 p-4 shrink-0">
                      <img src={tech.logo} alt={tech.name} className="h-full object-contain" />
                    </div>
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
                      {tech.category}
                    </span>
                    <h4 className="text-2xl font-bold text-dark mb-3">{tech.name}</h4>
                    <p className="text-gray-600 font-light leading-relaxed">
                      {tech.description}
                    </p>
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
