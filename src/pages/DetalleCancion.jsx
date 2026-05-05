import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
const URL_API = import.meta.env.VITE_API_URL || "http://localhost:3001/canciones";

const DetalleCancion = () => {
  const { id } = useParams();
  const [cancion, setCancion] = useState(null);

  // Detecta automáticamente si estás en 'localhost' o en tu IP '192.168.X.X'
  const servidor = window.location.hostname;

  useEffect(() => {
    fetch(URL_API)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setCancion(datos);
      })
      .catch(error => console.error("Error cargando la canción:", error));
  }, [id]);

  return (
    <div className="bg-black text-white min-vh-100 py-5">
      <Container>
        {!cancion ? (
          <>
            <h2>No se encontró la canción</h2>

            <Link to="/">
              <Button variant="outline-light">
                Volver al inicio
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Row className="align-items-center g-5">
              <Col xs={12} md={5}>
                <img
                  src={cancion.imagen}
                  alt={cancion.nombre}
                  className="img-fluid rounded-4 shadow-lg w-100"
                  style={{ objectFit: 'cover', maxHeight: '450px' }}
                />
              </Col>
              <Col xs={12} md={7}>
                <p className="text-success fw-bold mb-2">
                  Detalle de canción / artista
                </p>
                <h1 className="display-5 fw-bold mb-3">
                  {cancion.nombre}
                </h1>
                <h4 className="text-secondary mb-4">
                  Artista: {cancion.artista}
                </h4>
                <p>
                  <strong>Canción:</strong> {cancion.nombre}
                </p>
                <p>
                  <strong>Álbum:</strong> {cancion.album}
                </p>
                <p>
                  <strong>Año:</strong> {cancion.anio}
                </p>
                <p>
                  <strong>Género:</strong> {cancion.genero}
                </p>
                <Link to="/">
                  <Button variant="outline-light" className="rounded-pill px-4">
                    Volver al catálogo
                  </Button>
                </Link>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col>
                <h3 className="fw-bold mb-3">Reproductor</h3>
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={cancion.url}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={cancion.nombre}
                ></iframe>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default DetalleCancion;