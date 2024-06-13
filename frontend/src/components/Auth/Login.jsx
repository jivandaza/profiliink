import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const { isAuthorized, setIsAuthorized } = useContext(Context);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${window.location.origin}/api/v1/user/login`,
                { email, password, role },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            setEmail("");
            setPassword("");
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
                        <h3>Acceder a su cuenta</h3>
                    </div>
                    <form>
                        <div className="inputTag">
                            <label>Acceder como</label>
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
                            <label>Correo electrónico</label>
                            <div>
                                <input
                                    type="email"
                                    placeholder="ingresar correo"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MdOutlineMailOutline />
                            </div>
                        </div>
                        <div className="inputTag">
                            <label>Password</label>
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
                        <button type="submit" onClick={handleLogin}>
                            Acceder
                        </button>
                        <Link to={"/registrar"}>Regitrar cuenta</Link>
                    </form>
                </div>
                <div className="banner">
                    <img src="/login.png" alt="login" />
                </div>
            </section>
        </>
    );
};

export default Login;