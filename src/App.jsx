import NavBar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Proyectos from './components/Proyectos';
import Footer from './components/Footer';
import Contacto from './components/Contact';
import Chat from './components/Chat';

function App() {
  return (
    <div>
      <NavBar />
      <main>
        <Hero />
        <Chat />
        <About />
        <Proyectos />
        <Contacto />
        <Footer />
      </main>
    </div>
  );
}

export default App;
