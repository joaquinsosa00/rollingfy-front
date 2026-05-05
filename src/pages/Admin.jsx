import { useState, useEffect } from "react";
import { Button, Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Admin = () => {
  // Estado para guardar las canciones
  const [canciones, setCanciones] = useState([]);
  
  // Detecta automáticamente si estás en 'localhost' o en tu IP '192.168.X.X'
  const servidor = window.location.hostname;

  // Función para obtener las canciones del JSON
  const obtenerCanciones = async () => {
    try {
      const respuesta = await fetch(`http://${servidor}:3001/canciones`);

      if (respuesta.ok) {
        const datos = await respuesta.json();
        setCanciones(datos);
      } else {
        Swal.fire({
          title: "Ocurrió un error",
          text: "No se pudieron obtener las canciones, inténtelo nuevamente.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error al cargar las canciones:", error);
    }
  };

  // Se ejecuta una sola vez al cargar el componente
  useEffect(() => {
    obtenerCanciones();
  }, []);

  // NUEVA FUNCIÓN: BORRAR CANCIÓN
  const borrarCancion = (id, nombre) => {
    Swal.fire({
      title: `¿Estás seguro de borrar "${nombre}"?`,
      text: "No podrás revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#198754",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Petición DELETE a json-server
          const respuesta = await fetch(`http://${servidor}:3001/canciones/${id}`, {
            method: "DELETE",
          });

          if (respuesta.ok) {
            Swal.fire("¡Borrada!", "La canción ha sido eliminada.", "success");
            // Volvemos a pedir las canciones para que la tabla se actualice sola
            obtenerCanciones();
          } else {
            Swal.fire("Error", "No se pudo eliminar la canción", "error");
          }
        } catch (error) {
          console.error("Error al borrar:", error);
        }
      }
    });
  };

  return (
    <div className="bg-black min-vh-100 py-4">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="display-4 fw-bold text-light">Administrador de Canciones</h1>
          <div>
            <Link className="btn btn-success" to="/admin/crear">
              <i className="bi bi-music-note-list me-2"></i>Nueva Canción
            </Link>
          </div>
        </div>
        <hr className="text-secondary" />

        {/* Tabla de canciones */}
        <Table responsive striped bordered hover variant="dark" className="mt-4 mb-5">
          <thead>
            <tr className="text-center align-middle">
              <th>#</th>
              <th>Título</th>
              <th>Artista</th>
              <th>Género</th>
              <th>URL Spotify</th>
              <th>Portada</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {canciones.map((cancion, indice) => (
              <tr key={cancion.id} className="text-center align-middle">
                <td>{indice + 1}</td>
                <td className="fw-bold">{cancion.nombre}</td>
                <td>{cancion.artista}</td>
                <td>{cancion.genero}</td>
                <td className="align-middle text-center">
                  <a
                    href={cancion.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-success rounded-circle"
                    title="Escuchar en Spotify"
                  >
                    <i className="bi bi-play-fill fs-5"></i>
                  </a>
                </td>
                <td>
                  <img
                    src={cancion.imagen}
                    alt={cancion.nombre}
                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                  />
                </td>
                <td>
                  {/* BOTÓN EDITAR: Ahora es un Link que te redirige a la ruta de edición */}
                  <Link to={`/admin/editar/${cancion.id}`} className="btn btn-success me-2" title="Editar">
                    <i className="bi bi-pencil-square"></i>
                  </Link>

                  {/* BOTÓN BORRAR: Ejecuta la función con alerta de SweetAlert2 */}
                  <Button variant="danger" title="Borrar" onClick={() => borrarCancion(cancion.id, cancion.nombre)}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}

            {/* Mensaje por si el JSON está vacío */}
            {canciones.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">No hay canciones cargadas.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Admin;
