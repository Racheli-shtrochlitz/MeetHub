
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
                navigate('/profile')
            }
        },
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
                navigate('/home')
            }
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Components',
                    icon: 'pi pi-bolt'
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server'
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
        ,
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
