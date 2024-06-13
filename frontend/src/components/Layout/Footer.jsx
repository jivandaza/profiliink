import React, { useContext } from "react";
import { Context } from "../../main";

const Footer = () => {
    const { isAuthorized } = useContext(Context);
    return (
        <footer className={isAuthorized ? "footerShow" : "footerHide"}>
            <div>&copy; Todos los derechos reservados por Profilink.</div>
        </footer>
    );
};

export default Footer;