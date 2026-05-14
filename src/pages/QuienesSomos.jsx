/**
 * COMPONENTE: QuienesSomos
 * Este componente renderiza la sección "Sobre Nosotros" o "Identidad".
 * Su objetivo es presentar al equipo, la misión, visión y metas del proyecto BioPuebla.
 */

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
// Importación de los estilos específicos para la estructura de tarjetas y el diseño tipo "Hero"
import './QuienesSomos.css';

const QuienesSomos = () => {
  return (
    <>
      {/* Componente de cabecera reutilizable */}
      <Navigation />
      
      {/* SECCIÓN HERO: 
          Contenedor de impacto visual que define quiénes son los creadores (estudiantes universitarios)
          y el propósito general de la plataforma en el estado de Puebla.
      */}
      <section className="about-hero">
        <h1>Nuestra Identidad</h1>
        <p>
          Somos un grupo de <strong>estudiantes universitarios</strong> apasionados por la naturaleza, 
          comprometidos con la misión de concientizar a la sociedad sobre la increíble biodiversidad 
          que alberga el estado de Puebla.
        </p>
      </section>

      {/* CONTENEDOR PRINCIPAL: 
          Agrupa el contenido detallado en una rejilla (grid) para facilitar la lectura.
      */}
      <div className="container">
        
        {/* GRID DE SECCIONES: 
            Divide la pantalla en columnas (dependiendo del CSS) para mostrar el Objetivo y las Metas.
        */}
        <div className="grid-sections">
          
          {/* Tarjeta de Objetivo: Define el "para qué" de la herramienta digital */}
          <div className="card">
            <h2>Nuestro Objetivo</h2>
            <p>
              Crear un puente entre la comunidad científica y la ciudadanía poblana a través de 
              herramientas digitales que permitan documentar y valorar nuestra herencia biológica.
            </p>
          </div>

          {/* Tarjeta de Metas: Lista de objetivos cuantificables y específicos por región */}
          <div className="card">
            <h2>Metas</h2>
            <ul>
              <li>Mapear el 100% de las zonas protegidas del estado.</li>
              <li>Fomentar la participación de al menos 50 escuelas locales en el registro de especies.</li>
              <li>Publicar informes semestrales sobre la salud de los ecosistemas en la Mixteca y el Altiplano.</li>
            </ul>
          </div>
        </div>

        {/* SECCIÓN DE APOYO (Call to Action):
            Invita al usuario a interactuar con el proyecto más allá de la lectura,
            promoviendo la ciencia ciudadana y el voluntariado.
        */}
        <div className="support-section">
          <h2>Tu Apoyo es Vital</h2>
          <p>
            Este proyecto es impulsado por la comunidad. Puedes apoyarnos compartiendo nuestra plataforma, 
            registrando especies en tus salidas a campo o colaborando como voluntario especializado 
            si eres estudiante de biología o áreas afines.
          </p>
          
          {/* Enlace de contacto: Abre el cliente de correo predeterminado del usuario */}
          <a href="mailto:apoyo@biopuebla.mx" className="btn-apoyo">
            ¿Cómo puedo ayudar?
          </a>
        </div>
      </div>

      {/* Componente de pie de página reutilizable */}
      <Footer />
    </>
  );
};

export default QuienesSomos;