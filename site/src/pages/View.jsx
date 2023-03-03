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
    const [offlineScreen, setOfflineScreen] = useState(null);
    const [isLive, setIsLive] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (getName.length === 0) {
            window.document.title = "Twitch";
            return;
        }
        if (getName.length > 0) {
            window.document.title = getName + " - Twitch";
            setName(getName);
        }
    }, [getName, navigate]);
    
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
            fetch("http://localhost:3001/api/getuserinfos", {
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
                setOfflineScreen(data.offlineScreen);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }, [name]);

    const checkLiveStatus = () => {
        fetch("http://localhost:3001/api/getislive", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            name: name,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            setIsLive(data.isLive === "true");
        })
        .catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        if (name !== null) {
            const intervalId = setInterval(checkLiveStatus, 2000);
            return () => clearInterval(intervalId);
        }
    });
        

    if (getName.length === 0) {
        return (
            <>
                <Navbar />
                <main className="home-container">
                    <Sidebar />
                    <div className="home-box">
                        <h1>Home</h1>
                        <Link to="/saku">saku</Link>
                    </div>
                </main>
            </>
        );
    } else {
        return (
            <>
                <Navbar />
                <main className="stream-container">
                    <Sidebar />
                        <div className="stream-box">
                            <div className="stream">
                                { stream !== null ? <Live name={stream} offlineScreen={offlineScreen} /> : <></> }
                                <div className="stream-ath" style={isLive ? {} : {opacity: 1}}>
                                    <div className="stream-ath-top">
                                        {
                                             isLive ? <p className="text-onlive">LIVE</p> : <p className="text-offline">DÉCONNECTÉ(E)</p>
                                        }
                                    </div>
                                    <div className="stream-ath-bottom">

                                    </div>
                                </div>
                            </div>
                        </div>
                    <Chats />
                </main>
            </>
        );
    }
};