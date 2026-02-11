import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './RegistroEspecies.css';

const RegistroEspecies = () => {
  const [formData, setFormData] = useState({
    especie: '',
    ubicacion: '',
    fecha: '',
    descripcion: '',
    imagen: null
  });
  
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    imagen: null,
    fecha: '',
    zona: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Capturar foto instantánea
  const handleCapturePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imagen: file
      }));
    }
  };

  // Abrir modal para subir imagen anterior
  const openModal = () => {
    setShowModal(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setShowModal(false);
    setModalData({
      imagen: null,
      fecha: '',
      zona: ''
    });
  };

  // Manejar subida de imagen en el modal
  const handleModalImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setModalData(prev => ({
        ...prev,
        imagen: file
      }));
    }
  };

  // Confirmar datos del modal
  const handleModalSubmit = (e) => {
    e.preventDefault();
    
    if (!modalData.imagen || !modalData.fecha || !modalData.zona) {
      alert('Por favor completa todos los campos del modal');
      return;
    }

    // Transferir datos del modal al formulario principal
    setFormData(prev => ({
      ...prev,
      imagen: modalData.imagen,
      fecha: modalData.fecha,
      ubicacion: modalData.zona
    }));

    closeModal();
    alert('¡Imagen cargada correctamente! Ahora completa los datos restantes.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    alert('¡Registro enviado! Gracias por tu contribución a BioPuebla.');
    
    // Limpiar formulario
    setFormData({
      especie: '',
      ubicacion: '',
      fecha: '',
      descripcion: '',
      imagen: null
    });
  };

  return (
    <>
      <Navigation />
      
      <main className="registro-hero">
        <div className="registro-content">
          <h1>¡Tu Avistamiento Cuenta!</h1>
          <p>
            Cada foto y dato que compartes nos ayuda a entender mejor la biodiversidad de Puebla 
            y a proteger sus especies. Gracias por ser parte de BioPuebla.
          </p>

          <div className="camera-section">
            <div className="button-group">
              {/* Botón para capturar foto instantánea */}
              <label htmlFor="capture-photo" className="camera-button">
                <i className="fas fa-camera"></i>
                <span>Tomar Foto Ahora</span>
                <input 
                  id="capture-photo" 
                  type="file" 
                  accept="image/*" 
                  capture="environment"
                  onChange={handleCapturePhoto}
                  style={{ display: 'none' }}
                />
              </label>

              {/* Botón para subir imagen anterior */}
              <button 
                type="button" 
                className="camera-button upload-button"
                onClick={openModal}
              >
                <i className="fas fa-upload"></i>
                <span>Subir Foto Anterior</span>
              </button>
            </div>

            {formData.imagen && (
              <p className="file-name">
                ✓ {formData.imagen.name}
              </p>
            )}
          </div>

        </div>
      </main>

      {/* Modal para subir imagen anterior */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            
            <h2>Subir Foto Anterior</h2>
            <p className="modal-subtitle">Completa los datos de tu fotografía</p>

            <form onSubmit={handleModalSubmit}>
              <div className="form-group">
                <label htmlFor="modal-image">Seleccionar imagen</label>
                <div className="file-input-wrapper">
                  <label htmlFor="modal-image" className="file-input-label">
                    <i className="fas fa-image"></i>
                    <span>
                      {modalData.imagen ? modalData.imagen.name : 'Elegir archivo...'}
                    </span>
                  </label>
                  <input
                    type="file"
                    id="modal-image"
                    accept="image/*"
                    onChange={handleModalImageChange}
                    style={{ display: 'none' }}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="modal-fecha">Fecha de la fotografía</label>
                <input
                  type="date"
                  id="modal-fecha"
                  name="fecha"
                  value={modalData.fecha}
                  onChange={handleModalChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-zona">Zona donde se tomó</label>
                <input
                  type="text"
                  id="modal-zona"
                  name="zona"
                  placeholder="Ej: Sierra Norte de Puebla, La Malinche..."
                  value={modalData.zona}
                  onChange={handleModalChange}
                  required
                />
              </div>

              <div className="modal-buttons">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-confirm">
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default RegistroEspecies;