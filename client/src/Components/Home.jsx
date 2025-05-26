import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div class="antialiased pb-6 relative">
            <div style={{
                backgroundImage: "url('/home-background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '30vh',
                width: '100%',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }} >

                <span style={{
                    fontSize: "5rem",
                    color: "rgba(255, 255, 255, 0.8)",
                    textShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
                }}>
                    EDUCONNECT
                </span>
                <p>This is the home page of your application.</p>
                <div className="layout-content">
                </div>
            </div>
            <div style={{
                height: '35vh', }}></div>
        </div >
    );
}
