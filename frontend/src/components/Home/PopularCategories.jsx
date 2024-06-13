import React from "react";
import {
    MdOutlineDesignServices,
    MdOutlineWebhook,
    MdAccountBalance,
    MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
    const categories = [
        {
            id: 1,
            title: "Diseño gráfico",
            subTitle: "305 posiciones abiertas",
            icon: <MdOutlineDesignServices />,
        },
        {
            id: 2,
            title: "Desarrollo de aplicaciones móviles",
            subTitle: "102 posiciones abiertas",
            icon: <TbAppsFilled />,
        },
        {
            id: 3,
            title: "Desarrollo web front-end",
            subTitle: "210 posiciones abiertas",
            icon: <MdOutlineWebhook />,
        },
        {
            id: 4,
            title: "Desarrollo de MERN STACK",
            subTitle: "300+ posiciones abiertas",
            icon: <FaReact />,
        },
        {
            id: 5,
            title: "Cuenta y Finanzas",
            subTitle: "150 posiciones abiertas",
            icon: <MdAccountBalance />,
        },
        {
            id: 6,
            title: "Inteligencia artificial",
            subTitle: "250 posiciones abiertas",
            icon: <GiArtificialIntelligence />,
        },
        {
            id: 7,
            title: "Animación de vídeo",
            subTitle: "50 posiciones abiertas",
            icon: <MdOutlineAnimation />,
        },
        {
            id: 8,
            title: "Desarrollo de juegos",
            subTitle: "80 posiciones abiertas",
            icon: <IoGameController />,
        },
    ];
    return (
        <div className="categories">
            <h3>CATEGORÍAS POPULARES</h3>
            <div className="banner">
                {categories.map((element) => {
                    return (
                        <div className="card" key={element.id}>
                            <div className="icon">{element.icon}</div>
                            <div className="text">
                                <p>{element.title}</p>
                                <p>{element.subTitle}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PopularCategories;