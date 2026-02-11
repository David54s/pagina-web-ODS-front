import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './QuienesSomos.css';

const QuienesSomos = () => {
  return (
    <>
      <Navigation />
      
      <section className="about-hero">
        <h1>Nuestra Identidad</h1>
        <p>
          Somos un grupo de <strong>estudiantes universitarios</strong> apasionados por la naturaleza, 
          comprometidos con la misión de concientizar a la sociedad sobre la increíble biodiversidad 
          que alberga el estado de Puebla.
        </p>
      </section>

      <div className="container">
        <div className="grid-sections">
          <div className="card">
            <h2>Nuestro Objetivo</h2>
            <p>
              Crear un puente entre la comunidad científica y la ciudadanía poblana a través de 
              herramientas digitales que permitan documentar y valorar nuestra herencia biológica.
            </p>
          </div>

          <div className="card">
            <h2>Metas</h2>
            <ul>
              <li>Mapear el 100% de las zonas protegidas del estado.</li>
              <li>Fomentar la participación de al menos 50 escuelas locales en el registro de especies.</li>
              <li>Publicar informes semestrales sobre la salud de los ecosistemas en la Mixteca y el Altiplano.</li>
            </ul>
          </div>
        </div>

        <div className="support-section">
          <h2>Tu Apoyo es Vital</h2>
          <p>
            Este proyecto es impulsado por la comunidad. Puedes apoyarnos compartiendo nuestra plataforma, 
            registrando especies en tus salidas a campo o colaborando como voluntario especializado 
            si eres estudiante de biología o áreas afines.
          </p>
          {/* <a href="mailto:apoyo@biopuebla.mx" className="btn-apoyo">
            ¿Cómo puedo ayudar?
          </a> */}
          <a href="mailto:apoyo@biopuebla.mx" className="btn-apoyo">
            ¿Cómo puedo ayudar?
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default QuienesSomos;