/**
 * PÁGINA: Home
 * Página principal (Landing Page) de la aplicación.
 * Conectada al endpoint GET /ranking/ del backend Django.
 */

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './Home.css';

// ─── URL base de la API ────────────────────────────────────────────────────────
const API_BASE = 'http://localhost:8000';

const MEDALLAS = ['🥇', '🥈', '🥉'];

// ─── Componente principal ──────────────────────────────────────────────────────
const Home = () => {
  const [ranking,  setRanking]  = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error,    setError]    = useState(null);

  // ── Fetch al backend ────────────────────────────────────────────────────────
  useEffect(() => {
    const cargarRanking = async () => {
      try {
        setCargando(true);
        setError(null);

        const res = await fetch(`${API_BASE}/ranking/?limit=8`);
        if (!res.ok) throw new Error(`Error ${res.status}`);

        const data = await res.json();

        // DRF con paginación → { results: [...] } | sin paginación → [...]
        const lista = Array.isArray(data) ? data : (data.results ?? []);

        // Mapea campos del backend al shape del componente
        // Backend: { id, nombre_completo, municipio_principal, total_aportes, iniciales }
        setRanking(lista.map((u) => ({
          id:        u.id,
          nombre:    u.nombre_completo,
          municipio: u.municipio_principal || '—',
          aportes:   u.total_aportes,
          iniciales: u.iniciales,
        })));
      } catch (err) {
        console.error('Error cargando ranking:', err);
        setError('No se pudo cargar el ranking.');
      } finally {
        setCargando(false);
      }
    };

    cargarRanking();
  }, []);

  return (
    <>
      <Navigation />

      <main>
        {/* ── HERO ──────────────────────────────────────────────────── */}
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

        {/* ── ESTADÍSTICAS ─────────────────────────────────────────── */}
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

        {/* ── RANKING DE COLABORADORES ──────────────────────────────── */}
        <section className="ranking-section">
          <div className="ranking-header">
            <span className="ranking-leaf">🌿</span>
            <h2>Colaboradores Destacados</h2>
            <p className="ranking-subtitle">
              Los guardianes más activos de la biodiversidad poblana
            </p>
          </div>

          {/* Estado: cargando */}
          {cargando && (
            <div className="ranking-loading">
              <div className="ranking-spinner" />
              <p>Cargando ranking…</p>
            </div>
          )}

          {/* Estado: error */}
          {error && !cargando && (
            <p className="ranking-error">⚠️ {error}</p>
          )}

          {/* Estado: datos listos */}
          {!cargando && !error && ranking.length > 0 && (
            <div className="ranking-grid">
              {/* Podio top-3 */}
              <div className="ranking-podio">
                {ranking.slice(0, 3).map((user, index) => (
                  <div key={user.id} className={`podio-card podio-${index + 1}`}>
                    <div className="podio-medalla">{MEDALLAS[index]}</div>
                    <div className="podio-avatar">{user.iniciales}</div>
                    <div className="podio-info">
                      <strong>{user.nombre}</strong>
                      <span className="podio-municipio">📍 {user.municipio}</span>
                      <span className="podio-aportes">{user.aportes} aportes</span>
                    </div>
                    <div
                      className="podio-bar"
                      style={{ '--bar-height': `${(user.aportes / ranking[0].aportes) * 100}%` }}
                    />
                  </div>
                ))}
              </div>

              {/* Lista del 4° en adelante */}
              <div className="ranking-lista">
                {ranking.slice(3).map((user, index) => (
                  <div key={user.id} className="ranking-row">
                    <span className="ranking-pos">#{index + 4}</span>
                    <div className="ranking-avatar-sm">{user.iniciales}</div>
                    <div className="ranking-row-info">
                      <strong>{user.nombre}</strong>
                      <span>📍 {user.municipio}</span>
                    </div>
                    <div className="ranking-badge">{user.aportes} aportes</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sin datos */}
          {!cargando && !error && ranking.length === 0 && (
            <p className="ranking-empty">Aún no hay colaboradores registrados.</p>
          )}

          <p className="ranking-note">* Datos actualizados semanalmente</p>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;