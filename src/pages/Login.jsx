import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    aceptaTerminos: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Iniciando sesión:', { email: formData.email });
      alert('¡Bienvenido de nuevo a BioPuebla!');
    } else {
      console.log('Registrando usuario:', formData);
      alert('¡Registro exitoso! Bienvenido a BioPuebla.');
    }
  };

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
              placeholder={isLogin ? 'Tu contraseña' : 'Crea una contraseña'}
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

          <button type="submit" className="btn-submit">
            {isLogin ? 'Iniciar Sesión' : 'Registrarme'}
          </button>
        </form>

        <div className="divider"></div>

        <div className="toggle-link">
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
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