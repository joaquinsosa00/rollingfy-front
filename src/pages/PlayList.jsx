import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioKey'));
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarioLogueado) {
      const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.email === usuarioLogueado.email
      );

      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
        setPlaylist(usuarioEncontrado.playlist || []);
      }
    }
  }, []);

  const eliminarCancion = (id) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const nuevaPlaylist = playlist.filter(
      (cancion) => cancion.id !== id
    );

    const usuariosActualizados = usuarios.map((usuarioActual) => {
      if (usuarioActual.email === usuario.email) {
        return {
          ...usuarioActual,
          playlist: nuevaPlaylist
        };
      }

      return usuarioActual;
    });

    const usuarioActualizado = {
      ...usuario,
      playlist: nuevaPlaylist
    };

    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioKey'));

    setUsuario(usuarioActualizado);
    setPlaylist(nuevaPlaylist);
  };

  if (!usuario) {
    return (
      <div className="bg-black text-white min-vh-100 py-5">
        <Container>
          <h2>Debes iniciar sesión para ver tu playlist</h2>

          <Link to="/login">
            <Button variant="outline-light" className="rounded-pill mt-3">
              Iniciar sesión
            </Button>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-vh-100 py-5">
      <Container>
        <h1 className="fw-bold mb-2">My Playlist</h1>

        <p className="text-secondary mb-4">
          Playlist de {usuario.nombreUsuario || usuario.nombre}
        </p>

        {playlist.length === 0 ? (
          <div className="text-center">
            <p className="text-secondary">
              Todavía no agregaste canciones a tu playlist.
            </p>

            <Link to="/">
              <Button variant="outline-light" className="rounded-pill">
                Volver al catálogo
              </Button>
            </Link>
          </div>
        ) : (
          <Row className="g-4">
            {playlist.map((cancion) => (
              <Col xs={12} md={6} lg={4} key={cancion.id}>
                <Card className="bg-dark text-white border-0 h-100 shadow">
                  <Card.Img
                    variant="top"
                    src={cancion.imagen}
                    alt={cancion.nombre}
                    style={{
                      height: '250px',
                      objectFit: 'cover'
                    }}
                  />

                  <Card.Body>
                    <Card.Title className="fw-bold">
                      {cancion.nombre}
                    </Card.Title>

                    <Card.Text className="text-secondary">
                      {cancion.artista}
                    </Card.Text>

                    <p className="mb-1">
                      <strong>Álbum:</strong> {cancion.album}
                    </p>

                    <p className="mb-3">
                      <strong>Género:</strong> {cancion.genero}
                    </p>

                    <Button
                      variant="danger"
                      className="w-100 rounded-pill"
                      onClick={() => eliminarCancion(cancion.id)}
                    >
                      Eliminar de mi Playlist
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Playlist;