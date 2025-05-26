import React, { useRef, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';
import useUser from '../Hooks/useUser';
import { useDispatch } from 'react-redux';
import { logOut } from '../Store/UserSlice';
import { Toast } from 'primereact/toast';


export default function BasicDemo() {

    const dispatch = useDispatch();
    const user = useUser();
    const toast = useRef(null);


    const showToast = (severity, summary, detail) => {
        toast.current?.clear();
        toast.current?.show({
            severity,
            summary,
            detail,
            life: 3000,
        });
    };

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
            if (response.status === 200) {
                showToast('success', 'Profile Added', `You've added the ${role} profile.`);
            } else {
                showToast('warn', 'Profile Not Added', `Server responded with status ${response.status}.`);
            }
        } catch (err) {
            showToast('error', 'Profile Addition Failed', err.message);
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
            label: localStorage.getItem('token') ? 'Logout' : 'Login',
            icon: localStorage.getItem('token') ? 'pi pi-sign-out' : 'pi pi-sign-in',
            command: () => {
                if (localStorage.getItem('token')) {
                    localStorage.removeItem('token');
                    dispatch(logOut());
                    //window.location.reload();
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
            <Toast ref={toast} />
        </div>
    )
}
