
import { Navigate } from "react-router-dom";

const ProtectorAdmin = ({ children, usuarioLogueado }) => {
  // Si el usuario no está logueado, lo redirigimos automáticamente al Login
  if (!usuarioLogueado) {
    return <Navigate to="/Login" />;
  }
  
  return children;
};

export default ProtectorAdmin;