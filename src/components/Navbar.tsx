import React, { useState, useEffect } from 'react';
import { WhatsAppIcon, InstagramIcon } from './icons';
import logo from '../assets/Next-Logo-RGB-BlancoCompleto.png';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const marcasSection = document.getElementById('marcas');
      if (marcasSection) {
        // El nav se vuelve opaco cuando la sección de Marcas está por entrar
        // al viewport (top a 100px o menos del top).
        const rect = marcasSection.getBoundingClientRect();
        setScrolled(rect.top <= 100);
      } else {
        setScrolled(window.scrollY > 50);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-dark/60 backdrop-blur-md shadow-lg' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="flex items-center" aria-label="Ir al inicio">
          <img src={logo} alt="Next Ópticas" className="h-16 md:h-20 object-contain" />
        </a>

        {/* Links (Desktop) */}
        <div className="hidden md:flex gap-10 items-center text-white font-medium text-xl">
          <a href="#hero" className="hover:text-accent transition-colors">Inicio</a>
          <a href="#servicios" className="hover:text-accent transition-colors">Servicios</a>
          <a href="#marcas" className="hover:text-accent transition-colors">Marcas</a>
          <a href="#contacto" className="hover:text-accent transition-colors">Contacto</a>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/nextopticas/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon size={22} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-accent transition-colors"
            aria-label="Contactar por WhatsApp"
          >
            <WhatsAppIcon size={24} />
            <span className="hidden md:block font-medium text-xl">Contactanos</span>
          </a>
        </div>
      </div>
    </nav>
  );
};
