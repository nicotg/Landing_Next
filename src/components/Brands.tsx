import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

const technologies = [
  {
    name: "Progresivos Custom",
    category: "Progresivos",
    description: "Lentes progresivos a medida: cada parámetro óptico se ajusta a tu uso diario para una adaptación inmediata y una visión natural a toda distancia.",
  },
  {
    name: "Polarys",
    category: "Polarizado",
    description: "Lentes polarizados que eliminan los reflejos sobre superficies brillantes para una visión más nítida, contraste real y menos fatiga al aire libre.",
  },
  {
    name: "Prolayer",
    category: "Antirreflejo",
    description: "Antirreflejo multicapa que reduce el deslumbramiento y mejora la nitidez frente a pantallas y luces nocturnas.",
  },
  {
    name: "Minux",
    category: "Antirreflejo",
    description: "Antirreflejo premium con repelente al agua y al polvo: tus cristales se mantienen limpios y transparentes por más tiempo.",
  },
  {
    name: "Arsion",
    category: "Antirreflejo",
    description: "Tratamiento antirreflejo de alta resistencia, con superficie endurecida para uso intensivo y mayor durabilidad.",
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

  return (
    <section id="marcas" className="py-24 bg-light/30">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-10"
          >
            Trabajamos con las mejores marcas de armazones
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
          >
            {brands.map((brand, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="flex items-center justify-center p-4"
              >
                <span className="text-2xl md:text-3xl font-bold tracking-tighter text-dark/80 hover:text-primary transition-colors cursor-default select-none">
                  {brand}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="w-full h-px bg-light/80 mb-20"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-dark mb-4">Tecnología Óptica de Vanguardia</h3>
          <p className="text-gray-500 max-w-2xl mx-auto font-light">
            Incorporamos los mejores tratamientos y materiales del mundo para cuidar tu visión con la máxima precisión.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {technologies.map((tech, idx) => (
              <div key={idx} className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-3">
                <div className="h-full bg-white p-8 rounded-3xl shadow-sm border border-light flex flex-col">
                  {/* Placeholder de logo - reemplazar cuando el diseñador entregue los assets */}
                  <div className="h-24 mb-6 flex items-center justify-center bg-light/40 rounded-2xl border border-dashed border-light/80">
                    <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">Logo</span>
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
