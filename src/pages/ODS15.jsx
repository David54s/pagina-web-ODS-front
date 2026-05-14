/**
 * COMPONENTE: ODS15
 * Este componente es una página informativa dedicada al Objetivo de Desarrollo Sostenible 15:
 * Vida de Ecosistemas Terrestres. Se enfoca en la relevancia de este objetivo para el estado de Puebla.
 */

// Importación de componentes de estructura global
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Importación de los estilos específicos (maneja el diseño de las tarjetas y el grid)
import './ODS15.css';

const ODS15 = () => {
  return (
    <>
      {/* Barra de navegación superior */}
      <Navigation />
      
      {/* Contenedor principal con clase para aplicar márgenes y centrado */}
      <main className="main-container">
         
        {/* ENCABEZADO DE LA PÁGINA (Header ODS):
            Presenta el número del ODS de forma destacada y el título oficial.
        */}
        <div className="ods-header">
          <div className="ods-number">15</div> {/* Círculo o cuadro distintivo del ODS */}
          <div>
            <h1>Vida de Ecosistemas Terrestres</h1>
            <p>Proteger, concientizar y promover el uso sostenible de los ecosistemas terrestres.</p>
          </div>
        </div>

        {/* Texto introductorio con énfasis (strong) para resaltar conceptos clave */}
        <p className="intro-text">
          El <strong>ODS 15</strong> es un llamado global para detener la pérdida de biodiversidad que amenaza nuestro planeta. 
          Los ecosistemas terrestres, como los bosques y humedales, son esenciales para la supervivencia humana, 
          proporcionando aire limpio, agua y alimentos.
        </p>

        {/* SECCIÓN DE METAS: 
            Utiliza un sistema de tarjetas (cards) para desglosar los objetivos específicos.
        */}
        <section className="metas-section">
          <h2>Metas Principales</h2>
          
          {/* Tarjeta de ancho completo (full-width) para información teórica */}
          <div className="target-card full-width">
            <strong> Conservación de Bosques</strong>
            <p>Asegurar la conservación y el uso sostenible de los ecosistemas de montaña y bosques templados. Los bosques templados de Puebla, especialmente en la Sierra Norte y las laderas de La Malinche, albergan especies únicas y son fundamentales para la regulación del clima y la conservación del agua.</p>
          </div>

          {/* GRID DE IMÁGENES:
              Sección diseñada para mostrar contenido visual. Las imágenes se gestionan 
              probablemente vía CSS mediante las clases 'image-bosques' e 'image-biodiversidad'.
          */}
          <div className="grid-images">
            <div className="target-card image-placeholder image-bosques">
              {/* Espacio reservado para fotografía de bosques de Puebla */}
            </div>

            <div className="target-card image-placeholder image-biodiversidad">
              {/* Espacio reservado para fotografía de biodiversidad local */}
            </div>
          </div>

          {/* Segunda tarjeta de contenido sobre especies locales de Puebla */}
          <div className="target-card full-width">
            <strong>Protección de Biodiversidad</strong>
            <p>Adoptar medidas urgentes para reducir la degradación de los hábitats naturales y proteger especies en peligro. En Puebla, esto incluye la protección de especies endémicas como el conejo teporingo, el ajolote y diversas especies de aves migratorias que dependen de nuestros ecosistemas.</p>
          </div>
        </section>

        {/* SECCIÓN DE CONTEXTO LOCAL:
            Explica cómo el proyecto BioPuebla contribuye directamente a este ODS.
        */}
        <section className="accion-section">
          <h2>Acción en Puebla</h2>
          <p>
            A través de nuestro registro de especies, alimentamos bases de datos que permiten a las autoridades locales 
            tomar mejores decisiones sobre la protección de áreas como la Malinche o los bosques de la Sierra Norte.
          </p>
        </section>
      </main>

      {/* Pie de página con información de contacto o legal */}
      <Footer />
    </>
  );
};

export default ODS15;