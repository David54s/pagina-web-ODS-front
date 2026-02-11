import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './ODS15.css';

const ODS15 = () => {
  return (
    <>
      <Navigation />
      
      <main className="main-container">
         
        <div className="ods-header">
          <div className="ods-number">15</div>
          <div>
            <h1>Vida de Ecosistemas Terrestres</h1>
            <p>Proteger, restablecer y promover el uso sostenible de los ecosistemas terrestres.</p>
          </div>
        </div>

        <p className="intro-text">
          El <strong>ODS 15</strong> es un llamado global para detener la pérdida de biodiversidad que amenaza nuestro planeta. 
          Los ecosistemas terrestres, como los bosques y humedales, son esenciales para la supervivencia humana, 
          proporcionando aire limpio, agua y alimentos.
        </p>

        <section className="metas-section">
          <h2>Metas Principales</h2>
          <div className="grid-targets">
            <div className="target-card">
              <strong>🌲 Conservación de Bosques</strong>
              <p>Asegurar la conservación y el uso sostenible de los ecosistemas de montaña y bosques templados.</p>
            </div>

            <div className="target-card">
              <strong>🦋 Protección de Biodiversidad</strong>
              <p>Adoptar medidas urgentes para reducir la degradación de los hábitats naturales y proteger especies en peligro.</p>
            </div>

            <div className="target-card image-placeholder">
              <strong>📷 Imagen ilustrativa</strong>
              <p>Espacio para imagen relacionada</p>
            </div>

            <div className="target-card image-placeholder">
              <strong>📷 Imagen ilustrativa</strong>
              <p>Espacio para imagen relacionada</p>
            </div>
          </div>
        </section>

        <section className="accion-section">
          <h2>Acción en Puebla</h2>
          <p>
            A través de nuestro registro de especies, alimentamos bases de datos que permiten a las autoridades locales 
            tomar mejores decisiones sobre la protección de áreas como la Malinche o los bosques de la Sierra Norte.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ODS15;