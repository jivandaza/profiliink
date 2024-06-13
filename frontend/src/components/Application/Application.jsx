import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
const Application = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [resume, setResume] = useState(null);

    const { isAuthorized, user } = useContext(Context);

    const navigateTo = useNavigate();

    // Function to handle file input changes
    const handleFileChange = (event) => {
        const resume = event.target.files[0];
        setResume(resume);
    };

    const { id } = useParams();
    const handleApplication = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("coverLetter", coverLetter);
        formData.append("resume", resume);
        formData.append("jobId", id);

        try {
            const { data } = await axios.post(
                `${window.location.origin}/api/v1/aplicacion/post`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setName("");
            setEmail("");
            setCoverLetter("");
            setPhone("");
            setAddress("");
            setResume("");
            toast.success(data.message);
            navigateTo("/trabajo/todos");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (!isAuthorized || (user && user.role === "Empleador")) {
        navigateTo("/");
    }

    return (
        <section className="application">
            <div className="container">
                <h3>SOLICITUD DE TRABAJO</h3>
                <form onSubmit={handleApplication}>
                    <input
                        type="text"
                        placeholder="Ingresar nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Ingresar correo eléctronico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Ingresar número de teléfono"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Ingresar dirección"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <textarea
                        placeholder="Ingresar carta de presentación..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                    />
                    <div>
                        <label
                            style={{ textAlign: "start", display: "block", fontSize: "20px" }}
                        >
                            Seleccionar hoja de vida
                        </label>
                        <input
                            type="file"
                            accept=".pdf, .jpg, .png"
                            onChange={handleFileChange}
                            style={{ width: "100%" }}
                        />
                    </div>
                    <button type="submit">Enviar Solicitud</button>
                </form>
            </div>
        </section>
    );
};

export default Application;