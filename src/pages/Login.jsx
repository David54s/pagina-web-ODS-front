import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, registrar } from '../services/api';
import './Login.css';

const Login = () => {
  const navigate    = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    nombre:         '',
    email:          '',
    password:       '',
    aceptaTerminos: false,
  });

  const [cargando, setCargando] = useState(false);
  const [error,    setError]    = useState('');

  // ── Handlers ───────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');   // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      if (isLogin) {
        // ── LOGIN ──
        await login({
          correo_electronico: formData.email,
          contrasena:         formData.password,
        });
        navigate('/');   // Redirige al home tras login exitoso

      } else {
        // ── REGISTRO ──
        await registrar({
          nombre_completo:      formData.nombre,
          correo_electronico:   formData.email,
          contrasena:           formData.password,
          terminos_condiciones: formData.aceptaTerminos,
        });
        // Tras registrarse, llevar al login
        setIsLogin(true);
        setFormData({ nombre: '', email: '', password: '', aceptaTerminos: false });
        alert('¡Registro exitoso! Ahora inicia sesión.');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const cambiarModo = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ nombre: '', email: '', password: '', aceptaTerminos: false });
  };

  // ── Render ─────────────────────────────────────────────────

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="mini-logo">🌿</div>
        <h2>{isLogin ? 'Bienvenido de Nuevo' : 'Únete a BioPuebla'}</h2>
        <p>
          {isLogin
            ? 'Inicia sesión para continuar protegiendo nuestra biodiversidad.'
            : 'Forma parte de la red de conservación más grande de Puebla.'}
        </p>

        {/* Mensaje de error */}
        {error && (
          <div className="error-msg" style={{
            background: '#ffe0e0',
            color: '#c0392b',
            padding: '10px 14px',
            borderRadius: '8px',
            marginBottom: '12px',
            fontSize: '0.9rem',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder={isLogin ? 'Tu contraseña' : 'Crea una contraseña (mín. 6 caracteres)'}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <label className="terms">
              <input
                type="checkbox"
                name="aceptaTerminos"
                checked={formData.aceptaTerminos}
                onChange={handleChange}
                required
              />
              Acepto los términos y condiciones de BioPuebla.
            </label>
          )}

          <button type="submit" className="btn-submit" disabled={cargando}>
            {cargando
              ? (isLogin ? 'Iniciando sesión...' : 'Registrando...')
              : (isLogin ? 'Iniciar Sesión' : 'Registrarme')}
          </button>
        </form>

        <div className="divider"></div>

        <div className="toggle-link">
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
          <button
            type="button"
            onClick={cambiarModo}
            className="link-button"
          >
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </div>

        <Link to="/" className="back-home">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Login;