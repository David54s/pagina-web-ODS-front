/**
 * COMPONENTE: Perfil
 * Muestra la información del usuario logueado y su historial de aportes (fotografías).
 * Incluye funcionalidades para cerrar sesión y cargar datos dinámicos desde el servidor.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Importación de servicios de comunicación con el Backend
import { getUsuarioActual, logout, listarFotografias, eliminarFotografia } from '../services/api';
import Navigation from '../components/Navigation';
import './Perfil.css';

const Perfil = () => {
  const navigate  = useNavigate();
  
  // Obtenemos los datos del usuario guardados localmente (ej. en localStorage o memoria)
  const usuario   = getUsuarioActual();

  // ESTADOS para la gestión de la galería de aportes
  const [fotografias, setFotografias]     = useState([]);     // Lista de fotos del usuario
  const [cargandoFotos, setCargandoFotos] = useState(true);   // Indicador de carga inicial
  const [errorFotos, setErrorFotos]       = useState(null);   // Mensaje en caso de fallo de red
  const [eliminando, setEliminando]       = useState(null);   // ID de la foto que se está borrando

  // ── CICLO DE VIDA: Cargar fotos al montar el componente ───────────────────
  useEffect(() => {
    async function cargar() {
      try {
        // Llamada a la API para traer solo las fotos de este usuario
        const data = await listarFotografias();
        setFotografias(data);
      } catch (err) {
        setErrorFotos('No se pudieron cargar los aportes.');
      } finally {
        setCargandoFotos(false);
      }
    }
    cargar();
  }, []);

  // ── MANEJADORES DE EVENTOS (Handlers) ────────────────────────────────────────────

  /**
   * handleEliminar:
   * Borra un aporte específico de la base de datos tras confirmar con el usuario.
   */
  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este aporte?')) return;
    setEliminando(id);
    try {
      await eliminarFotografia(id);
      // Actualizamos el estado local para quitar la foto de la vista sin recargar
      setFotografias(prev => prev.filter(f => f.id !== id));
    } catch {
      alert('No se pudo eliminar la fotografía. Intenta de nuevo.');
    } finally {
      setEliminando(null);
    }
  };

  /**
   * handleLogout:
   * Borra tokens o sesiones activas y redirige a la pantalla de acceso.
   */
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // SEGURIDAD: Si no hay usuario en sesión, redirigimos inmediatamente al Login
  if (!usuario) {
    navigate('/login');
    return null;
  }

  // ── HELPERS DE FORMATO (Lógica de presentación) ───────────────────────────────────────

  /**
   * Obtiene las iniciales del nombre (ej: "Juan Pérez" -> "JP") 
   * para mostrar un avatar circular elegante.
   */
  const iniciales = usuario.nombre_completo
    .split(' ')
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase())
    .join('');

  /**
   * Convierte fechas ISO a formato legible (ej: "22 de marzo de 2026")
   */
  const fechaRegistro = usuario.fecha_registro
    ? new Date(usuario.fecha_registro).toLocaleDateString('es-MX', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : 'No disponible';

  const formatearFecha = (iso) =>
    new Date(iso).toLocaleDateString('es-MX', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  // ── RENDERIZADO (JSX) ───────────────────────────────────────────────────
  return (
    <>
      <Navigation />

      <div className="perfil-page">

        {/* SECCIÓN 1: Tarjeta de perfil (Información del Usuario) */}
        <div className="perfil-card">
          <div className="perfil-avatar">{iniciales}</div>
          <h2 className="perfil-nombre">{usuario.nombre_completo}</h2>
          <p className="perfil-correo">{usuario.correo_electronico}</p>

          <div className="perfil-divider" />

          {/* Estadísticas rápidas del usuario */}
          <div className="perfil-info">
            <div className="perfil-info-item">
              <span className="perfil-info-label">Miembro desde</span>
              <span className="perfil-info-value">{fechaRegistro}</span>
            </div>
            <div className="perfil-info-item">
              <span className="perfil-info-label">Términos aceptados</span>
              <span className="perfil-info-value">
                {usuario.terminos_condiciones ? '✅' : '❌'}
              </span>
            </div>
            <div className="perfil-info-item">
              <span className="perfil-info-label">Aportes realizados</span>
              <span className="perfil-info-value">
                {cargandoFotos ? '...' : fotografias.length}
              </span>
            </div>
          </div>

          <button className="btn-cerrar-sesion" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>

        {/* SECCIÓN 2: Historial de aportes (Galería de imágenes) */}
        <div className="perfil-aportes">
          <h3 className="aportes-titulo"> Mis Aportes a BioPuebla</h3>

          {/* Feedback visual de carga o error */}
          {cargandoFotos && (
            <p className="aportes-estado">Cargando aportes...</p>
          )}

          {errorFotos && (
            <p className="aportes-estado aportes-error">{errorFotos}</p>
          )}

          {/* Caso: El usuario no ha subido fotos todavía */}
          {!cargandoFotos && !errorFotos && fotografias.length === 0 && (
            <div className="aportes-vacio">
              <p>Aún no has registrado ningún avistamiento.</p>
              <a href="/registro-especies" className="btn-primer-aporte">
                ¡Registra tu primer aporte!
              </a>
            </div>
          )}

          {/* Renderizado de la cuadrícula de fotos */}
          {!cargandoFotos && fotografias.length > 0 && (
            <div className="aportes-grid">
              {fotografias.map((foto) => (
                <div key={foto.id} className="aporte-card">

                  {/* Visualización de la Imagen o Placeholder si falla */}
                  <div className="aporte-imagen-wrapper">
                    {foto.imagen_url ? (
                      <img
                        src={foto.imagen_url}
                        alt={`Aporte en ${foto.lugar}`}
                        className="aporte-imagen"
                      />
                    ) : (
                      <div className="aporte-imagen-placeholder">
                        <i className="fas fa-image"></i>
                      </div>
                    )}
                  </div>

                  {/* Datos del avistamiento */}
                  <div className="aporte-info">
                    <div className="aporte-dato">
                      <span className="aporte-icono">📍</span>
                      <span className="aporte-texto">{foto.lugar}</span>
                    </div>
                    <div className="aporte-dato">
                      <span className="aporte-icono">📅</span>
                      <span className="aporte-texto">{formatearFecha(foto.fecha_envio)}</span>
                    </div>
                  </div>

                  {/* <button
                    className="aporte-eliminar"
                    onClick={() => handleEliminar(foto.id)}
                    disabled={eliminando === foto.id}
                    title="Eliminar aporte"
                  >
                    {eliminando === foto.id ? '...' : '🗑️'}
                  </button> */}

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default Perfil;