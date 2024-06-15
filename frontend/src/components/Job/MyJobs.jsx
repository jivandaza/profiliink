import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
    const [myJobs, setMyJobs] = useState([]);
    const [editingMode, setEditingMode] = useState(null);
    const { isAuthorized, user } = useContext(Context);

    const navigateTo = useNavigate();
    //Fetching all jobs
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get(
                    `${window.location.origin}/api/v1/trabajo/getmyjobs`,
                    { withCredentials: true }
                );
                setMyJobs(data.myJobs);
            } catch (error) {
                toast.error(error.response.data.message);
                setMyJobs([]);
            }
        };
        fetchJobs();
    }, []);
    if (!isAuthorized || (user && user.role !== "Empleador")) {
        navigateTo("/");
    }

    //Function For Enabling Editing Mode
    const handleEnableEdit = (jobId) => {
        //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
        setEditingMode(jobId);
    };

    //Function For Disabling Editing Mode
    const handleDisableEdit = () => {
        setEditingMode(null);
    };

    //Function For Updating The Job
    const handleUpdateJob = async (jobId) => {
        const updatedJob = myJobs.find((job) => job._id === jobId);
        await axios
            .put(`${window.location.origin}/api/v1/trabajo/update/${jobId}`, updatedJob, {
                withCredentials: true,
            })
            .then((res) => {
                toast.success(res.data.message);
                setEditingMode(null);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    //Function For Deleting Job
    const handleDeleteJob = async (jobId) => {
        await axios
            .delete(`${window.location.origin}/api/v1/trabajo/delete/${jobId}`, {
                withCredentials: true,
            })
            .then((res) => {
                toast.success(res.data.message);
                setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    const handleInputChange = (jobId, field, value) => {
        // Update the job object in the jobs state with the new value
        setMyJobs((prevJobs) =>
            prevJobs.map((job) =>
                job._id === jobId ? { ...job, [field]: value } : job
            )
        );
    };

    return (
        <>
            <div className="myJobs page">
                <div className="container">
                    <h1>TRABAJOS PUBLICADOS</h1>
                    {myJobs.length > 0 ? (
                        <>
                            <div className="banner">
                                {myJobs.map((element) => (
                                    <div className="card" key={element._id}>
                                        <div className="content">
                                            <div className="short_fields">
                                                <div>
                                                    <span>Título:</span>
                                                    <input
                                                        type="text"
                                                        disabled={
                                                            editingMode !== element._id ? true : false
                                                        }
                                                        value={element.title}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                element._id,
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    {" "}
                                                    <span>País:</span>
                                                    <input
                                                        type="text"
                                                        disabled={
                                                            editingMode !== element._id ? true : false
                                                        }
                                                        value={element.country}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                element._id,
                                                                "country",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <span>Ciudad:</span>
                                                    <input
                                                        type="text"
                                                        disabled={
                                                            editingMode !== element._id ? true : false
                                                        }
                                                        value={element.city}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                element._id,
                                                                "city",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <span>Habilidad:</span>
                                                    <select
                                                        value={element.habilidad.toString()}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                element._id,
                                                                "category",
                                                                e.target.value
                                                            )
                                                        }
                                                        disabled={
                                                            editingMode !== element._id ? true : false
                                                        }
                                                    >
                                                        <option value="1">
                                                            Diseño gráfico
                                                        </option>
                                                        <option value="2">
                                                            Desarrollo de aplicaciones móviles
                                                        </option>
                                                        <option value="3">
                                                            Desarrollador web front-end
                                                        </option>
                                                        <option value="4">
                                                            Desarrollador web back-end
                                                        </option>
                                                        <option value="5">
                                                            Cuenta y Finanzas
                                                        </option>
                                                        <option value="6">
                                                            Inteligencia artificial
                                                        </option>
                                                        <option value="7">
                                                            Animación de vídeo
                                                        </option>
                                                        <option value="8">
                                                            Desarrollador web grafico
                                                        </option>
                                                        <option value="9">
                                                            Desarrollador web full-stack
                                                        </option>
                                                        <option value="10">
                                                            Operador de entrada de datos
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                          <span>
                            Salario:{" "}
                              {element.fixedSalary ? (
                                  <input
                                      type="number"
                                      disabled={
                                          editingMode !== element._id ? true : false
                                      }
                                      value={element.fixedSalary}
                                      onChange={(e) =>
                                          handleInputChange(
                                              element._id,
                                              "fixedSalary",
                                              e.target.value
                                          )
                                      }
                                  />
                              ) : (
                                  <div>
                                      <input
                                          type="number"
                                          disabled={
                                              editingMode !== element._id ? true : false
                                          }
                                          value={element.salaryFrom}
                                          onChange={(e) =>
                                              handleInputChange(
                                                  element._id,
                                                  "salaryFrom",
                                                  e.target.value
                                              )
                                          }
                                      />
                                      <input
                                          type="number"
                                          disabled={
                                              editingMode !== element._id ? true : false
                                          }
                                          value={element.salaryTo}
                                          onChange={(e) =>
                                              handleInputChange(
                                                  element._id,
                                                  "salaryTo",
                                                  e.target.value
                                              )
                                          }
                                      />
                                  </div>
                              )}
                          </span>
                                                </div>
                                                <div>
                                                    {" "}
                                                    <span>Expira:</span>
                                                    <select
                                                        value={element.expired}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                element._id,
                                                                "expired",
                                                                e.target.value
                                                            )
                                                        }
                                                        disabled={
                                                            editingMode !== element._id ? true : false
                                                        }
                                                    >
                                                        <option value={true}>Verdadero</option>
                                                        <option value={false}>Falso</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="long_field">
                                                <div>
                                                    <span>Descripción:</span>{" "}
                                                    <textarea
                                                        rows={5}
                                                        value={element.description}
                                                        disabled={
                                                            editingMode !== element._id ? true : false
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                element._id,
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <span>Ubicación: </span>
                                                    <textarea
                                                        value={element.location}
                                                        rows={5}
                                                        disabled={
                                                            editingMode !== element._id ? true : false
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                element._id,
                                                                "location",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Out Of Content Class */}
                                        <div className="button_wrapper">
                                            <div className="edit_btn_wrapper">
                                                {editingMode === element._id ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleUpdateJob(element._id)}
                                                            className="check_btn"
                                                        >
                                                            <FaCheck />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDisableEdit()}
                                                            className="cross_btn"
                                                        >
                                                            <RxCross2 />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEnableEdit(element._id)}
                                                        className="edit_btn"
                                                    >
                                                        Editar
                                                    </button>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleDeleteJob(element._id)}
                                                className="delete_btn"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>
                            ¡No has publicado ningún trabajo o es posible que hayas eliminado todos tus trabajos!
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyJobs;