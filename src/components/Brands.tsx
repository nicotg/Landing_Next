import React from 'react';

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

export const Brands: React.FC = () => {
  return (
    <section id="marcas" className="py-24 bg-light/30">
      <div className="max-w-7xl mx-auto px-6">

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

        <div className="w-full h-px bg-light/80 mb-20"></div>

        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-dark mb-4">Tecnología Óptica de Vanguardia</h3>
          <p className="text-gray-500 max-w-2xl mx-auto font-light">
            Incorporamos los mejores tratamientos y materiales del mundo para cuidar tu visión con la máxima precisión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl shadow-sm border border-light hover:shadow-2xl hover:border-accent/30 transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            >
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
          ))}
        </div>

      </div>
    </section>
  );
};
