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
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="Next Ópticas Hero" 
          className="w-full h-full object-cover"
        />
        {/* Overlay para oscurecer la imagen y mejorar legibilidad */}
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent"></div>
      </div>

      {/* Content aligned to left */}
      <div className="relative z-10 px-6 md:px-16 w-full max-w-7xl mx-auto flex flex-col items-start text-left">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-lg flex flex-col gap-2">
          <span>Tu <span className="inline-block relative w-[250px] md:w-[350px] h-[1em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute left-0 text-accent"
              >
                {dynamicWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>,</span>
          <span>nuestro enfoque</span>
        </h1>
        <p className="text-lg md:text-2xl text-light mb-10 max-w-xl drop-shadow-md font-light">
          Descubrí la combinación perfecta entre salud visual y diseño exclusivo en el corazón de Córdoba.
        </p>
        <div className="flex gap-4 flex-col sm:flex-row w-full sm:w-auto">
          <button className="px-8 py-4 bg-primary text-white rounded-full font-medium text-lg transition-transform hover:scale-105 hover:bg-primary/90 shadow-xl cursor-pointer">
            Conocé nuestros servicios
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-medium text-lg transition-all hover:bg-white/20 shadow-xl cursor-pointer">
            Contactanos
          </button>
        </div>
      </div>
    </section>
  );
};
