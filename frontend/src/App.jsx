import React, { useContext, useEffect } from 'react';
import './App.css';
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Layout/Navbar.jsx";
import Footer from "./components/Layout/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import PostJob from "./components/Job/PostJob";
import MyJobs from "./components/Job/MyJobs";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import axios from "axios";

function App() {
    const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `${window.location.origin}/api/v1/user/getuser`,
                    {
                        withCredentials: true,
                    }
                );
                setUser(response.data.user);
                setIsAuthorized(true);
            } catch (error) {
                setIsAuthorized(false);
            }
        };
        fetchUser();
    }, [isAuthorized]);

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/acceder" element={<Login />} />
                    <Route path="/registrar" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/trabajo/todos" element={<Jobs />} />
                    <Route path="/trabajo/:id" element={<JobDetails />} />
                    <Route path="/trabajo/publicar" element={<PostJob />} />
                    <Route path="/trabajo/publicados" element={<MyJobs />} />
                    <Route path="/aplicacion/:id" element={<Application />} />
                    <Route path="/aplicacion/todas" element={<MyApplications />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
                <Toaster />
            </BrowserRouter>
        </>
    )
}

export default App
