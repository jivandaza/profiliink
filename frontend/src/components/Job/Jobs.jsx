import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const { isAuthorized, user} = useContext(Context);
    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const allJobsRes = await axios.get(`${window.location.origin}/api/v1/trabajo/getall`, {
                    withCredentials: true,
                });
                setJobs(allJobsRes.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchRecommendedJobs = async () => {
            try {
                const recommendedJobsRes = await axios.get(`${window.location.origin}/api/v1/trabajo/${user._id}/recomendados`, {
                    withCredentials: true,
                });
                setRecommendedJobs(recommendedJobsRes.data);
                console.log(recommendedJobsRes.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (user) {
            fetchJobs();
            fetchRecommendedJobs();
        }
    }, [user]);

    if (!isAuthorized) {
        navigateTo("/");
    }

    return (
        <section className="jobs page">
            <div className="container">
                {
                    user.role === "Empleador" && (
                        <>
                            <h1>TRABAJOS DISPONIBLES</h1>
                            <div className="banner">
                                {jobs.jobs &&
                                    jobs.jobs.map((element) => {
                                        return (
                                            <div className="card" key={element._id}>
                                                <p>{element.title}</p>
                                                <p>{element.category}</p>
                                                <p>{element.country}</p>
                                                <Link to={`/trabajo/${element._id}`}>Detalles del trabajo</Link>
                                            </div>
                                        );
                                    })}
                            </div>
                        </>
                    )
                }
                {
                    user.role === "Aspirante" && (
                        <>
                            <h1>TRABAJOS RECOMENDADOS</h1>
                            <div className="banner">
                                {recommendedJobs.jobs &&
                                    recommendedJobs.jobs.map((element) => {
                                        return (
                                            <div className="card" key={element.job._id}>
                                                <p>{element.job.title}</p>
                                                <p>{element.job.category}</p>
                                                <p>{element.job.country}</p>
                                                <Link to={`/trabajo/${element.job._id}`}>Detalles del trabajo</Link>
                                            </div>
                                        );
                                    })}
                            </div>
                        </>
                    )
                }
            </div>
        </section>
    );
};

export default Jobs;