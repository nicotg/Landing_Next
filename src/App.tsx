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
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="bg-dark text-white py-8 text-center"
      >
        <p className="text-light/60 font-light">
          © {new Date().getFullYear()} Next Ópticas. Todos los derechos reservados.
        </p>
      </motion.footer>
    </div>
  );
}

export default App;
