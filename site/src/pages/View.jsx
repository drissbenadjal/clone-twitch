import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Live } from "../components/Live";

import { Chats } from "../components/Chats";
import { Sidebar } from "../components/Sidebar";

export const View = () => {
    
    const getName = window.location.pathname.split("/")[1];

    const [name, setName] = useState(null);
    const [stream, setStream] = useState(null);

    //recuperer les parametres de l'url

    //si le nom est vide on envoie vers la page notfound
    const navigate = useNavigate();

    useEffect(() => {
        if (getName.length === 0) return;
        setName(getName);
    }, [getName, navigate]);
        
    //attendre que le nom soit chargé
    useEffect(() => {
        if (name !== null) {
            fetch("http://localhost:3001/api/getstream", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'name': name
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.streamKey === null) {
                    navigate("/Notfound");
                } else {
                    setStream(data.streamKey);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }, [name]);

    if (getName.length === 0) {
        return (
            <>
                <Navbar />
                <main>
                    <h1>Home</h1>
                </main>
            </>
        );
    } else {
        return (
            <>
                <Navbar />
                <main>
                    <Sidebar />
                        { stream !== null ? <Live name={stream} /> : <></> }
                    <Chats />
                </main>
            </>
        );
    }
};