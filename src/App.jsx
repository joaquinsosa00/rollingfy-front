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
import Playlist from "./pages/PlayList";
import RutaProtegida from "./componets/ProtectorAdmin";
import AdminUsuarios from "./pages/AdminUsuarios";
import { useState, useEffect } from "react";

function App() {
  const sesionUsuario = JSON.parse(localStorage.getItem("usuarioKey")) || false;
  const [usuarioLogueado, setUsuarioLogueado] = useState(sesionUsuario);  
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    localStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
  }, [usuarioLogueado]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar
          usuarioLogueado={usuarioLogueado}
          setUsuarioLogueado={setUsuarioLogueado}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />

        <Routes>
          <Route
            path="/Login"
            element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
          />

          <Route path="/Registro" element={<Registro />} />

          <Route path="/" element={<Home busqueda={busqueda} />} />

          <Route
            path="/detalle/:id/:nombre/:artista"
            element={<DetalleCancion />}
          />

          <Route path="/playlist" element={<Playlist />} />

          <Route
            path="/admin"
            element={
              <RutaProtegida usuarioLogueado={usuarioLogueado}>
                <Admin />
              </RutaProtegida>
            }
          />

          <Route path="/admin/usuarios" element={<AdminUsuarios />} />

          <Route
            path="/admin/crear"
            element={
              <RutaProtegida usuarioLogueado={usuarioLogueado}>
                <FormularioCancion titulo="Crear Canción" />
              </RutaProtegida>
            }
          />

          <Route
            path="/admin/editar/:id"
            element={
              <RutaProtegida usuarioLogueado={usuarioLogueado}>
                <FormularioCancion titulo="Editar Canción" />
              </RutaProtegida>
            }
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;