/**
 * COMPONENTE: Login
 * Maneja tanto el inicio de sesión como el registro de usuarios en una sola vista.
 * Utiliza hooks de React y React Router para la navegación y el estado.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, registrar } from '../services/api'; // Funciones que conectan con el Backend
import './Login.css';

const Login = () => {
  // Hook para redireccionar al usuario programáticamente (ej. después de loguearse)
  const navigate = useNavigate();

  // ESTADO: isLogin 
  // Controla si mostramos el formulario de Login (true) o el de Registro (false)
  const [isLogin, setIsLogin] = useState(true);

  // ESTADO: formData
  // Objeto único que almacena todos los valores de los inputs del formulario
  const [formData, setFormData] = useState({
    nombre:         '',
    email:          '',
    password:       '',
    aceptaTerminos: false,
  });

  // ESTADOS DE CONTROL: Para manejar la interfaz durante la carga o ante errores
  const [cargando, setCargando] = useState(false); // Bloquea el botón mientras espera al servidor
  const [error,    setError]    = useState('');    // Almacena mensajes de error para el usuario

  // ── MANEJADORES (Handlers) ───────────────────────────────────────────────

  /**
   * handleChange:
   * Se ejecuta cada vez que el usuario escribe en un input o marca un checkbox.
   * Actualiza dinámicamente el estado 'formData' usando el atributo 'name' del input.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      // Si es checkbox usa 'checked', si no, usa 'value'
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');   // Limpiamos errores previos en cuanto el usuario vuelve a escribir
  };

  /**
   * handleSubmit:
   * Se ejecuta al enviar el formulario (clic en el botón o Enter).
   * Contiene la lógica principal para conectar con la API de BioPuebla.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setError('');
    setCargando(true);

    try {
      if (isLogin) {
        // CASO: LOGIN
        // Enviamos correo y contraseña a la función del servicio API
        await login({
          correo_electronico: formData.email,
          contrasena:         formData.password,
        });
        navigate('/');   // Si es exitoso, mandamos al usuario al Home

      } else {
        // CASO: REGISTRO
        // Enviamos todos los datos necesarios para crear la cuenta
        await registrar({
          nombre_completo:      formData.nombre,
          correo_electronico:   formData.email,
          contrasena:           formData.password,
          terminos_condiciones: formData.aceptaTerminos,
        });
        
        // Tras registro exitoso, limpiamos el formulario y lo pasamos a modo Login
        setIsLogin(true);
        setFormData({ nombre: '', email: '', password: '', aceptaTerminos: false });
        alert('¡Registro exitoso! Ahora inicia sesión.');
      }

    } catch (err) {
      // Si algo falla (ej. contraseña incorrecta), guardamos el mensaje para mostrarlo
      setError(err.message);
    } finally {
      // Se ejecuta siempre, haya error o no, para habilitar de nuevo el botón
      setCargando(false);
    }
  };

  /**
   * cambiarModo:
   * Alterna entre la vista de Login y Registro, limpiando los campos por seguridad.
   */
  const cambiarModo = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ nombre: '', email: '', password: '', aceptaTerminos: false });
  };

  // ── RENDERIZADO (JSX) ─────────────────────────────────────────────────

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo visual pequeño */}
        <div className="mini-logo">🌿</div>

        {/* El título cambia dinámicamente según el estado 'isLogin' */}
        <h2>{isLogin ? 'Bienvenido de Nuevo' : 'Únete a BioPuebla'}</h2>
        <p>
          {isLogin
            ? 'Inicia sesión para continuar protegiendo nuestra biodiversidad.'
            : 'Forma parte de la red de conservación más grande de Puebla.'}
        </p>

        {/* RENDERIZADO CONDICIONAL: Solo muestra este div si existe un mensaje de error */}
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
          
          {/* Si NO es login (es registro), mostramos el campo para el Nombre */}
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

          {/* Campo de Email - Común para ambos modos */}
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

          {/* Campo de Contraseña - Común para ambos modos */}
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

          {/* Checkbox de Términos - Solo se muestra en el modo Registro */}
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

          {/* Botón de envío: Se deshabilita mientras la petición está en curso (cargando) */}
          <button type="submit" className="btn-submit" disabled={cargando}>
            {cargando
              ? (isLogin ? 'Iniciando sesión...' : 'Registrando...')
              : (isLogin ? 'Iniciar Sesión' : 'Registrarme')}
          </button>
        </form>

        <div className="divider"></div>

        {/* Sección para alternar entre "Ya tengo cuenta" y "Quiero registrarme" */}
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

        {/* Enlace para volver a la página de inicio (vía React Router) */}
        <Link to="/" className="back-home">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Login;