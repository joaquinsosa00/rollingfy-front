import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";


const GrillaReproductores = () => {
  const [canciones, setCanciones] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');


  const [esCelular, setEsCelular] = useState(window.innerWidth < 768);


  const [cantidadVisible, setCantidadVisible] = useState(window.innerWidth < 768 ? 2 : 8);


  useEffect(() => {
    const revisarTamanioPantalla = () => {
      setEsCelular(window.innerWidth < 768);
    };
    window.addEventListener("resize", revisarTamanioPantalla);
    return () => window.removeEventListener("resize", revisarTamanioPantalla);
  }, []);


  const servidor = window.location.hostname;

  const URL_API = import.meta.env.VITE_API_URL || "http://localhost:3001/canciones";


  useEffect(() => {
    fetch(URL_API)
      .then(respuesta => respuesta.json())
      .then(datos => setCanciones(datos))
      .catch(error => console.error("Error cargando canciones:", error));
  }, []);


  const mostrarMasCanciones = () => {
    if (esCelular) {
      setCantidadVisible(cantidadVisible + 2);
    } else {
      setCantidadVisible(cantidadVisible + 8);
    }
  };

  const agregarAPlaylist = (cancion) => {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioKey'));

    if (!usuarioLogueado) {
      Swal.fire({

        icon: "error",
        title: "Debes iniciar sesion",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuariosActualizados = usuarios.map((usuario) => {
      if (usuario.email === usuarioLogueado.email) {
        const playlistActual = usuario.playlist || [];

        const cancionRepetida = playlistActual.find(
          (item) => item.id === cancion.id
        );

        if (cancionRepetida) {
          Swal.fire({

            icon: "error",
            title: "La canción ya se encuentra en la playlist",
            showConfirmButton: false,
            timer: 1500
          });

          return;
        }

        return {
          ...usuario,
          playlist: [...playlistActual, cancion]
        };
      }

      return usuario;
    });

    const usuarioActualizado = usuariosActualizados.find(
      (usuario) => usuario.email === usuarioLogueado.email
    );

    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
    localStorage.setItem('usuarioKey', JSON.stringify(usuarioActualizado));

    Swal.fire({

      icon: "success",
      title: "Cancion agregada a la playlist",
      showConfirmButton: false,
      timer: 1500
    });

  };

  const normalizarTexto = (texto) => {
    return texto ? texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      : "";
  };

  const palabrasIgnoradas = ["y", "e", "ft", "feat", "con", "with", "de", "el", "la", "los", "las"];

  const cancionesFiltradas = canciones.filter(cancion => {
    const coincideGenero =
      generoSeleccionado === 'Todos' || cancion.genero === generoSeleccionado;

    const textoCancion = normalizarTexto(`${cancion.nombre} ${cancion.artista}`);
    const terminosBusqueda = normalizarTexto(busqueda)
      .split(/[\s,-]+/)
      .filter(termino =>
        termino.length > 0 && !palabrasIgnoradas.includes(termino));


    const textoBuscado = busqueda.toLowerCase();

    const nombreSeguro = cancion.nombre ? cancion.nombre.toLowerCase() : "";
    const artistaSeguro = cancion.artista ? cancion.artista.toLowerCase() : "";

    const coincideTexto = terminosBusqueda.every(termino =>
      textoCancion.includes(termino)
    );

    return coincideGenero && coincideTexto;
  });



  const cancionesAMostrar = cancionesFiltradas.slice(0, cantidadVisible);

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-light mb-4 text-center">Explora nuestra música</h2>


      <div className="d-flex justify-content-center gap-3 mb-5">
        <Button
          variant={generoSeleccionado === 'Todos' ? 'success' : 'outline-success'}
          onClick={() => setGeneroSeleccionado('Todos')}
        >
          Todos
        </Button>
        <Button
          variant={generoSeleccionado === 'Rock' ? 'success' : 'outline-success'}
          onClick={() => setGeneroSeleccionado('Rock')}
        >
          Rock
        </Button>
        <Button
          variant={generoSeleccionado === 'Pop' ? 'success' : 'outline-success'}
          onClick={() => setGeneroSeleccionado('Pop')}
        >
          Pop
        </Button>
        <Button
          variant={generoSeleccionado === 'Trap' ? 'success' : 'outline-success'}
          onClick={() => setGeneroSeleccionado('Trap')}
        >
          Trap
        </Button>
      </div>


      <Row className="g-3">
        {cancionesAMostrar.map((cancion) => (
          <Col xs={12} sm={6} md={4} lg={3} key={cancion.id} className="mb-3">
            <div className="h-100 d-flex flex-column">
              <iframe
                style={{ borderRadius: "12px" }}
                src={cancion.url}
                width="100%"
                height="80"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={cancion.nombre}
              ></iframe>
              <Button
                as={Link}
                to={`/detalle/${cancion.id}/${cancion.nombre.replaceAll(" ", "-")}/${cancion.artista.replaceAll(" ", "-")}`}
                variant="outline-success"
                size="sm"
                className="text-decoration-none rounded-pill fw-bold mt-2"
              >
                Ver Detalle
              </Button>

              <Button
                variant="success"
                size="sm"
                className="rounded-pill fw-bold mt-2 "
                onClick={() => agregarAPlaylist(cancion)}
              >
                Agregar a Playlist
              </Button>
            </div>
          </Col>

        ))}
      </Row>

      {cantidadVisible < cancionesFiltradas.length && (
        <div className="d-flex justify-content-center mt-4">
          <Button variant="success" onClick={mostrarMasCanciones}>
            Cargar más canciones
          </Button>
        </div>
      )}

      {cancionesFiltradas.length === 0 && (
        <p className="text-center text-secondary mt-4">
          No hay coincidencias
        </p>
      )}
    </Container>
  );
};

export default GrillaReproductores;