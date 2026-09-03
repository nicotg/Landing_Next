import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Brands } from './components/Brands';
import { Contact } from './components/Contact';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import './App.css';

function App() {
  return (
    <div className="font-sans antialiased text-dark bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Brands />
      <Contact />
      <FloatingWhatsApp />

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="bg-primary text-white py-12"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-8">
            <div>
              <p className="font-display text-2xl font-light tracking-tight mb-2">Next Ópticas</p>
              <address className="not-italic text-white/70 font-light text-sm leading-relaxed">
                Av. Rafael Núñez 4088, Cerro de las Rosas<br />
                Córdoba, Argentina
              </address>
            </div>
            <div className="flex flex-col gap-2 text-sm text-white/70 font-light">
              <a href="tel:+5493513867839" className="hover:text-accent transition-colors">
                +54 9 351 386 7839
              </a>
              <a
                href="https://www.instagram.com/nextopticas/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                @nextopticas
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6">
            <p className="text-white/50 font-light text-sm text-center">
              © {new Date().getFullYear()} Next Ópticas. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
