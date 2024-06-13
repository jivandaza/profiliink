import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
    return (
        <>
            <div className="howitworks">
                <div className="container">
                    <h3>Cómo funciona Profilink</h3>
                    <div className="banner">
                        <div className="card">
                            <FaUserPlus />
                            <p>Crear Cuenta</p>
                            <p>
                                Puedes crear una cuenta como aspirtante a trabajos y puedes crear
                                una cuneta como empleador para solicitar trabajadores.
                            </p>
                        </div>
                        <div className="card">
                            <MdFindInPage />
                            <p>Encontrar un trabajo / Publicar un trabajo</p>
                            <p>
                                Profilink es una aplicación diseñada para conectar a empleadores con candidatos ideales para puestos laborales.
                            </p>
                        </div>
                        <div className="card">
                            <IoMdSend />
                            <p>Solicitar empleo / Reclutar candidatos adecuados</p>
                            <p>
                                Utiliza un algoritmo avanzado para encontrar la combinación perfecta entre empleador y candidato.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HowItWorks;