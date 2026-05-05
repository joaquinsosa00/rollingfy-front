# 🎵 Rollingfy - Music Streaming App

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![LocalStorage](https://img.shields.io/badge/LocalStorage-FFCA28?style=for-the-badge&logo=google-chrome&logoColor=black)

**Rollingfy** es una plataforma de administración y reproducción de música desarrollada como proyecto integrador para **RollingCode School**. La aplicación permite a los usuarios descubrir canciones, gestionar sus propias playlists y ofrece un panel de administración completo para la gestión del catálogo.

---

## 🚀 Características Principales

### 👤 Perfil Usuario / Invitado
- **Exploración de Catálogo:** Buscador dinámico por nombre de canción o artista
- **Reproducción Sincronizada:** Reproductor fijo que permite visualizar la información de la canción actual
- **Playlists Personales:** Los usuarios logueados pueden gestionar su lista de reproducción (agregar/eliminar canciones)
- **Diseño Responsive:** Interfaz moderna, adaptada a dispositivos móviles

### 🛠️ Perfil Administrador
- **Panel CRUD:** Interfaz completa para crear, leer, editar y eliminar canciones del catálogo
- **Gestión de Usuarios:** Visualización y control de cuentas registradas
- **Rutas Protegidas:** Sistema de seguridad que impide el acceso no autorizado al panel administrativo

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React (Vite) 
- **Enrutamiento:** React Router DOM 
- **Estilos:** Bootstrap 5
- **Iconografía:** React Icons
- **Persistencia de Datos:** LocalStorage & SessionStorage

---

## 📂 Estructura del Proyecto

```text
src/
 ┣ 📂 assets/        # Recursos estáticos (imágenes, logos)
 ┣ 📂 components/    # Componentes reutilizables (Navbar, Player, FormAuth)
 ┣ 📂 helpers/       # Lógica de LocalStorage y datos iniciales
 ┣ 📂 pages/         # Vistas principales (Home, Admin, Login, Playlist)
 ┣ App.jsx           # Configuración de rutas y estado global
 ┗ main.jsx          # Punto de entrada de la aplicación


 --comandos
 npx json-server canciones.json --port 3001 --host 0.0.0.0
