import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as LeftArrow } from "../assets/icons/arrow-left.svg";
import { ReactComponent as RightArrow } from "../assets/icons/arrow-right.svg";
import { ReactComponent as ArrowDouble } from "../assets/icons/arrow-double.svg";

export const Sidebar = () => {

    const [streamOnlive, setStreamOnlive] = useState(null);

    const getStreamersOnline = () => {
        fetch("http://localhost:3001/api/getstreamerOnline", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setStreamOnlive(data.streamers);
        })
        .catch((error) => {
            console.error(error);
        });
    };
    
    useEffect(() => {
        getStreamersOnline();
        setInterval(() => {
            getStreamersOnline();
        }
        , 3000);
    }, []);
            

    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <h2>Pour vous</h2>
                <LeftArrow />
            </div>
            <div className="sidebar-content">
                {/* <div className="sidebar-followed-chanel">
                    <div className="sidebar-followed-chanel-header">
                        <h3>CHAÎNES SUIVIES</h3>
                        <ArrowDouble />
                    </div>
                    <div className="sidebar-chanel-content">
                        <Link to="/saku" className='sidebar-chanel-content-item'>
                            <div className="sidebar-chanel-content-item-img">
                                <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/1975b18f-fa7d-443f-b191-fba08f92f3a2-profile_image-70x70.jpeg" alt="logo" />
                            </div>
                            <div className="sidebar-chanel-content-item-title">
                                <h4>SAKU</h4>
                                <p>Counter-Strike: Gl...</p>
                            </div>
                            <div className="sidebar-chanel-content-item-viewers">
                                <p><span className='dot-stream'></span>0</p>
                            </div>
                        </Link>
                    </div>
                </div> */}
                <div className="sidebar-recommandations">
                    <div className="sidebar-recommandations-header">
                        <h3>CHAÎNES RECOMMANDÉES</h3>
                    </div>
                    <div className="sidebar-chanel-content">
                        {
                            streamOnlive && streamOnlive.map((streamer) => {
                                return (
                                <Link to={`/${streamer.pseudo}`} className='sidebar-chanel-content-item' key={streamer.id}>
                                    <div className="sidebar-chanel-content-item-img">
                                        <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/1975b18f-fa7d-443f-b191-fba08f92f3a2-profile_image-70x70.jpeg" alt="logo" />
                                    </div>
                                    <div className="sidebar-chanel-content-item-title">
                                        <h4>{streamer.pseudo}</h4>
                                        <p>Counter-Strike: Gl...</p>
                                    </div>
                                    <div className="sidebar-chanel-content-item-viewers">
                                        <p><span className='dot-stream'></span>0</p>
                                    </div>
                                </Link>
                                )
                            })
                        }
                        {
                            streamOnlive === null && (
                                    <p className='no-stream'>Lance un live et sois le premier à être recommandé !</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};
