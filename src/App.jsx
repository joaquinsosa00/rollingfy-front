import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./componets/NavBar";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import DetalleCancion from "./pages/DetalleCancion";
import Admin from "./pages/Admin";
import Footer from "./componets/Footer";
import FormularioCancion from "./pages/Canciones/FormularioCancion";
import { useState, useEffect, useContext } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const sesionUsuario = JSON.parse(localStorage.getItem("usuarioKey")) || false;
  const [usuarioLogueado, setUsuarioLogueado] = useState(sesionUsuario);

  useEffect(() => {
    localStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
  }, [usuarioLogueado]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar
          usuarioLogueado={usuarioLogueado}
          setUsuarioLogueado={setUsuarioLogueado}
        />
        <Routes>
          <Route
            path="/Login"
            element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
          />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/" element={<Home />} />
          <Route path="/detalle/:id" element={<DetalleCancion />} />
          <Route path="/admin" element={<Admin />} />

          <Route
            path="/admin/crear"
            element={<FormularioCancion titulo="Crear Canción" />}
          />
          <Route
            path="/admin/editar/:id"
            element={<FormularioCancion titulo="Editar Canción" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
