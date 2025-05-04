import { useState, React, Suspense } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../Store/UserSlice';

export default function Signup() {

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            role: '',
            firstName: '',
            email: '',
            password: '',
            subject: ''
        },
        mode: 'onChange'
    });


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isHovered, setIsHovered] = useState(false);

    const items = ['student', 'teacher'];
    const selectedRole = watch("role") || "";


    function connectToServer(formData) {
        fetch('http://localhost:3000/user/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.firstName,
                email: formData.email,
                password: formData.password,
                activeRole: formData.role,
                subject: formData.subject
            }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                // if (!data.ok) {
                //     throw new Error(data.error || 'Unknown error occurred');
                // }
                console.log(data);
                if (data.token) {
                    console.log("token: " + data.token);
                    localStorage.setItem('token', data.token);
                    alert(`hi ${data.newUser.name}!\n thanks for joining us.`);
                    dispatch(setUserDetails({
                        email: formData.email,
                        password: formData.password,
                        activeRole: formData.role
                    }));
                    navigate('/home');
                } else {
                    alert("error: " + data.message);
                    console.log(data.message);
                }
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            })
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height: "80vh", width: "100vw" }}>
            <div className="card" >
                <form onSubmit={handleSubmit(connectToServer)}>
                    <div className="flex flex-column md:flex-row">
                        <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">

                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">Role</label>
                                <Controller
                                    name="role"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Dropdown {...field} options={items} className="w-12rem" />
                                    )}
                                />
                                {errors.role && <p style={{ color: 'red', fontSize: '12px' }}>This field is required</p>}
                            </div>

                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">User Name</label>
                                <InputText
                                    {...register("firstName", {
                                        required: true,
                                        maxLength: 20,
                                        pattern: /^[A-Za-z]+$/i
                                    })}
                                    className="w-12rem"
                                />
                                {errors?.firstName?.type === "required" && <p style={{ color: 'red', fontSize: '12px' }}>This field is required</p>}
                                {errors?.firstName?.type === "maxLength" && <p style={{ color: 'red', fontSize: '12px' }}>First name cannot exceed 20 characters</p>}
                                {errors?.firstName?.type === "pattern" && <p style={{ color: 'red', fontSize: '12px' }}>Alphabetical characters only</p>}
                            </div>

                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">Email</label>
                                <InputText
                                    {...register("email", {
                                        required: true,
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                    })}
                                    className="w-12rem"
                                />
                                {errors?.email?.type === "required" && <p style={{ color: 'red', fontSize: '12px' }}>This field is required</p>}
                                {errors?.email?.type === "pattern" && <p style={{ color: 'red', fontSize: '12px' }}>Invalid email</p>}
                            </div>

                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">Password</label>
                                <InputText
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                            message: "Password must be at least 6 characters, include letters and numbers"
                                        }
                                    })}
                                    className="w-12rem"
                                />
                                {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</p>}
                            </div>

                            {/* if teacher */}
                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">Subject</label>
                                <InputText
                                    disabled={selectedRole === "student"}
                                    placeholder={selectedRole === "student" ? "only for teacher profile" : ""}
                                    className="w-12rem"
                                    {...register("subject", {
                                        required: selectedRole === "teacher" ? "Subject is required for teachers" : false
                                    })}
                                />
                                {errors.subject && <p style={{ color: 'red', fontSize: '12px' }}>{errors.subject.message}</p>}
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
                                    type='submit'
                                ></Button>
                            </div>
                        </div>
                    </form>
                </div>
                {window.innerWidth > 768 && ( // או כל רוחב שאתה מגדיר לפלאפונים
                    <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                        <img alt="logo" src="/logimage.png" style={{ marginTop: "15%", width: "100%", height: "100%" }} />
                    </div>)}
            </div>
        </Suspense>
    )
}