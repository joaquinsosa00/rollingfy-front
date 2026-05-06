import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import logoImagen from "../assets/Logo.png";

const NavBar = ({ usuarioLogueado, setUsuarioLogueado, busqueda, setBusqueda }) => {


  const logout = () => {
    localStorage.removeItem("usuarioKey");
    setUsuarioLogueado(false);
  };



  return (
    <Navbar sticky="top" expand="lg" className="bg-dark" data-bs-theme="dark">
      <Container fluid>

        <Navbar.Brand as={NavLink} to="/" className="ms-1 ms-md-5">
          <img
            src={logoImagen}
            alt="Logo Rollingfy"
            style={{ maxHeight: "40px", width: "auto" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" className="border-0 px-0">
          <FaBars color="white" size={24} />
        </Navbar.Toggle>

        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex mx-auto" 
            style={{ maxWidth: '400px', width: '100%' }}
            onSubmit={(e) => e.preventDefault()}>
            <Form.Control 
              type="search" 
              placeholder="Buscar..." 
              className="me-2" 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <Button variant="outline-success">Buscar</Button>
          </Form>

          <Nav className="ms-auto my-2 my-lg-0">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>


            {!usuarioLogueado ? (
              <NavDropdown title="Iniciar Sesión" id="navbarScrollingDropdown" align="end" menuVariant="dark">
                <NavDropdown.Item as={NavLink} to="/registro">Registrarse</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/login">Login</NavDropdown.Item>
              </NavDropdown>
            ) : (

              <>
                <Nav.Link as={NavLink} to="/playlist">Mi Playlist</Nav.Link>


                {usuarioLogueado.rol === 'admin' && (
                  <Nav.Link as={NavLink} to="/admin" className="text-success-emphasis">
                    Panel Admin
                  </Nav.Link>
                )}

                <NavDropdown
                  title={`Hola, ${usuarioLogueado.nombreUsuario}`}
                  id="navbar-user-dropdown"
                  align="end"
                  menuVariant="dark"
                >
                  <NavDropdown.Item onClick={logout}>
                    Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;