
import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

export default function BasicDemo() {

    const start = <img alt="logo" src="/logo.png" height="40" className="mr-2" />;
    const navigate = useNavigate();
    const items = [
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => {
                if (!localStorage.getItem('token')) {
                    navigate('/login');
                }
                else {
                    navigate('/profile');
                }
            }
        },
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => 
                navigate('/home')
        },
        {
            label: 'Login',
            icon: 'pi pi-sign-in',
            command: () => {
                navigate('/login');
            }
        }
    ];

    return (
        <div className="card">
            <Menubar model={items} start={start} />
        </div>
    )
}
