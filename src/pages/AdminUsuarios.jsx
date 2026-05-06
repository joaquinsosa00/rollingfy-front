import { useState, useEffect } from "react";
import { Button, Table, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { obtenerUsuarios } from "../helpers/LocalStorage";
import { FaTrash, FaShieldAlt } from "react-icons/fa";
 
const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
 
  useEffect(() => {
    setUsuarios(obtenerUsuarios());
  }, []);
 

  const cambiarEstado = (email) => {
    const actualizados = usuarios.map((u) =>
      u.email === email ? { ...u, activo: !u.activo } : u
    );
    localStorage.setItem("usuarios", JSON.stringify(actualizados));
    setUsuarios(actualizados);
  };

  const borrarUsuario = (email, nombreUsuario) => {
    Swal.fire({
      title: `¿Estás seguro de eliminar a "${nombreUsuario}"?`,
      text: "No podrás revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#198754",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizados = usuarios.filter((u) => u.email !== email);
        localStorage.setItem("usuarios", JSON.stringify(actualizados));
        setUsuarios(actualizados);
        Swal.fire("¡Eliminado!", "El usuario ha sido eliminado.", "success");
      }
    });
  };
 
  const totalAdmins = usuarios.filter((u) => u.rol === "admin").length;
 
  return (
    <div className="bg-black min-vh-100 py-4">
      <Container>
 
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="display-4 fw-bold text-light">Gestión de Usuarios</h1>
          <Link className="btn btn-success" to="/admin">
            <i className="bi bi-music-note-list me-2"></i>Ver Canciones
          </Link>
        </div>
        <hr className="text-secondary" />

        <Table responsive striped bordered hover variant="dark" className="mt-2 mb-5">
          <thead>
            <tr className="text-center align-middle">
              <th>#</th>
              <th>Nombre de usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, indice) => (
              <tr key={usuario.email} className="text-center align-middle">
                <td>{indice + 1}</td>
                <td className="fw-bold">{usuario.nombreUsuario}</td>
                <td>{usuario.email}</td>
                <td>
                  {usuario.rol === "admin" ? (
                    <Badge bg="success">Admin</Badge>
                  ) : (
                    <Badge bg="secondary">Usuario</Badge>
                  )}
                </td>
                <td>
                  <Button
                    variant={usuario.activo === false ? "outline-danger" : "outline-success"}
                    size="sm"
                    onClick={() => cambiarEstado(usuario.email)}
                    disabled={usuario.rol === "admin"}
                    title={usuario.rol === "admin" ? "No se puede modificar al administrador" : "Cambiar estado"}
                  >
                    {usuario.activo === false ? (
                      <><i className="bi bi-slash-circle me-1"></i>Inactivo</>
                    ) : (
                      <><i className="bi bi-check-circle me-1"></i>Activo</>
                    )}
                  </Button>
                </td>
                <td>
                {usuario.rol === "admin" ? (
                    <Button variant="secondary" disabled title="No se puede eliminar al administrador">
                    <FaShieldAlt />
                    </Button>
                ) : (
                    <Button
                    variant="danger"
                    title="Eliminar usuario"
                    onClick={() => borrarUsuario(usuario.email, usuario.nombreUsuario)}
                    >
                    <FaTrash />
                    </Button>
                )}
                </td>
              </tr>
            ))}
 
            {usuarios.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-secondary">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};
 
export default AdminUsuarios;