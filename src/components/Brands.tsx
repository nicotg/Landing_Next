import React from 'react';
import { ShieldCheckIcon, BoltIcon, DropIcon } from './icons';

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
    name: "Transitions®",
    description: "Lentes inteligentes a la luz. Se oscurecen en exteriores y se aclaran en interiores para comodidad total.",
    icon: BoltIcon,
    accent: "bg-blue-100 text-blue-700"
  },
  {
    name: "Crizal®",
    description: "Tratamiento superior antirreflejos que repele agua, polvo y protege contra los rayos UV.",
    icon: ShieldCheckIcon,
    accent: "bg-emerald-100 text-emerald-700"
  },
  {
    name: "Varilux®",
    description: "Los lentes multifocales más avanzados para una visión nítida a cualquier distancia sin esfuerzo.",
    icon: DropIcon,
    accent: "bg-purple-100 text-purple-700"
  }
];

export const Brands: React.FC = () => {
  return (
    <section id="marcas" className="py-24 bg-light/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Marcas de Anteojos (Estilo Minimalista) */}
        <div className="text-center mb-20">
          <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-10">
            Trabajamos con las mejores marcas de armazones
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {brands.map((brand, idx) => (
              <div key={idx} className="flex items-center justify-center p-4">
                <span className="text-2xl md:text-3xl font-bold tracking-tighter text-dark/80 hover:text-primary transition-colors cursor-default select-none">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Separador */}
        <div className="w-full h-px bg-light/80 mb-20"></div>

        {/* Tecnología Óptica (Cards Premium) */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-dark mb-4">Tecnología Óptica de Vanguardia</h3>
          <p className="text-gray-500 max-w-2xl mx-auto font-light">
            Incorporamos los mejores tratamientos y materiales del mundo para cuidar tu visión con la máxima precisión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div 
                key={idx} 
                className="bg-white p-10 rounded-3xl shadow-sm border border-light hover:shadow-2xl hover:border-accent/30 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tech.accent}`}>
                  <Icon size={28} />
                </div>
                <h4 className="text-2xl font-bold text-dark mb-3">{tech.name}</h4>
                <p className="text-gray-600 font-light leading-relaxed">
                  {tech.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
