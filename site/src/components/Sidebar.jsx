import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as LeftArrow } from "../assets/icons/arrow-left.svg";
import { ReactComponent as RightArrow } from "../assets/icons/arrow-right.svg";
import { ReactComponent as ArrowDouble } from "../assets/icons/arrow-double.svg";

export const Sidebar = () => {
    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <h2>Pour vous</h2>
                <LeftArrow />
            </div>
            <div className="sidebar-content">
                <div className="sidebar-followed-chanel">
                    <div className="sidebar-followed-chanel-header">
                        <h3>CHAÎNES SUIVIES</h3>
                        <ArrowDouble />
                    </div>
                    <Link to="/saku" className="sidebar-chanel-content">
                        <div className='sidebar-chanel-content-item'>
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
                        </div>
                    </Link>
                </div>
                <div className="sidebar-recommandations">
                    <div className="sidebar-recommandations-header">
                        <h3>CHAÎNES RECOMMANDÉES</h3>
                    </div>
                    <div className="sidebar-recommandations-content">

                    </div>
                </div>
            </div>
        </nav>
    );
};
