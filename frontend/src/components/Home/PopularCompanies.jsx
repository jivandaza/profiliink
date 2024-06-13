import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
    const companies = [
        {
            id: 1,
            title: "Microsoft",
            location: "Calle 10 Manhattan, Washington D.C.",
            openPositions: 10,
            icon: <FaMicrosoft />,
        },
        {
            id: 2,
            title: "Tesla",
            location: "Calle 15 Melbohre, Las Vegas",
            openPositions: 5,
            icon: <SiTesla />,
        },
        {
            id: 3,
            title: "Apple",
            location: "Calle 22 Winskonsin, Los Angeles",
            openPositions: 20,
            icon: <FaApple />,
        },
    ];
    return (
        <div className="companies">
            <div className="container">
                <h3>EMPRESAS IMPORTANTES</h3>
                <div className="banner">
                    {companies.map((element) => {
                        return (
                            <div className="card" key={element.id}>
                                <div className="content">
                                    <div className="icon">{element.icon}</div>
                                    <div className="text">
                                        <p>{element.title}</p>
                                        <p>{element.location}</p>
                                    </div>
                                </div>
                                <button>Posiciones abiertas {element.openPositions}</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PopularCompanies;