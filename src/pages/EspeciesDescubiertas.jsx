/**
 * PÁGINA: EspeciesDescubiertas
 * Mapa con imagen del estado de Puebla y 5 marcadores de fotos aleatorias.
 * Las posiciones en el mapa son fijas y simuladas (siempre dentro del estado).
 *
 * Backend: GET /fotos/mapa/ → devuelve 5 fotos al azar de la BD.
 */

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './EspeciesDescubiertas.css';

import mapaPuebla from '../assets/mapa-corregido-puebla.png';

// ─── URL base ─────────────────────────────────────────────────────────────────
const API_BASE = 'http://localhost:8000';

// ─── Posiciones fijas dentro del mapa (viewBox 0 0 500 380) ──────────────────
// Estos puntos están calibrados para caer visualmente dentro del
// contorno del estado de Puebla. Ajústalos si tu imagen tiene márgenes distintos.
const SLOTS_MAPA = [
  { x: 210, y: 145 },   // Sierra Norte
  { x: 300, y: 175 },   // Centro / Puebla capital
  { x: 255, y: 235 },   // Atlixco / Izúcar
  { x: 355, y: 210 },   // Tehuacán
  { x: 175, y: 200 },   // Mixteca
];

// ─── Componente principal ──────────────────────────────────────────────────────
const EspeciesDescubiertas = () => {
  const [marcadores,    setMarcadores]    = useState([]);
  const [cargando,      setCargando]      = useState(true);
  const [error,         setError]         = useState(null);
  const [fotoActiva,    setFotoActiva]    = useState(null);
  const [imagenCargada, setImagenCargada] = useState(false);

  // ── Fetch: 5 fotos aleatorias ───────────────────────────────────────────────
  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true);
        setError(null);

        const res = await fetch(`${API_BASE}/fotos/mapa/`);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const fotos = await res.json(); // ya es un array plano (sin paginación)

        // Combina cada foto con su slot de posición fija en el mapa
        const combinadas = fotos.map((foto, i) => ({
          id:        foto.id,
          foto:      foto.imagen_url,
          lugar:     foto.lugar,
          autor:     foto.usuario_nombre,
          fecha:     foto.fecha_envio,
          x:         SLOTS_MAPA[i].x,
          y:         SLOTS_MAPA[i].y,
        }));

        setMarcadores(combinadas);
      } catch (err) {
        console.error('Error cargando fotos del mapa:', err);
        setError('No se pudieron cargar las fotos. Intenta de nuevo más tarde.');
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  const abrirModal  = (m) => { setImagenCargada(false); setFotoActiva(m); };
  const cerrarModal = () => setFotoActiva(null);
  const handleOverlayClick = (e) => { if (e.target === e.currentTarget) cerrarModal(); };

  return (
    <>
      <Navigation />

      <main className="ed-main">
        {/* ── Encabezado ─────────────────────────────────────────── */}
        <section className="ed-hero">
          <div className="ed-hero-content">
            <span className="ed-eyebrow">🗺️ Mapa de Biodiversidad</span>
            <h1>Especies Descubiertas</h1>
            <p>
              Explora los hallazgos reportados por nuestra comunidad a lo largo
              del estado de Puebla. Haz clic en cada marcador para conocer la especie.
            </p>
            {!cargando && !error && (
              <div className="ed-hero-stats">
                <span>🔵 {marcadores.length} hallazgos en el mapa</span>
              </div>
            )}
          </div>
        </section>

        {/* ── Mapa ───────────────────────────────────────────────── */}
        <section className="ed-map-section">

          {cargando && (
            <div className="ed-status">
              <div className="ed-spinner" />
              <p>Cargando mapa…</p>
            </div>
          )}

          {error && !cargando && (
            <div className="ed-status ed-status--error">
              <span>⚠️</span><p>{error}</p>
            </div>
          )}

          {!cargando && !error && (
            <div className="ed-map-wrapper">
              <svg
                viewBox="0 0 500 380"
                className="ed-map-svg"
                aria-label="Mapa del estado de Puebla"
              >
                <defs>
                  <filter id="shadow-marker">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.35)" />
                  </filter>
                  {marcadores.map((m) => (
                    <clipPath key={`clip-${m.id}`} id={`clip-${m.id}`}>
                      <circle cx={m.x} cy={m.y} r="18" />
                    </clipPath>
                  ))}
                </defs>

                {/* Imagen de fondo: mapa PNG de Puebla */}
                <image
                  href={mapaPuebla}
                  x="0" y="0" width="500" height="380"
                  preserveAspectRatio="none"
                />

                {/* Marcadores */}
                {marcadores.map((m) => (
                  <g
                    key={m.id}
                    className="ed-marker"
                    onClick={() => abrirModal(m)}
                    role="button"
                    aria-label={`Ver foto de ${m.lugar}`}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && abrirModal(m)}
                  >
                    {/* Anillo pulsante */}
                    <circle
                      cx={m.x} cy={m.y} r="26"
                      fill="none" stroke="#4c994c"
                      strokeWidth="1.5" opacity="0.5"
                      className="ed-pulse-ring"
                    />
                    {/* Fondo blanco */}
                    <circle
                      cx={m.x} cy={m.y} r="20"
                      fill="white" filter="url(#shadow-marker)"
                    />
                    {/* Foto recortada en círculo */}
                    <image
                      href={m.foto}
                      x={m.x - 18} y={m.y - 18}
                      width="36" height="36"
                      clipPath={`url(#clip-${m.id})`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                    {/* Borde verde */}
                    <circle
                      cx={m.x} cy={m.y} r="18"
                      fill="none" stroke="#2d5a27" strokeWidth="1.5"
                    />
                  </g>
                ))}
              </svg>

              {/* Leyenda */}
              <div className="ed-legend">
                <p className="ed-legend-title">Instrucciones</p>
                <ul>
                  <li>Haz clic en un círculo para ver la foto</li>
                  <li>Se muestran 5 hallazgos al azar de la comunidad</li>
                </ul>
                <p className="ed-legend-note">
                  Mostrando <strong>{marcadores.length}</strong> de las fotos registradas
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ── Galería ────────────────────────────────────────────── */}
        {!cargando && !error && marcadores.length > 0 && (
          <section className="ed-gallery-section">
            <h2>Hallazgos en el mapa</h2>
            <div className="ed-gallery-grid">
              {marcadores.map((m) => (
                <button
                  key={m.id}
                  className="ed-gallery-card"
                  onClick={() => abrirModal(m)}
                >
                  <div className="ed-gallery-img-wrap">
                    <img src={m.foto} alt={`Foto en ${m.lugar}`} loading="lazy" />
                  </div>
                  <div className="ed-gallery-info">
                    <strong>📍 {m.lugar}</strong>
                    <span>👤 {m.autor}</span>
                    <span>📅 {m.fecha}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ── Modal ──────────────────────────────────────────────────── */}
      {fotoActiva && (
        <div
          className="ed-modal-overlay"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
        >
          <div className="ed-modal">
            <button className="ed-modal-close" onClick={cerrarModal} aria-label="Cerrar">✕</button>

            <div className="ed-modal-img-wrap">
              {!imagenCargada && <div className="ed-modal-skeleton" />}
              <img
                src={fotoActiva.foto}
                alt={`Foto en ${fotoActiva.lugar}`}
                className={`ed-modal-img ${imagenCargada ? 'loaded' : ''}`}
                onLoad={() => setImagenCargada(true)}
              />
            </div>

            <div className="ed-modal-body">
              <h2>📍 {fotoActiva.lugar}</h2>

              <div className="ed-modal-meta">
                <div className="ed-meta-item">
                  <span className="ed-meta-icon">👤</span>
                  <div>
                    <span className="ed-meta-label">Fotografiado por</span>
                    <span className="ed-meta-value">{fotoActiva.autor}</span>
                  </div>
                </div>
                <div className="ed-meta-item">
                  <span className="ed-meta-icon">📅</span>
                  <div>
                    <span className="ed-meta-label">Fecha</span>
                    <span className="ed-meta-value">{fotoActiva.fecha}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default EspeciesDescubiertas;