import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';
import useUser from '../Hooks/useUser';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../Store/UserSlice';
import { setActiveRole } from '../Store/UserSlice';


export default function BasicDemo() {

    const dispatch = useDispatch();
    const user = useUser();
    
    async function switchRole(role) {
        try {
            const response=await api.post('user/changeActiveRole',{activeRole:role});
            localStorage.setItem("token",response.data.data)
            dispatch(setActiveRole(role));
        } catch (err) {
            console.error('Error fetching user:', err);
        }
    }

    async function connectToServer(role) {
        try {
            await api.post('user/addProfile', {
                newRole: role
            })
        } catch (err) {
            console.error('Failed to connect to server:', err);
        }
    }

    const start = <img alt="logo" src="/logo.png" height="40" className="mr-2" />;
    const navigate = useNavigate();
    const items = [
        ...(user.email ? [{
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
            label: 'Switch Profile',
            icon: 'pi pi-sync',
            items: [
                {
                    label: 'Student',
                    icon: 'pi pi-users',
                    command: () => {
                        switchRole('student')
                    }
                },
                {
                    label: 'Teacher',
                    icon: 'pi pi-users',
                    command: () => {
                        switchRole('teacher')
                    }
                }
            ]
        },


        {
            label: 'Add Profile',
            icon: 'pi pi-user-plus',
            items: [
                {
                    label: 'Student',
                    icon: 'pi pi-users',
                    command: () => {
                        connectToServer('student')
                    }
                },
                {
                    label: 'Teacher',
                    icon: 'pi pi-users',
                    command: () => {
                        connectToServer('teacher')
                    }
                }
            ]
        },

        {
            label: user.email ? 'Logout' : 'Login',
            icon: user.email ? 'pi pi-sign-out' : 'pi pi-sign-in',
            command: () => {
                if (localStorage.getItem('token')) {
                    localStorage.removeItem('token');
                    dispatch(logOut());
                    navigate('/home');
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
