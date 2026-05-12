import React from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section className="py-24 bg-light/20 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Contacto</h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Side: Info */}
            <div className="p-10 md:p-14 bg-light/10">
              <h3 className="text-2xl font-bold text-dark mb-4">Información</h3>
              <p className="text-gray-600 mb-10 font-light leading-relaxed">
                Estamos acá para asesorarte. Escribinos o acercate a nuestro local para conocer más sobre nuestros productos.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark text-lg">Ubicación</h4>
                    <p className="text-gray-600">Av. Hipólito Yrigoyen 123, Nueva Córdoba, Córdoba</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-primary flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark text-lg">Teléfono / WhatsApp</h4>
                    <p className="text-gray-600">+54 9 351 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-primary flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark text-lg">Horarios</h4>
                    <p className="text-gray-600">Lun a Vie: 9:00 - 13:00 / 16:00 - 20:00</p>
                    <p className="text-gray-600">Sáb: 9:00 - 13:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="p-10 md:p-14 border-t md:border-t-0 md:border-l border-light">
              <h3 className="text-2xl font-bold text-dark mb-8">Envianos tu consulta</h3>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">Nombre</label>
                  <input 
                    type="text" 
                    placeholder="Tu nombre" 
                    className="w-full px-4 py-3 rounded-lg border border-light focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">Mensaje</label>
                  <textarea 
                    rows={4}
                    placeholder="¿En qué te podemos ayudar?" 
                    className="w-full px-4 py-3 rounded-lg border border-light focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="button"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20b858] text-white rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <MessageCircle size={24} />
                  Enviar por WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Side: Map */}
        <div className="w-full h-96 rounded-3xl overflow-hidden shadow-lg border border-light relative z-10">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108924.9602334863!2d-64.26917631379513!3d-31.399434857413645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432985f478f5b69%3A0xb0a24f9a5366b092!2zQ8OzcmRvYmE!5e0!3m2!1ses-419!2sar!4v1715535041000!5m2!1ses-419!2sar" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación en el mapa"
          ></iframe>
        </div>

      </div>
    </section>
  );
};
