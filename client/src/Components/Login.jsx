import React, { useState } from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import useUser from '../Hooks/useUser';

export default function LoginDemo() {
    const user = useUser();
    const [isLIHovered, setLIIsHovered] = useState(false);
    const [isSIHovered, setSIIsHovered] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(null);
    const items = ['student', 'teacher'];
    const navigate = useNavigate();

    function connectToServer() {
        fetch('http://localhost:3000/user/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok' + res.error);
                }
                return res.json()
            })
            .then(response => {
                console.log(response);
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    navigate('/home')
                }
                else {
                    console.log(response.message);
                }
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            })
    }

    function handelLogIn(e) {

        console.log(email, password);
        connectToServer();

    }

    return (
        <div className="card">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Username</label>
                        <InputText id="username" type="text" className="w-12rem" />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Password</label>
                        <InputText id="password" type="password" className="w-12rem" />
                    </div>
                    <Button onClick={handelLogIn()} label="Login" icon="pi pi-user" className="w-10rem mx-auto"></Button>
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>OR</b>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider>
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button>
                </div>
            </div>
        </div>
    )
}
        