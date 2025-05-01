import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div class="antialiased pb-6 relative">

            {/* <div style={{
                backgroundImage: "url('/home-background.jpg'),url('hb2.png'), url('hb3.png')", backgroundSize: 'cover', height: '100vh',
                flexDirection: "column",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }} > */}
            <div style={{
                backgroundImage: "url('/home-background.jpg'), url('hb2.png'), url('hb3.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
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
                <div className="p-mt-3 p-d-flex p-jc-center">
                </div>
                <div class="-mt-12 bg-surface-0 dark:bg-surface-950 max-w-[68rem] w-[92%] lg:w-auto mx-auto shadow-blue-card dark:shadow-none border-0 dark:border border-white/12 rounded-4xl lg:rounded-full p-6 lg:p-10 flex flex-col lg:flex-row gap-4 relative z-50">
                    <Button class="button-gradient w-full lg:w-auto" label=" add teacher profile" icon="pi pi-user-plus" severity="success"></Button>
                    <Button onClick={() => { navigate('/signUp') }} label=" add student profile" icon="pi pi-user-plus" severity="success" className="w-10rem p-mr-2"></Button>
                </div>
            </div>
        </div >
    );
}
