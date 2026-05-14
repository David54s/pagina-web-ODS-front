/**
 * COMPONENTE: RegistroEspecies
 * Permite a los usuarios documentar la biodiversidad de dos formas:
 * 1. Captura instantánea (abriendo la cámara del móvil).
 * 2. Carga de archivo (fotos tomadas previamente).
 */

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { subirFotografia } from '../services/api'; // Servicio para enviar multipart/form-data al backend
import './RegistroEspecies.css';

const RegistroEspecies = () => {
  // ── ESTADOS PARA FOTO INSTANTÁNEA (CÁMARA) ───────────────────────────
  const [fotoInstantanea, setFotoInstantanea] = useState(null); // Almacena el archivo File de la cámara
  const [lugarInstantanea, setLugarInstantanea] = useState(''); // Texto del lugar para la captura rápida
  const [mostrarLugarInput, setMostrarLugarInput] = useState(false); // Controla si se despliega el input tras tomar la foto

  // ── ESTADOS PARA EL MODAL (FOTO ANTERIOR) ────────────────────────
  const [showModal, setShowModal] = useState(false); // Visibilidad del modal
  const [modalData, setModalData] = useState({ imagen: null, fecha: '', zona: '' }); // Datos del formulario del modal

  // ── ESTADOS DE CARGA Y FEEDBACK ─────────────────────
  const [cargando, setCargando] = useState(false); // Estado visual para deshabilitar botones durante la subida
  const [mensaje, setMensaje] = useState(null); // Objeto de retroalimentación: { tipo: 'exito'|'error', texto: '' }

  // ── MANEJADORES PARA FOTO INSTANTÁNEA ────────────────────────────────

  /**
   * handleCapturePhoto:
   * Detecta cuando el usuario toma una foto con la cámara del dispositivo.
   */
  const handleCapturePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoInstantanea(file);
      setMostrarLugarInput(true); // Una vez capturada, pedimos el lugar
      setMensaje(null); // Limpiamos mensajes previos
    }
  };

  /**
   * handleEnviarInstantanea:
   * Valida y envía la foto tomada con la cámara al servidor.
   */
  const handleEnviarInstantanea = async () => {
    if (!lugarInstantanea.trim()) {
      setMensaje({ tipo: 'error', texto: 'Por favor ingresa el lugar donde tomaste la foto.' });
      return;
    }
    setCargando(true);
    setMensaje(null);
    try {
      // Llamada al servicio API
      await subirFotografia(fotoInstantanea, lugarInstantanea.trim());
      setMensaje({ tipo: 'exito', texto: '¡Fotografía registrada con éxito! Gracias por tu aporte a BioPuebla.' });
      
      // Resetear formulario de instantánea
      setFotoInstantanea(null);
      setLugarInstantanea('');
      setMostrarLugarInput(false);
    } catch (err) {
      setMensaje({ tipo: 'error', texto: err.message || 'Ocurrió un error al subir la foto.' });
    } finally {
      setCargando(false);
    }
  };

  // ── MANEJADORES PARA EL MODAL (FOTO DE GALERÍA) ───────────────────────────

  /**
   * handleModalChange: Maneja cambios en los inputs de texto/fecha del modal.
   */
  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * handleModalImageChange: Maneja la selección de archivos desde la galería.
   */
  const handleModalImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setModalData(prev => ({ ...prev, imagen: file }));
  };

  /**
   * closeModal: Cierra el modal y limpia sus datos internos.
   */
  const closeModal = () => {
    setShowModal(false);
    setModalData({ imagen: null, fecha: '', zona: '' });
  };

  /**
   * handleModalSubmit:
   * Procesa el envío de fotografías que ya estaban en el dispositivo del usuario.
   */
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalData.imagen || !modalData.zona) {
      setMensaje({ tipo: 'error', texto: 'Por favor completa la imagen y la zona.' });
      closeModal();
      return;
    }
    setCargando(true);
    setMensaje(null);
    closeModal(); // Cerramos el modal para mostrar el progreso en la pantalla principal
    try {
      await subirFotografia(modalData.imagen, modalData.zona.trim());
      setMensaje({ tipo: 'exito', texto: '¡Fotografía registrada con éxito! Gracias por tu aporte a BioPuebla.' });
    } catch (err) {
      setMensaje({ tipo: 'error', texto: err.message || 'Ocurrió un error al subir la foto.' });
    } finally {
      setCargando(false);
    }
  };

  // ── RENDERIZADO (JSX) ───────────────────────────────────────────────────

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

          {/* MENSAJE DE RETROALIMENTACIÓN: Se renderiza dinámicamente según el éxito o error */}
          {mensaje && (
            <div className={`registro-mensaje registro-mensaje--${mensaje.tipo}`}>
              {mensaje.tipo === 'exito' ? '✅' : '⚠️'} {mensaje.texto}
            </div>
          )}

          <div className="camera-section">
            <div className="button-group">

              {/* OPCIÓN 1: Tomar foto ahora (Uso de atributo 'capture' para móviles) */}
              <label htmlFor="capture-photo" className="camera-button">
                <i className="fas fa-camera"></i>
                <span>Tomar Foto Ahora</span>
                <input
                  id="capture-photo"
                  type="file"
                  accept="image/*"
                  capture="environment" // Fuerza la apertura de la cámara trasera en dispositivos móviles
                  onChange={handleCapturePhoto}
                  style={{ display: 'none' }}
                />
              </label>

              {/* OPCIÓN 2: Subir foto anterior (Abre el modal) */}
              <button
                type="button"
                className="camera-button upload-button"
                onClick={() => { setShowModal(true); setMensaje(null); }}
                disabled={cargando}
              >
                <i className="fas fa-upload"></i>
                <span>Subir Foto Anterior</span>
              </button>
            </div>

            {/* SECCIÓN DINÁMICA: Aparece solo tras capturar una foto instantánea */}
            {mostrarLugarInput && fotoInstantanea && (
              <div className="lugar-input-section">
                <p className="file-name">✓ {fotoInstantanea.name}</p>
                <input
                  type="text"
                  className="lugar-input"
                  placeholder="¿Dónde tomaste esta foto? Ej: Sierra Norte de Puebla..."
                  value={lugarInstantanea}
                  onChange={(e) => setLugarInstantanea(e.target.value)}
                />
                <button
                  className="btn-enviar-foto"
                  onClick={handleEnviarInstantanea}
                  disabled={cargando}
                >
                  {cargando ? 'Enviando...' : '📤 Enviar fotografía'}
                </button>
              </div>
            )}

            {/* Estado visual de carga general */}
            {cargando && !mostrarLugarInput && (
              <p className="file-name">Enviando fotografía...</p>
            )}
          </div>
        </div>
      </main>

      {/* MODAL: Formulario detallado para fotos de archivo */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          {/* stopPropagation evita que el modal se cierre al hacer clic dentro del formulario */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>

            <h2>Subir Foto Anterior</h2>
            <p className="modal-subtitle">Completa los datos de tu fotografía</p>

            <form onSubmit={handleModalSubmit}>
              {/* Selección de archivo */}
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

              {/* Fecha de la captura (Opcional pero recomendado) */}
              <div className="form-group">
                <label htmlFor="modal-fecha">Fecha de la fotografía</label>
                <input
                  type="date"
                  id="modal-fecha"
                  name="fecha"
                  value={modalData.fecha}
                  onChange={handleModalChange}
                />
              </div>

              {/* Zona geográfica */}
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
                  Confirmar y subir
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