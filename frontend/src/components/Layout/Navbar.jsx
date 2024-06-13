import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const { isAuthorized, setIsAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get(
                `${window.location.origin}/api/v1/user/logout`,
                {
                    withCredentials: true,
                }
            );
            toast.success(response.data.message);
            setIsAuthorized(false);
            navigateTo("/acceder");
        } catch (error) {
            toast.error(error.response.data.message), setIsAuthorized(true);
        }
    };

    return (
        <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
            <div className="container">
                <div className="logo">
                    <img src="/Profilink-logo.png" alt="logo" />
                </div>
                <ul className={!show ? "menu" : "show-menu menu"}>
                    <li>
                        <Link to={"/"} onClick={() => setShow(false)}>
                            INICIO
                        </Link>
                    </li>
                    <li>
                        <Link to={"/trabajo/todos"} onClick={() => setShow(false)}>
                            MOSTRAR TRABAJOS
                        </Link>
                    </li>
                    <li>
                        <Link to={"/aplicacion/todas"} onClick={() => setShow(false)}>
                            {user && user.role === "Empleador"
                                ? "SOLICITUDES DE ASPIRANTES"
                                : "MIS SOLICITUDES"}
                        </Link>
                    </li>
                    {user && user.role === "Empleador" ? (
                        <>
                            <li>
                                <Link to={"/trabajo/publicar"} onClick={() => setShow(false)}>
                                    PUBLICAR TRABAJO
                                </Link>
                            </li>
                            <li>
                                <Link to={"/trabajo/publicados"} onClick={() => setShow(false)}>
                                    MIS PUBLICACIONES
                                </Link>
                            </li>
                        </>
                    ) : (
                        <></>
                    )}

                    <button onClick={handleLogout}>SALIR</button>
                </ul>
                <div className="hamburger">
                    <GiHamburgerMenu onClick={() => setShow(!show)} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;