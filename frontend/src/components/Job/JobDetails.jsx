import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState({});
    const navigateTo = useNavigate();

    const { isAuthorized, user } = useContext(Context);

    useEffect(() => {
        axios
            .get(`${window.location.origin}/api/v1/trabajo/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setJob(res.data.job);
            })
            .catch((error) => {
                navigateTo("/notfound");
            });
    }, []);

    if (!isAuthorized) {
        navigateTo("/acceder");
    }

    return (
        <section className="jobDetail page">
            <div className="container">
                <h3>DETALLES TRABAJO</h3>
                <div className="banner">
                    <p>
                        Título: <span> {job.title}</span>
                    </p>
                    <p>
                        Categoría: <span>{job.category}</span>
                    </p>
                    <p>
                        País: <span>{job.country}</span>
                    </p>
                    <p>
                        Ciudad: <span>{job.city}</span>
                    </p>
                    <p>
                        Ubicación: <span>{job.location}</span>
                    </p>
                    <p>
                        Descripción: <span>{job.description}</span>
                    </p>
                    <p>
                        Trabajo publicado el: <span>{job.jobPostedOn}</span>
                    </p>
                    <p>
                        Salario:{" "}
                        {job.fixedSalary ? (
                            <span>{job.fixedSalary}</span>
                        ) : (
                            <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
                        )}
                    </p>
                    {user && user.role === "Empleador" ? (
                        <></>
                    ) : (
                        <Link to={`/aplicacion/${job._id}`}>Aplicar Ahora</Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default JobDetails;