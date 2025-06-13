import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../Store/UserSlice';
import { Dialog } from 'primereact/dialog';
import api from '../Services/api';


export default function Signup() {

    const {control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { role: '', firstName: '', email: '', password: '' },
        mode: 'onChange'
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isHovered, setIsHovered] = useState(false);

    // עדכון: מערך תפקידים עם label ו-value
    const items = [
        { label: 'host', value: 'teacher' },
        { label: 'member', value: 'student' }
    ];

    async function connectToServer(formData) {
        try {
            const response = await api.post('user/signUp', {
                name: formData.firstName,
                email: formData.email,
                password: formData.password,
                activeRole: formData.role
            });
            const data = response.data;
            console.log(response);
            if (data.data) {
                localStorage.setItem('token', data.data);

                dispatch(setUserDetails({
                    email: formData.email,
                    name: formData.firstName,
                    activeRole: formData.role
                }));
                navigate('/home');

            } else {
                console.log(data.message);
            }
        }
        catch(error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    return (
        <>
            <Dialog header="Sign Up" visible={true} style={{ width: '50vw' }} onHide={() => { navigate('/login'); }}>
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
                                            <Dropdown
                                                {...field}
                                                options={items}
                                                optionLabel="label"
                                                optionValue="value"
                                                className="w-12rem"
                                                placeholder="Select role"
                                            />
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
            </Dialog>
        </>
    )
}
