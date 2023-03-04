import React, { useState, useEffect, useRef } from "react";
import {ReactFlvPlayer} from 'react-flv-player';

export const Live = ({name, offlineScreen}) => {

    const [isLive, setIsLive] = useState(false);

    const url = "ws://localhost:8000//" + name + ".flv";

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
        const intervalId = setInterval(checkLiveStatus, 2000);
        return () => clearInterval(intervalId);
    }, []);

    const videoRef = useRef(null);
    
    return (
        <>
                { isLive ? <ReactFlvPlayer
                            ref={videoRef}
                            type="flv"
                            url={url}
                            handleError={(err) => {
                                switch (err) {
                                    case "NetworkError":
                                        console.log("NetworkError");
                                        break;
                                    case "MediaError":
                                        console.log("MediaError");
                                        break;
                                    case "FlvError":
                                        console.log("FlvError");
                                        break;
                                    default:
                                        console.log("UnknownError");
                                        break;
                                }
                            }}
                            />
                            :<div>
                                <img className="offline-screen" src={offlineScreen} alt="" />
                            </div>
                        }
        </>
    );
}