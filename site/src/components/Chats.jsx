import React, { useState, useEffect } from 'react';

import { ReactComponent as LeftArrow } from "../assets/icons/arrow-left.svg";
import { ReactComponent as RightArrow } from "../assets/icons/arrow-right.svg";

export const Chats = ({streamID}) => {
    
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (streamID === null) return;
        fetch("http://localhost:3001/api/getchatmessages", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'streamid': streamID
            })
        })
        .then((response) => response.json())
        .then((data) => {
            setChats(data.messages);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [streamID]);

    //generer une couleur aléatoire pour le pseudo
    const randomColor = () => {
        let color = 'color: #';
        for (let i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 10);
        }
        return color;
    }

    return (
        <div className="chats-container">
            <div className="chats-header">
                <div className="chats-header-arrow">
                    <RightArrow />
                </div>
                <div className="chats-header-title">
                    <h2>Chat Du Stream</h2>
                </div>
                <div className="chats-header-settings">
                    <RightArrow />
                </div>
            </div>
            <div className="chats-content">
            <p className='welcom'>Bienvenue sur le chat !</p>
            <div className="chats-content-messages">
                {
                    chats.map((chat) => {
                        return (
                            <div className="chat" key={chat.chat_id}>
                                <div className="chat-user">
                                    <p><span>{chat.pseudo}:</span></p>
                                </div>
                                <div className="chat-message">
                                    <p><span>{chat.message}</span></p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            </div>
            <div className="chats-footer">
                <form action="">
                    <div className="chats-footer-input">
                        <input type="text" placeholder="Envoyer un message"/>
                    </div>
                    <div className="chats-footer-send">
                        <div></div>
                        <input type="submit" value="Chat"/>
                    </div>
                </form>
            </div>
        </div>
    );
}