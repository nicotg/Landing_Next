import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import { VivGafasLogo, HardemLogo, FaunoLogo, UsualLogo, LisbonLogo } from './brandLogos';

import logoCustom from '../assets/technologies/Marca-Custom.png';
import logoPolarys from '../assets/technologies/Marca-Polarys.png';
import logoProlayer from '../assets/technologies/Marca-AR-Prolayer.png';
import logoMinux from '../assets/technologies/Marca-AR-Minux.png';
import logoArsion from '../assets/technologies/Marca-AR-Arsion.png';

import imgCustom from '../assets/technologies/custom-portrait.webp';
import imgPolarys from '../assets/technologies/polarys-portrait.webp';
import imgProlayer from '../assets/technologies/prolayer-portrait.webp';
import imgMinux from '../assets/technologies/minux-portrait.webp';
import imgArsion from '../assets/technologies/arsion-portrait.webp';

const brands = [
  { name: "Vív Gafas", logo: <VivGafasLogo /> },
  { name: "Hardem", logo: <HardemLogo /> },
  { name: "Fauno", logo: <FaunoLogo /> },
  { name: "Usual", logo: <UsualLogo /> },
  { name: "Lisbon", logo: <LisbonLogo /> },
];

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
              className="text-4xl md:text-6xl font-light text-primary leading-[1.1] tracking-tight max-w-4xl mx-auto"
            >
              Armazones de las marcas más reconocidas
            </motion.h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-10 md:gap-x-16"
          >
            {brands.map((brand) => (
              <motion.div
                key={brand.name}
                variants={fadeUp}
                className="flex items-center justify-center basis-[45%] md:basis-[26%] lg:basis-[15%] min-w-0 h-24 text-gray-400 hover:text-primary transition-colors duration-300 cursor-default select-none"
              >
                {brand.logo}
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
                        <img src={tech.logo} alt={`Logo ${tech.name}`} className="h-full w-full object-cover scale-[1.15]" />
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
