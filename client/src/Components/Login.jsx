import React, { useState } from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import useUser from '../Hooks/useUser';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../Store/UserSlice';

export default function LoginDemo() {
    const [isLIHovered, setLIIsHovered] = useState(false);
    const [isSIHovered, setSIIsHovered] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(null);
    const items = ['student', 'teacher'];
    const navigate = useNavigate();
    const dispatch=useDispatch();

    async function connectToServer() {
        try {
            const response = await fetch('http://localhost:3000/user/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    activeRole: role,
                    createdAt: "2025-03-31T12:34:56.789Z"
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Unknown error occurred');
            }
    
            const data = await response.json();
            console.log(data);
    
            if (data.token) {
                localStorage.setItem('token', data.token);
                navigate('/home');
                dispatch(setUserDetails({ email, password, activeRole: role }));
            } else {
                console.log(data.message || 'No token returned');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    }



    function handelLogIn(e) {

        console.log(email, password,role);
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
                    <Button onClick= {()=>navigate("/signup")}label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button>
                </div>
            </div>
        </div>
    )
}
        