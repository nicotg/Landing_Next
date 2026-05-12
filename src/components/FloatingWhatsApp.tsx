import React from 'react';
import { WhatsAppIcon } from './icons';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a 
      href="#" 
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:bg-[#20b858] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon size={32} />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-white text-dark px-4 py-2 rounded-xl text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg pointer-events-none whitespace-nowrap">
        ¡Hablemos!
      </span>
    </a>
  );
};
