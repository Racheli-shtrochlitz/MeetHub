import { useState, React } from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [isLIHovered, setLIIsHovered] = useState(false);
    const [isSIHovered, setSIIsHovered] = useState(false);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function connectToServer(email, password) {
        fetch('http://localhost:3000/user/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, password, activeRole: "student"
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
        connectToServer(email, password);

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
                        <Button style={{
                            backgroundColor: isLIHovered ? 'rgb(168, 98, 148)' : 'rgb(130, 43, 105)',
                            borderColor: 'rgb(130, 43, 105)',
                            boxShadowColor: 'rgb(104, 54, 90)',
                            transition: 'background-color 0.3s ease'

                        }}
                            onMouseEnter={() => setLIIsHovered(true)}
                            onMouseLeave={() => setLIIsHovered(false)}
                            onClick={()=>handelLogIn} label="Login" icon="pi pi-user" className="w-10rem mx-auto"></Button>
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

