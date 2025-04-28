import { useState, React } from 'react';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [isHovered, setIsHovered] = useState(false);


    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [subject, setSubject] = useState('');
    const [role, setRole] = useState(null);
    const items = ['student', 'teacher'];


    const navigate = useNavigate();

    function connectToServer() {
        fetch('http://localhost:5000/user/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:userName, email, password,activeRole: role , subject
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok:' + res.error);
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
        connectToServer();
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height: "80vh", width: "100vw" }}>
            <div className="card" >
                <div className="flex flex-column md:flex-row">
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Role</label>
                            <Dropdown value={role} onChange={(e) => setRole(e.value)} options={items} className="w-12rem" />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">User Name</label>
                            <InputText value={userName} onChange={(e) => setUserName(e.target.value)} id="username" type="text" className="w-12rem" />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Email</label>
                            <InputText value={email} onChange={(e) => setEmail(e.target.value)} id="username" type="text" className="w-12rem" />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Password</label>
                            <InputText value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" className="w-12rem" />
                        </div>
                        {/* if teacher */}
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Subject</label>
                            {role == "student" ? (<InputText disabled placeholder="only for teacher profile" value={subject} onChange={(e) => setSubject(e.target.value)} id="subject" type="text" className="w-12rem" />) :
                                (<InputText value={subject} onChange={(e) => setSubject(e.target.value)} id="subject" type="text" className="w-12rem" />)}
                        </div>
                        <Button style={{
                            backgroundColor: isHovered ? 'rgb(168, 98, 148)' : 'rgb(130, 43, 105)',
                            borderColor: 'rgb(130, 43, 105)',
                            boxShadowColor: 'rgb(104, 54, 90)',
                            transition: 'background-color 0.3s ease'

                        }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"
                            onClick={() => handelLogIn()}
                        ></Button>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                <img alt="logo" src="/logimage.png" style={{ marginTop: "15%", width: "100%", height: "100%" }} />
            </div>
        </div>
    )
}

