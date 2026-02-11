import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <div className="logo-icon">🌿</div>
          <span>BioPuebla</span>
        </div>
        <p className="footer-text">Protegiendo la riqueza natural de nuestro estado.</p>
        <div className="footer-bottom">
          &copy; BioPuebla {new Date().getFullYear()}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;