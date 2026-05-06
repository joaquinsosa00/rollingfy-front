import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const RutaProtegida = ({ children, usuarioLogueado }) => {
  // 1. Si NO hay nadie logueado, lo mandamos al Login
  if (!usuarioLogueado) {
    return <Navigate to="/Login" />;
  }

  // 2. Si SÍ está logueado, pero su rol NO es "admin", lo pateamos al Home
  if (usuarioLogueado.rol !== "admin") {
    // Opcional: Mostrar un mensajito de que no tiene permisos
    Swal.fire({
      title: "Acceso denegado",
      text: "No tienes permisos de administrador para ver esta página.",
      icon: "error",
    });
    
    return <Navigate to="/" />;
  }

  // 3. Si pasó las dos validaciones anteriores (está logueado y ES admin), le mostramos el contenido
  return children;
};

export default RutaProtegida;