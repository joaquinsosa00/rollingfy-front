import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, useParams, Link } from "react-router-dom"; // Importamos Link
import { useEffect } from "react";

const FormularioCancion = ({ titulo }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const navegacion = useNavigate();

  // Detecta automáticamente si estás en 'localhost' o en tu IP '192.168.X.X'
  const servidor = window.location.hostname;

  const buscarCancion = async () => {
    if (titulo === "Editar Canción") {
      try {
        // 1. Hacemos la petición REAL a json-server pidiendo la canción por su ID
        const respuesta = await fetch(`http://${servidor}:3001/canciones/${id}`);

        if (respuesta.ok) {
          const cancionBuscada = await respuesta.json();
          
          // 2. Magia pura: reset() llena todos los campos al instante con los datos de la base de datos
          reset(cancionBuscada);
          
        } else {
          Swal.fire("Error", "No se encontró la canción para editar", "error");
        }
      } catch (error) {
        console.error("Error buscando la canción", error);
      }
    }
  };

  useEffect(() => {
    if (titulo === "Editar Canción") {
      buscarCancion();
    }
    // 3. ¡Importante! Agregamos 'id' al arreglo de dependencias. 
    // Así React sabe que si la URL cambia a un ID distinto, debe volver a cargar.
  }, [id, titulo]);

  const onSubmit = async (cancion) => {
    if (titulo === "Crear Canción") {
      try {
        const respuesta = await fetch(`http://${servidor}:3001/canciones`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cancion),
        });

        if (respuesta.ok) {
          Swal.fire({
            title: "Canción agregada",
            text: `La canción "${cancion.nombre}" se agregó correctamente`,
            icon: "success",
          });
          navegacion("/admin");
        } else {
          Swal.fire("Error", "No se pudo guardar la canción", "error");
        }
      } catch (error) {
        console.error("Error al guardar:", error);
        Swal.fire("Error", "Fallo la conexión con la base de datos", "error");
      }
    }
    else {
      // AQUÍ OCURRE LA MAGIA DE LA EDICIÓN (Usamos método PUT y le pasamos el ID en la URL)
      try {
        const respuesta = await fetch(`http://${servidor}:3001/canciones/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cancion),
        });

        if (respuesta.ok) {
          Swal.fire({
            title: "Canción modificada",
            text: `La canción "${cancion.nombre}" se actualizó correctamente`,
            icon: "success",
          });
          navegacion("/admin");
        } else {
          Swal.fire("Error", "No se pudo editar la canción", "error");
        }
      } catch (error) {
        console.error("Error al editar:", error);
        Swal.fire("Error", "Fallo la conexión con la base de datos", "error");
      }
    }
  };

  return (
    <div className="bg-dark min-vh-100 py-4">
      <Container>
        <h1 className="display-4 text-light">{titulo}</h1>
        <hr className="text-secondary" />

        <Form className="my-4 text-light p-4 rounded bg-dark border border-secondary" onSubmit={handleSubmit(onSubmit)}>

          {/* TITULO DE LA CANCION */}
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Título de la canción*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: De Música Ligera"
              {...register("nombre", {
                required: "El título es obligatorio",
                minLength: {
                  value: 2,
                  message: "El título debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "El título debe tener como máximo 100 caracteres",
                }
              })}
            />
            <Form.Text className="text-danger">{errors.nombre?.message}</Form.Text>
          </Form.Group>
          {/* ARTISTA */}
          <Form.Group className="mb-3" controlId="formArtista">
            <Form.Label>Artista o Banda*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Soda Stereo"
              {...register("artista", {
                required: "El artista es un dato obligatorio",
                minLength: {
                  value: 2,
                  message: "El nombre del artista debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "El nombre del artista debe tener como máximo 100 caracteres",
                }
              })}
            />
            <Form.Text className="text-danger">{errors.artista?.message}</Form.Text>
          </Form.Group>

          {/* Album */}
          <Form.Group className="mb-3" controlId="formAalbum">
            <Form.Label>Album</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Soda Stereo"
              {...register("album", {
                required: "El album es un dato obligatorio",
                minLength: {
                  value: 2,
                  message: "El album del artista debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "El album del artista debe tener como máximo 100 caracteres",
                }
              })}
            />
            <Form.Text className="text-danger">{errors.album?.message}</Form.Text>
          </Form.Group>

          {/* Año */}
          <Form.Group className="mb-3" controlId="formAnio">
            <Form.Label>Año*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Soda Stereo"
              {...register("anio", {
                required: "El año es un dato obligatorio",
                minLength: {
                  value: 2,
                  message: "El año del artista debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "El nombre del artista debe tener como máximo 100 caracteres",
                }
              })}
            />
            <Form.Text className="text-danger">{errors.anio?.message}</Form.Text>
          </Form.Group>

          {/* URL DE SPOTIFY */}
          <Form.Group className="mb-3" controlId="formUrl">
            <Form.Label>URL del Embed de Spotify*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://open.spotify.com/embed/track/..."
              {...register("url", {
                required: "La URL es obligatoria",
                pattern: {
                  value: /^https:\/\/open\.spotify\.com\/embed\/.*/,
                  message: "Debe ser una URL válida de inserción (embed) de Spotify",
                }
              })}
            />
            <Form.Text className="text-danger">{errors.url?.message}</Form.Text>
          </Form.Group>

          {/* URL DE PORTADA */}

          <Form.Group className="mb-3" controlId="formPortada">
            <Form.Label>URL de la portada*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://open.spotify.com/embed/track/..."
              {...register("imagen", {
                required: "La URL es obligatoria"

              })}
            />
            <Form.Text className="text-danger">{errors.url?.message}</Form.Text>
          </Form.Group>

          {/* GÉNERO MUSICAL */}
          <Form.Group className="mb-4" controlId="formGenero">
            <Form.Label>Género*</Form.Label>
            <Form.Select
              {...register("genero", { required: "Debe seleccionar un género" })}>
              <option value="">Seleccione una opción</option>
              <option value="Rock">Rock</option>
              <option value="Pop">Pop</option>
              <option value="Trap">Trap</option>
              <option value="Reggaeton">Reggaetón</option>
              <option value="Cumbia">Cumbia</option>
              <option value="Electronica">Electrónica</option>
              <option value="Indie">Indie</option>
            </Form.Select>
            <Form.Text className="text-danger">{errors.genero?.message}</Form.Text>
          </Form.Group>

          {/* BOTONERA (Guardar y Volver) */}
          <div className="d-flex gap-2 mt-4">
            <Button type="submit" variant="success" className="w-100">
              {titulo === "Crear Canción" ? "Guardar Canción" : "Guardar Cambios"}
            </Button>
            {/* Botón Volver */}
            <Link to="/admin" className="btn btn-secondary w-100">
              Volver Atrás
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default FormularioCancion;