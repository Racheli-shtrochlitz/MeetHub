
import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';
import useUser from '../Hooks/useUser';



export default function BasicDemo() {

    const user = useUser();

    async function connectToServer(role) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login first.");
            navigate('/login');
            return;
        }
        try {
            const response = await api.post('user/addProfile', {
                newRole: role
            });
            alert(response.data.message)
        } catch (error) {
            console.error(`Fetch error:`, error.message);
            alert(error.message)
        }
    }


    const start = <img alt="logo" src="/logo.png" height="40" className="mr-2" />;
    const navigate = useNavigate();
    const items = [
        ...(user ? [{
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => navigate('/profile')
        }] : []),

        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/home')
        },

        {
            label: 'Add Profile',
            icon: 'pi-user-plus',
            items: [
                {
                    label: 'Student',
                    icon: 'pi-users',
                    command: () => {
                        connectToServer('student')
                    }
                },
                {
                    label: 'Teacher',
                    icon: 'pi-users',
                    command: () => {
                        connectToServer('teacher')
                    }
                }
            ]
        },

        {
            label: localStorage.getItem('token') ? 'Logout' : 'Login',
            icon: localStorage.getItem('token') ? 'pi pi-sign-out' : 'pi pi-sign-in',
            command: () => {
                if (localStorage.getItem('token')) {
                    localStorage.removeItem('token');
                    window.location.reload();
                    navigate('/login');
                } else {
                    navigate('/login');
                }
            }
        }
    ];


    return (
        <div className="card">
            <Menubar model={items} start={start} />
        </div>
    )
}
