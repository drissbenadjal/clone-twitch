import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Live } from "../components/Live";

import { Chats } from "../components/Chats";
import { Sidebar } from "../components/Sidebar";

import { ReactComponent as PlayLogo } from "../assets/icons/play.svg";
import { ReactComponent as PauseLogo } from "../assets/icons/pause.svg";
import { ReactComponent as FullScreenLogo } from "../assets/icons/fullscreen.svg";
import { ReactComponent as VolumeUpLogo } from "../assets/icons/volume-up.svg";
import { ReactComponent as VolumeDownLogo } from "../assets/icons/volume-down.svg";
import { ReactComponent as VolumeMuteLogo } from "../assets/icons/volume-mute.svg";

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

    const streamRef = useRef(null);

    const handleToggleFullScreen = () => {
        if (document.fullscreenElement === null) {
            streamRef.current.requestFullscreen();
            streamRef.current.style.width = "100vw";
        } else {
            document.exitFullscreen();
        }
    }

    useEffect(() => {
        streamRef.current.addEventListener("fullscreenchange", () => {
            if (document.fullscreenElement === null) {
                streamRef.current.style.width = "100%";
            }
        });
        streamRef.current.addEventListener("dblclick", () => {
                handleToggleFullScreen();
        });
    }, []);

    const [streamPlay, setStreamPlay] = useState(true);

    const handlePauseStream = () => {
        if (stream == null) return;
        const video = document.querySelector(".stream video");
        video.pause();
        setStreamPlay(false);
    }

    const handlePlayStream = () => {
        if (stream == null) return;
        const video = document.querySelector(".stream video");
        video.play();
        setStreamPlay(true);
    }

    
    const [streamVolume, setStreamVolume] = useState(0);

    useEffect(() => {
        if (stream == null) return;
        const video = document.querySelector(".stream video");
        video.muted = !video.muted;
        video.volume = streamVolume;
    }, [streamVolume]);

    const handleToggleMuteStream = () => {
        if (stream == null) return;
        const video = document.querySelector(".stream video");
        video.muted = !video.muted;
        if (video.volume === 0) {
            setStreamVolume(1);
        } else {
            setStreamVolume(0);
        }
    }

    const handleVolumeChange = (e) => {
        if (stream == null) return;
        setStreamVolume(e.target.value);
    }


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
                            <div className="stream" ref={streamRef}>
                                { stream !== null ? <Live name={stream} offlineScreen={offlineScreen} /> : <></> }
                                <div className="stream-ath" style={isLive ? {} : {opacity: 1}}>
                                    <div className="stream-ath-top">
                                        {
                                             isLive ? <p className="text-onlive">LIVE</p> : <p className="text-offline">DÉCONNECTÉ(E)</p>
                                        }
                                    </div>
                                    <div className="stream-ath-bottom">
                                        <div className="stream-ath-bottom-controls">
                                            {
                                                isLive ? <>
                                                <div className="stream-ath-bottom-play">
                                                    {
                                                        streamPlay && stream !== null ? <button onClick={handlePauseStream}>
                                                            <PauseLogo />
                                                        </button> :
                                                        <button onClick={handlePlayStream}>
                                                            <PlayLogo />
                                                        </button>
                                                    }
                                                </div>
                                                <div className="stream-ath-bottom-volume">
                                                    {
                                                        streamVolume <= 0 ? <button onClick={handleToggleMuteStream}>
                                                            <VolumeMuteLogo />
                                                        </button> : streamVolume < 0.5 ? <button onClick={handleToggleMuteStream}>
                                                            <VolumeDownLogo />
                                                        </button> : <button onClick={handleToggleMuteStream}>
                                                            <VolumeUpLogo />
                                                        </button>
                                                    }
                                                    <input type="range" step="0.05" min="0" max="1" value={streamVolume} onChange={(e) => handleVolumeChange(e)} />
                                                </div>
                                                </> : <></>
                                            }
                                        </div>
                                        <div className="stream-ath-bottom-controls">
                                            <button onClick={handleToggleFullScreen}>
                                                <FullScreenLogo />
                                            </button>
                                        </div>
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