import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostJob = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [salaryFrom, setSalaryFrom] = useState("");
    const [salaryTo, setSalaryTo] = useState("");
    const [fixedSalary, setFixedSalary] = useState("");
    const [salaryType, setSalaryType] = useState("default");

    const { isAuthorized, user } = useContext(Context);

    const handleJobPost = async (e) => {
        e.preventDefault();
        if (salaryType === "Fixed Salary") {
            setSalaryFrom("");
            setSalaryFrom("");
        } else if (salaryType === "Ranged Salary") {
            setFixedSalary("");
        } else {
            setSalaryFrom("");
            setSalaryTo("");
            setFixedSalary("");
        }
        await axios
            .post(
                `${window.location.origin}/api/v1/trabajo/post`,
                fixedSalary.length >= 4
                    ? {
                        title,
                        description,
                        category,
                        country,
                        city,
                        location,
                        fixedSalary,
                    }
                    : {
                        title,
                        description,
                        category,
                        country,
                        city,
                        location,
                        salaryFrom,
                        salaryTo,
                    },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                toast.success(res.data.message);
                setTitle("");
                setDescription("");
                setCategory("");
                setCountry("");
                setCity("");
                setLocation("");
                setSalaryFrom("");
                setSalaryTo("");
                setFixedSalary("");
                setSalaryType("default");
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };

    const navigateTo = useNavigate();
    if (!isAuthorized || (user && user.role !== "Empleador")) {
        navigateTo("/");
    }

    return (
        <>
            <div className="job_post page">
                <div className="container">
                    <h3>PUBLICAR TRABAJO</h3>
                    <form onSubmit={handleJobPost}>
                        <div className="wrapper">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ingresar título"
                            />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Seleccionar categoría</option>
                                <option value="Diseño gráfico">Diseño gráfico</option>
                                <option value="Desarrollo de aplicaciones móviles">
                                    Desarrollo de aplicaciones móviles
                                </option>
                                <option value="Desarrollador web front-end">
                                    Desarrollo web front-end
                                </option>
                                <option value="Desarrollador web back-end">
                                    Desarrollador web back-end
                                </option>
                                <option value="Cuenta y Finanzas">Cuenta y Finanzas</option>
                                <option value="Inteligencia artificial">
                                    Inteligencia artificial
                                </option>
                                <option value="Animación de vídeo">Animación de vídeo</option>
                                <option value="Desarrollador web grafico">
                                    Desarrollador web grafico
                                </option>
                                <option value="Desarrollador web full-stack">
                                    Desarrollador web full-stack
                                </option>
                                <option value="Operador de entrada de datos">Operador de entrada de datos</option>
                            </select>
                        </div>
                        <div className="wrapper">
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="Ingresar país"
                            />
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Ingresar ciudad"
                            />
                        </div>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Ingresar ubicación"
                        />
                        <div className="salary_wrapper">
                            <select
                                value={salaryType}
                                onChange={(e) => setSalaryType(e.target.value)}
                            >
                                <option value="default">Seleccione tipo de salario</option>
                                <option value="Fixed Salary">Salario fijo</option>
                                <option value="Ranged Salary">Salario con rango</option>
                            </select>
                            <div>
                                {salaryType === "default" ? (
                                    <p>Por favor, proporcione el tipo de salario *</p>
                                ) : salaryType === "Fixed Salary" ? (
                                    <input
                                        type="number"
                                        placeholder="Ingresar salario"
                                        value={fixedSalary}
                                        onChange={(e) => setFixedSalary(e.target.value)}
                                    />
                                ) : (
                                    <div className="ranged_salary">
                                        <input
                                            type="number"
                                            placeholder="Ingresar salario"
                                            value={salaryFrom}
                                            onChange={(e) => setSalaryFrom(e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Ingresar salario con rango"
                                            value={salaryTo}
                                            onChange={(e) => setSalaryTo(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <textarea
                            rows="10"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ingresar descripción"
                        />
                        <button type="submit" style={{cursor: 'pointer'}}>Publicar</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PostJob;