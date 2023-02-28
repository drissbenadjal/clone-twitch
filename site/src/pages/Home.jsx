import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Live } from "../components/Live";

export const Home = () => {
    //recuperer les parametres de l'url
    const name = window.location.pathname.split("/")[1];

    //si le nom est vide on envoie vers la page notfound
    const navigate = useNavigate();

    useEffect(() => {
        if (name.length === 0) {
            navigate("/Notfound");
        }
    }, [name, navigate]);
        

    return (
        <>
            <Navbar />
            <main>
                <Live />
            </main>
        </>
    );
};