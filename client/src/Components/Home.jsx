import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    function connectToServer(role) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login first.");
            navigate('/login');
            return;
        }
        fetch('http://localhost:3000/user/addProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                activeRole: role,
                token: localStorage.getItem('token')
            }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                // if (!data.ok) {
                //     throw new Error(data.error || 'Unknown error occurred');
                // }
                console.log(data);
                if (data.token) {
                    console.log("token: " + data.token);
                    localStorage.setItem('token', data.token);
                    alert(`hi ${data.newUser.name}!\n thanks for joining us as a ${role}.`);
                    // dispatch(setActiveRole({
                    //     activeRole: role
                    // }));
                } else {
                    alert("error: " + data.message);
                    console.log(data.message);
                }
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            })
    }

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
                backgroundImage: "url('/home-background.jpg')",
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
                <div className="layout-content">
                </div>
                {/* <div class="-mt-12 bg-surface-0 dark:bg-surface-950 max-w-[68rem] w-[92%] lg:w-auto mx-auto shadow-blue-card dark:shadow-none border-0 dark:border border-white/12 rounded-4xl lg:rounded-full p-6 lg:p-10 flex flex-col lg:flex-row gap-4 relative z-50"> */}
                <div class="grid grid-cols-3 gap-2 p-3" >
                    {/* <Button className="button-gradient" onClick={() => { connectToServer('teacher') }} label=" add teacher profile" icon="pi pi-user-plus" severity="success"></Button> */}
                    {/* <Button class="button-gradient w-full lg:w-auto" label=" add teacher profile" onClick={() => { connectToServer('teacher') }} icon="pi pi-user-plus" severity="success"></Button>
                    <Button class="button-gradient w-full lg:w-auto" label=" add student profile" onClick={() => { connectToServer('student') }} icon="pi pi-user-plus" severity="success"></Button>
                */}
                    <Button  label=" add teacher profile" style={{backgroundColor:'rgb(255, 255, 255)',color:'rgb(37,40,61)',borderColor:  'rgb(37,40,61)' }} icon="pi pi-user-plus" onClick={() => { connectToServer('teacher') }} className="w-10rem p-mr-2"></Button>
                    <Button  label=" add student profile" style={{backgroundColor:'rgb(255, 255, 255)',color:'rgb(37,40,61)' ,borderColor:  'rgb(37,40,61)'}} icon="pi pi-user-plus" onClick={() => { connectToServer('student') }} className="w-10rem p-mr-2"></Button>
                </div>
            </div>
        </div >
    );
}
