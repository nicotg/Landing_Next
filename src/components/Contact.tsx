import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PinIcon, PhoneIcon, ClockIcon, WhatsAppIcon, InstagramIcon } from './icons';

const WHATSAPP_NUMERO = '5493513867839';

export const Contact: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  // El form no tiene backend: arma el mensaje y abre WhatsApp con el texto listo.
  const texto = [
    nombre.trim() ? `¡Hola! Soy ${nombre.trim()}.` : '¡Hola!',
    mensaje.trim() || 'Quería hacer una consulta.',
  ].join(' ');
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;

  return (
    <section id="contacto" className="py-24 bg-light/20 relative">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 block">
            Acercate
          </span>
          <h2 className="text-4xl md:text-6xl font-light text-primary leading-[1.1] tracking-tight">Contacto</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Side: Info */}
            <div className="p-10 md:p-14 bg-light/10">
              <h3 className="text-2xl md:text-3xl font-light text-primary mb-4 tracking-tight">Información</h3>
              <p className="text-gray-600 mb-10 font-light leading-relaxed">
                Estamos acá para asesorarte. Escribinos o acercate a nuestro local para conocer más sobre nuestros productos.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-primary flex-shrink-0">
                    <PinIcon size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-lg">Ubicación</h4>
                    <p className="text-gray-600">Av. Rafael Núñez 4086, Cerro de las Rosas, Córdoba</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-primary flex-shrink-0">
                    <PhoneIcon size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-lg">Teléfono / WhatsApp</h4>
                    <a href="tel:+5493513867839" className="text-gray-600 hover:text-primary transition-colors">
                      +54 9 351 386 7839
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-primary flex-shrink-0">
                    <ClockIcon size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-lg">Horarios</h4>
                    <p className="text-gray-600">Lun a Vie: 9:00 - 13:00 / 16:00 - 20:00</p>
                    <p className="text-gray-600">Sáb: 9:00 - 13:00</p>
                  </div>
                </div>

                <a
                  href="https://www.instagram.com/nextopticas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-accent/40 transition-colors">
                    <InstagramIcon size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-lg group-hover:text-primary transition-colors">Instagram</h4>
                    <p className="text-gray-600">@nextopticas</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="p-10 md:p-14 border-t md:border-t-0 md:border-l border-light">
              <h3 className="text-2xl md:text-3xl font-light text-primary mb-8 tracking-tight">Envianos tu consulta</h3>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="contacto-nombre" className="block text-sm font-semibold text-primary/80 mb-2">Nombre</label>
                  <input
                    id="contacto-nombre"
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-light focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contacto-mensaje" className="block text-sm font-semibold text-primary/80 mb-2">Mensaje</label>
                  <textarea
                    id="contacto-mensaje"
                    rows={4}
                    placeholder="¿En qué te podemos ayudar?"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-light focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20b858] text-white rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <WhatsAppIcon size={24} />
                  Enviar por WhatsApp
                </a>
              </form>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-96 rounded-3xl overflow-hidden shadow-lg border border-light relative z-10"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.5732461072434!2d-64.23346312345976!3d-31.370753594048523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432992f8bc7ab31%3A0x3a850d59eecf9585!2zQXYuIFJhZmFlbCBOw7rDsWV6IDQwODYsIFg1MDAwIEPDs3Jkb2Jh!5e0!3m2!1ses-419!2sar!4v1788351434549!5m2!1ses-419!2sar"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="strict-origin-when-cross-origin"
            title="Next Ópticas en Av. Rafael Núñez 4086, Cerro de las Rosas, Córdoba"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
};
