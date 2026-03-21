import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ODS15 from './pages/ODS15';
import QuienesSomos from './pages/QuienesSomos';
import RegistroEspecies from './pages/RegistroEspecies';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import { estaAutenticado } from './services/api';
import './App.css';

// Redirige al login si no hay sesión activa
function RutaProtegida({ children }) {
  return estaAutenticado() ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/"              element={<Home />} />
        <Route path="/ods15"         element={<ODS15 />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/login"         element={<Login />} />

        {/* Rutas protegidas */}
        <Route path="/registro-especies" element={
          <RutaProtegida><RegistroEspecies /></RutaProtegida>
        }/>
        <Route path="/perfil" element={
          <RutaProtegida><Perfil /></RutaProtegida>
        }/>

        {/* Cualquier ruta desconocida → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;