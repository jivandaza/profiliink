import React, {useEffect, useState} from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import axios from "axios";

const HeroSection = () => {

    const [numSolicitudes, setNumSolicitudes] = useState(0);
    const [numAspirantes, setNumAspirantes] = useState(0);
    const [numEmpleadores, setNumEmpleadores] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `${window.location.origin}/api/v1/user/getUsers`,
                    {
                        withCredentials: true,
                    }
                );
                const empleados = response.data.users.filter(usuario => usuario.role === "Empleador");
                const aspirantes = response.data.users.filter(usuario => usuario.role === "Aspirante");
                setNumEmpleadores(empleados.length);
                setNumAspirantes(aspirantes.length);
            } catch (error) {
                console.log("Error: ", error.message || error);
            }
        };
        try {
            axios
                .get(`${window.location.origin}/api/v1/trabajo/getall`, {
                    withCredentials: true,
                })
                .then((res) => {
                    setNumSolicitudes(res.data.jobs.length);
                });
        } catch (error) {
            console.log("Error: ", error.message || error);
        }
        fetchUser();
    }, []);

    return (
        <>
            <div className="heroSection">
                <div className="container">
                    <div className="title">
                        <h1>Encuentra un trabajo que se adapte a</h1>
                        <h1>tus intereses y habilidades</h1>
                        <p>
                            Interfaz de usuario sencilla y amigable para una experiencia sin complicaciones.
                            Facilita la interacción entre empleadores y candidatos en un entorno seguro y protegido.
                        </p>
                    </div>
                    <div className="image">
                        <img src="/banner.jpg" alt="hero" />
                    </div>
                </div>
                <div className="details">
                    <div className="card">
                        <div className="icon"><FaSuitcase /></div>
                        <div className="content">
                            <p>{numSolicitudes}</p>
                            <p>Trabajos disponibles</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="icon"><FaUsers /></div>
                        <div className="content">
                            <p>{numAspirantes}</p>
                            <p>Aspirantes</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="icon"><FaUserPlus /></div>
                        <div className="content">
                            <p>{numEmpleadores}</p>
                            <p>Empleadores</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;