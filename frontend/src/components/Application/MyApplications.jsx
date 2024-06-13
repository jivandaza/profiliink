import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
    const { user } = useContext(Context);
    const [applications, setApplications] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [resumeImageUrl, setResumeImageUrl] = useState("");

    const { isAuthorized } = useContext(Context);
    const navigateTo = useNavigate();

    useEffect(() => {
        try {
            if (user && user.role === "Empleador") {
                axios
                    .get(`${window.location.origin}/api/v1/aplicacion/empleador/getall`, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        setApplications(res.data.applications);
                    });
            } else {
                axios
                    .get(`${window.location.origin}/api/v1/aplicacion/aspirante/getall`, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        setApplications(res.data.applications);
                    });
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }, [isAuthorized]);

    if (!isAuthorized) {
        navigateTo("/");
    }

    const deleteApplication = (id) => {
        try {
            axios
                .delete(`${window.location.origin}/api/v1/aplicacion/delete/${id}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    toast.success(res.data.message);
                    setApplications((prevApplication) =>
                        prevApplication.filter((application) => application._id !== id)
                    );
                });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const openModal = (imageUrl) => {
        setResumeImageUrl(imageUrl);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <section className="my_applications page">
            {user && user.role === "Aspirante" ? (
                <div className="container">
                    <h1>MIS SOLICITUDES</h1>
                    {applications.length <= 0 ? (
                        <>
                            {" "}
                            <h4>No se encontraron solicitudes</h4>{" "}
                        </>
                    ) : (
                        applications.map((element) => {
                            return (
                                <JobSeekerCard
                                    element={element}
                                    key={element._id}
                                    deleteApplication={deleteApplication}
                                    openModal={openModal}
                                />
                            );
                        })
                    )}
                </div>
            ) : (
                <div className="container">
                    <h1>SOLICITUDES DE ASPIRANTES</h1>
                    {applications.length <= 0 ? (
                        <>
                            <h4>No se encontraron solicitudes</h4>
                        </>
                    ) : (
                        applications.map((element) => {
                            return (
                                <EmployerCard
                                    element={element}
                                    key={element._id}
                                    openModal={openModal}
                                />
                            );
                        })
                    )}
                </div>
            )}
            {modalOpen && (
                <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
            )}
        </section>
    );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
    return (
        <>
            <div className="job_seeker_card">
                <div className="detail">
                    <p>
                        <span>Nombre:</span> {element.name}
                    </p>
                    <p>
                        <span>Correo eléctronico:</span> {element.email}
                    </p>
                    <p>
                        <span>Teléfono:</span> {element.phone}
                    </p>
                    <p>
                        <span>Dirección:</span> {element.address}
                    </p>
                    <p>
                        <span>Carta de presentación:</span> {element.coverLetter}
                    </p>
                </div>
                <div className="resume">
                    <img
                        src={element.resume.url}
                        alt="resume"
                        onClick={() => openModal(element.resume.url)}
                    />
                </div>
                <div className="btn_area">
                    <button onClick={() => deleteApplication(element._id)}>
                        Eliminar
                    </button>
                </div>
            </div>
        </>
    );
};

const EmployerCard = ({ element, openModal }) => {
    return (
        <>
            <div className="job_seeker_card">
                <div className="detail">
                    <p>
                        <span>Nombre:</span> {element.name}
                    </p>
                    <p>
                        <span>Correo eléctronico:</span> {element.email}
                    </p>
                    <p>
                        <span>Teléfono:</span> {element.phone}
                    </p>
                    <p>
                        <span>Dirección:</span> {element.address}
                    </p>
                    <p>
                        <span>Carta de presentación:</span> {element.coverLetter}
                    </p>
                </div>
                <div className="resume">
                    <img
                        src={element.resume.url}
                        alt="resume"
                        onClick={() => openModal(element.resume.url)}
                    />
                </div>
            </div>
        </>
    );
};