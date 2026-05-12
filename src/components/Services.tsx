import React from 'react';
import { Eye, Glasses, Sun, CircleDot } from 'lucide-react';

const servicesList = [
  {
    title: 'Examen Visual',
    description: 'Tecnología de última generación para tu salud ocular.',
    icon: Eye,
    image: 'https://images.unsplash.com/photo-1579208035882-bf5422830f36?auto=format&fit=crop&w=800&q=80',
    className: 'md:col-span-2 md:row-span-2 min-h-[350px] md:min-h-[500px]',
  },
  {
    title: 'Anteojos de Receta',
    description: 'Diseños exclusivos adaptados a vos.',
    icon: Glasses,
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80',
    className: 'col-span-1 min-h-[250px]',
  },
  {
    title: 'Lentes de Contacto',
    description: 'Adaptación personalizada y confort.',
    icon: CircleDot,
    image: 'https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?auto=format&fit=crop&w=600&q=80',
    className: 'col-span-1 min-h-[250px]',
  },
  {
    title: 'Gafas de Sol',
    description: 'Protección UV superior y estilo inigualable.',
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    className: 'md:col-span-2 min-h-[250px]',
  },
];

export const Services: React.FC = () => {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-2">Especialidades</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-dark">Nuestros Servicios</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className={`relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-shadow ${service.className}`}
              >
                {/* Imagen de fondo */}
                <div className="absolute inset-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                </div>

                {/* Contenido (siempre visible pero animado en hover) */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 text-white">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">{service.title}</h4>
                    <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light delay-75">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
