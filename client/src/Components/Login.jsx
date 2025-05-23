import React, { useState } from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../Store/UserSlice';
import { useForm, Controller } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import api from '../Services/api';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export default function LoginDemo() {

    const toast = useRef(null);
    const [isLIHovered, setIsLIHovered] = useState(false);
    const [isSIHovered, setIsSIHovered] = useState(false);
    const items = ['student', 'teacher'];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { role: '', email: '', password: '' },
    });



    async function connectToServer(formData) {
        try {
            const response = await api.post('user/signIn', {
                email: formData.email,
                password: formData.password,
                activeRole: formData.role
            });
            const data = response.data;
            localStorage.setItem('token', data.token);
            localStorage.setItem('activeRole', formData.role)
            dispatch(setUserDetails({
                email: formData.email,
                password: formData.password,
                activeRole: formData.role
            }));
            toast.current.show({
                severity: 'success',
                summary: 'Login success',
                detail: 'Welcome back!',
                life: 2000
            });

            navigate('/home');

        } catch (error) {
            console.error('Login failed:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Login Failed',
                detail: 'Invalid credentials',
                life: 3000
            });
        }
    }

    return (
        <div className="card flex justify-content-center">
            <Dialog header="log in" visible={true} style={{ width: '50vw' }} onHide={() => { navigate('/home'); }}>
                <div className="card">
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
                                                value: /^.{6,}$/,
                                                message: "Password must be at least 6 characters, include letters and numbers"
                                            }
                                        })}
                                        className="w-12rem"
                                    />
                                    {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</p>}
                                </div>

                                <Button style={{
                                    backgroundColor: isLIHovered ? 'rgb(239, 193, 107)' : 'rgb(240,175,58)',
                                    borderColor: 'rgb(240,175,58)',
                                    boxShadowColor: 'rgb(240, 183, 76)',
                                    transition: 'background-color 0.3s ease'

                                }}
                                    onMouseEnter={() => setIsLIHovered(true)}
                                    onMouseLeave={() => setIsLIHovered(false)}
                                    label="Login" icon="pi pi-user" severity="success" className="w-10rem mx-auto"
                                    type='submit'
                                ></Button>
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
                                    backgroundColor: isSIHovered ? 'rgb(168, 98, 148)' : 'rgb(130, 43, 105)',
                                    borderColor: 'rgb(130, 43, 105)',
                                    boxShadowColor: 'rgb(104, 54, 90)',
                                    transition: 'background-color 0.3s ease'

                                }}
                                    onMouseEnter={() => setIsSIHovered(true)}
                                    onMouseLeave={() => setIsSIHovered(false)}
                                    label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"
                                    onClick={() => { navigate('/signup'); }}
                                ></Button>
                            </div>

                        </div>

                    </form>
                </div>
            </Dialog>
            <Toast ref={toast} />
        </div>
    )
}
