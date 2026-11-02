import About from './About';
import Contact from './Contact';
import Experience from './Experience';
import Footer from './Footer';
import Hero from './Hero';
import NavBar from './NavBar';
import Projects from './Projects';

export default function HomePage() {
  return (
    <>
      <a
        href="#experiencia"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-3 focus:font-semibold focus:text-on-accent"
      >
        Saltar al contenido
      </a>
      <NavBar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
