import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ODS15 from './pages/ODS15';
import QuienesSomos from './pages/QuienesSomos';
import RegistroEspecies from './pages/RegistroEspecies';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ods15" element={<ODS15 />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/registro-especies" element={<RegistroEspecies />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;