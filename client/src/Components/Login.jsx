import { useState, React } from 'react';
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
                dispatch(setUserDetails({ email, password, activeRole: role }));
                navigate('/home');
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh", width: "100vw" }}>
            <div className="card" >
                <div className="flex flex-column md:flex-row">
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">email</label>
                            <InputText value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="text" className="w-12rem" />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Password</label>
                            <InputText value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" className="w-12rem" />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">role</label>
                            <Dropdown value={role} onChange={(e) => setRole(e.value)} options={items} className="w-12rem" />
                        </div>
                        <Button style={{
                            backgroundColor: isLIHovered ? 'rgb(168, 98, 148)' : 'rgb(130, 43, 105)',
                            borderColor: 'rgb(130, 43, 105)',
                            boxShadowColor: 'rgb(104, 54, 90)',
                            transition: 'background-color 0.3s ease'

                        }}
                            onMouseEnter={() => setLIIsHovered(true)}
                            onMouseLeave={() => setLIIsHovered(false)}
                            onClick={() => handelLogIn()} label="Login" icon="pi pi-user" className="w-10rem mx-auto"></Button>
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
                        <Button style={{
                            backgroundColor: isSIHovered ? 'rgb(243, 204, 130)' : 'rgb(240,175,58)',
                            borderColor: ' rgb(243, 194, 103)',
                            boxShadowColor: 'rgb(173, 139, 76)',
                        }}
                            onMouseEnter={() => setSIIsHovered(true)}
                            onMouseLeave={() => setSIIsHovered(false)}
                            label="Sign Up" onClick={() => navigate('/signup')} icon="pi pi-user-plus" severity="success" className="w-10rem"></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}