import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { guardarUsuario } from "../helpers/LocalStorage";
import "../index.css";

const Registro = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navegacion = useNavigate();

    const onSubmit = (datos) => {
        if (datos.password !== datos.confirmarPassword) {
            return Swal.fire({
                title: "Error",
                text: "Las contraseñas no coinciden",
                icon: "error",
            });
        }

        const usuarioNuevo = {
            nombreUsuario: datos.nombreUsuario,
            email: datos.correo.toLowerCase().trim(),
            password: datos.password,
            rol: 'usuario',
        };
        const respuesta = guardarUsuario(usuarioNuevo);

        if (respuesta.exito) {
            Swal.fire({
                title: "¡Bienvenido!",
                text: "Tu cuenta ha sido creada correctamente",
                icon: "success",
            });
            navegacion("/login");
        }
        else {
            Swal.fire({
                title: "Error",
                text: respuesta.mensaje || "No se pudo crear la cuenta",
                icon: "error",
            });
        }
    };
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <section className="container mainSection my-5 d-flex justify-content-center">
            <Card className="p-4 card-auth shadow-lg bg-dark text-white" style={{ width: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-2">Registro</h2>
                    <p className="text-center mb-4">Crea tu cuenta</p>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formNombreUsuario">
                            <Form.Label>Nombre de usuario:</Form.Label>
                            <Form.Control
                                type="text"
                                className="bg-transparent text-white border-secondary "
                                placeholder="Ej: Milagros"

                                {...register("nombreUsuario", {
                                    required: "El nombre es obligatorio",
                                    minLength: { value: 3, message: "Mínimo 3 caracteres" }
                                })}
                            />
                            <Form.Text className="text-danger">
                                {errors.nombreUsuario?.message}
                            </Form.Text>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ej: milagros@gmail.com"
                                className="bg-transparent text-white border-secondary"
                                {...register("correo", {
                                    required: "El mail es un dato obligatorio",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Debe ser un correo válido"
                                    }
                                })}
                            />
                            <Form.Text className="text-danger">
                                {errors.correo?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña:</Form.Label>
                            <div className="position-relative">
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ingresa una contraseña"
                                    className="bg-transparent text-white border-secondary pe-5"
                                    {...register("password", {
                                        required: "La contraseña es obligatoria",
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                                            message: "Mínimo 8 caracteres, una mayúscula, un número y un carácter especial"
                                        }
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="password-toggle"
                                >
                                    {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                </button>
                            </div>
                            <Form.Text className="text-danger">
                                {errors.password?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Confirmar contraseña:</Form.Label>
                            <div className="position-relative">
                                <Form.Control
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Repite tu contraseña"
                                    className="bg-transparent text-white border-secondary pe-5"
                                    {...register("confirmarPassword", {
                                        required: "Debes confirmar la contraseña"
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="password-toggle"
                                >
                                    {showConfirm ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                </button>
                            </div>
                            <Form.Text className="text-danger">
                                {errors.confirmarPassword?.message}
                            </Form.Text>
                        </Form.Group>

                        <Button variant="outline-light" type="submit" className="w-100 py-2 mb-3">
                            Continuar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </section>
    );
};

export default Registro;
