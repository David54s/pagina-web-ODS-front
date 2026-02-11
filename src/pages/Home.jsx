import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  return (
    <>
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Biodiversidad en Puebla</h1>
            <p>
              Puebla es hogar de una riqueza natural invaluable, desde los volcanes hasta la Mixteca.
              Nuestra misión es documentar y proteger la flora y fauna de nuestra región para asegurar y concientizar 
              de un futuro sostenible.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-container">
          <div className="stats-card">
            <div className="stat-item">
              <h2>1,250</h2>
              <p>Especies Registradas</p>
            </div>
            <div className="stat-item">
              <h2>45</h2>
              <p>Áreas Protegidas</p>
            </div>
            <div className="stat-item">
              <h2>8,400</h2>
              <p>Avistamientos este año</p>
            </div>
            <div className="stat-item">
              <h2>300+</h2>
              <p>Voluntarios Activos</p>
            </div>
          </div>
        </section>


        {/* <section className='btn-login'>
          INICIA YA
        </section>
         */}
      </main>

      <Footer />
    </>
  );
};

export default Home;