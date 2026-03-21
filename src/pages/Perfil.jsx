import { useNavigate } from 'react-router-dom';
import { getUsuarioActual, logout } from '../services/api';
import Navigation from '../components/Navigation';
import './Perfil.css';

const Perfil = () => {
  const navigate = useNavigate();
  const usuario  = getUsuarioActual();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!usuario) {
    navigate('/login');
    return null;
  }

  // Iniciales del nombre para el avatar
  const iniciales = usuario.nombre_completo
    .split(' ')
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase())
    .join('');

  // Formatear fecha de registro
  const fechaRegistro = usuario.fecha_registro
    ? new Date(usuario.fecha_registro).toLocaleDateString('es-MX', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : 'No disponible';

  return (
    <>
      <Navigation />

      <div className="perfil-page">
        <div className="perfil-card">

          {/* Avatar con iniciales */}
          <div className="perfil-avatar">
            {iniciales}
          </div>

          <h2 className="perfil-nombre">{usuario.nombre_completo}</h2>
          <p className="perfil-correo">{usuario.correo_electronico}</p>

          <div className="perfil-divider" />

          <div className="perfil-info">
            <div className="perfil-info-item">
              <span className="perfil-info-label">Miembro desde</span>
              <span className="perfil-info-value">{fechaRegistro}</span>
            </div>
            <div className="perfil-info-item">
              <span className="perfil-info-label">Términos aceptados</span>
              <span className="perfil-info-value">
                {usuario.terminos_condiciones ? '✅ Sí' : '❌ No'}
              </span>
            </div>
          </div>

          <button className="btn-cerrar-sesion" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Perfil;