import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${window.location.origin}/api/v1/user/register`,
                { name, phone, email, role, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            setName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setRole("");
            setIsAuthorized(true);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if(isAuthorized){
        return <Navigate to={'/'}/>
    }

    return (
        <>
            <section className="authPage">
                <div className="container">
                    <div className="header">
                        <img src="/Profilink-login.png" alt="logo" />
                        <h3>Crear una cuenta</h3>
                    </div>
                    <form>
                        <div className="inputTag">
                            <label>Registrarme como</label>
                            <div>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Seleccionar rol</option>
                                    <option value="Empleador">Empleador</option>
                                    <option value="Aspirante">Aspirante</option>
                                </select>
                                <FaRegUser />
                            </div>
                        </div>
                        <div className="inputTag">
                            <label>Nombre</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Ingresar nombre"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <FaPencilAlt />
                            </div>
                        </div>
                        <div className="inputTag">
                            <label>Correo electrónico</label>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Ingresar correo"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MdOutlineMailOutline />
                            </div>
                        </div>
                        <div className="inputTag">
                            <label>Número de teléfono</label>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Ingresar teléfono"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <FaPhoneFlip />
                            </div>
                        </div>
                        <div className="inputTag">
                            <label>Contraseña</label>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Ingresar contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <RiLock2Fill />
                            </div>
                        </div>
                        <button type="submit" onClick={handleRegister}>
                            Registrarme
                        </button>
                        <Link to={"/acceder"}>Iniciar sesión</Link>
                    </form>
                </div>
                <div className="banner">
                    <img src="/register.png" alt="register" />
                </div>
            </section>
        </>
    );
};

export default Register;