import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoImagen from "../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row className="gy-4">
          <Col xs={12} md={4} className="text-center text-md-start">
            <a href="/"><img src={logoImagen} width="40%" alt="Logo Rollingfy" />
            </a>
            <p className="text-secondary mt-3">
              Música y codigo en un solo lugar.
            </p>
            <div className="fs-4">
              <i className="bi bi-facebook me-3"></i>
              <i className="bi bi-instagram me-3"></i>
              <i className="bi bi-whatsapp"></i>
            </div>
          </Col>

          <Col xs={12} md={4} className="text-center">
            <h5>Navegación</h5>
            <ul className="list-unstyled mt-3">
              <li className="text-decoration-none text-secondary" >Inicio</li>
              <li className="text-decoration-none text-secondary" >Nosotros</li>
              <li className="text-decoration-none text-secondary" >Administrador</li>
            </ul>
          </Col>

          <Col xs={12} md={4} className="text-center text-md-end">
            <h5>Encontranos en</h5>
            <p className="text-secondary mt-3">
              San Miguel de Tucumán, Argentina <br />
              <i className="bi bi-geo-alt-fill text-danger"></i> San Martín 123
            </p>
            <a
              href="https://maps.app.goo.gl/DaBJ1czPzdkYvfVC8"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-success btn-sm"
            >
              Ver en Google Maps
            </a>
          </Col>
        </Row>

        <hr className="mt-5 text-secondary" />
        <Row>
          <Col className="text-center text-secondary small">
            &copy; {new Date().getFullYear()} Rollingfy - Todos los derechos reservados.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;