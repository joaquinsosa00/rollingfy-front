export const guardarUsuario = (usuarioNuevo) => {
  const usuariosCargados = JSON.parse(localStorage.getItem("usuarios")) || [];

  const correoExistente = usuariosCargados.find(
    (u) => u.email === usuarioNuevo.email,
  );
  if (correoExistente) {
    return { exito: false, mensaje: "Este correo ya está registrado." };
  }

  usuariosCargados.push(usuarioNuevo);
  localStorage.setItem("usuarios", JSON.stringify(usuariosCargados));

  return { exito: true };
};

export const obtenerUsuarios = () => {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
};
