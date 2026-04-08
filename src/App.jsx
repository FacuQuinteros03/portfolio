import { useEffect } from 'react';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Proyectos from './components/Proyectos';
import Footer from './components/Footer';
import Contacto from './components/Contact';

function App() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#about') {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        {/* <Chat /> */}
        <About />
        <Proyectos />
        <Contacto />
        <Footer />
      </main>
    </div>
  );
}

export default App;
