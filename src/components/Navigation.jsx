import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { estaAutenticado, getUsuarioActual, logout } from '../services/api';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate    = useNavigate();
  const autenticado = estaAutenticado();
  const usuario     = getUsuarioActual();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu  = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    closeMenu();
    await logout();
    navigate('/login');
  };

  return (
    <header className="main-header">
      <Link to="/" className="logo" onClick={closeMenu}>
        <span className="logo-icon">🌿</span>
        <span className="logo-text">BioPuebla</span>
      </Link>

      <nav>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/ods15"                onClick={closeMenu}>Información ODS 15</Link></li>
          <li><Link to="/quienes-somos"        onClick={closeMenu}>¿Quiénes somos?</Link></li>
          <li><Link to="/registro-especies"    onClick={closeMenu}>Registro de Especies</Link></li>

          {/* ── Nuevo enlace: Especies Descubiertas ── */}
          <li>
            <Link to="/EspeciesDescubiertas" onClick={closeMenu}>Especies Descubiertas</Link>
          </li>

          {autenticado ? (
            <>
              <li>
                <Link to="/perfil" className="btn-perfil" onClick={closeMenu}>
                  👤 {usuario?.nombre_completo?.split(' ')[0] || 'Mi perfil'}
                </Link>
              </li>
              <li>
                <button className="btn-logout" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="btn-login" onClick={closeMenu}>
                Login / Registro
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <button
        className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Menú"
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Navigation;