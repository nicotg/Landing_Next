import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImg from '../assets/foto_ejemplo_hero.jpg';

const dynamicWords = ["visión", "salud", "estilo"];

export const Hero: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Next Ópticas Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 w-full max-w-7xl mx-auto flex flex-col items-start text-left">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-lg"
        >
          <span className="flex items-baseline gap-x-3">
            <span>Tu</span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={wordIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-accent inline-block"
              >
                {dynamicWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="block">es nuestro enfoque</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-2xl text-light max-w-xl drop-shadow-md font-light"
        >
          Descubrí la combinación perfecta entre salud visual y diseño exclusivo en el corazón de Córdoba.
        </motion.p>
      </div>
    </section>
  );
};
