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
      
      {/* Footer simple para cerrar el layout */}
      <footer className="bg-dark text-white py-8 text-center">
        <p className="text-light/60 font-light">
          © {new Date().getFullYear()} Next Ópticas. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}

export default App;
