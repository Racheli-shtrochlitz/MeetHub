import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import api from '../Services/api';

const customStyles = `

    .custom-main {
        background: linear-gradient(135deg, rgb(228, 228, 230) 0%, rgb(240, 240, 242) 100%);
        min-height: 100vh;
        padding: 2rem 1rem;
    }
    
    .custom-title {
        color: rgb(0, 1, 40);
        background: linear-gradient(135deg, rgb(0, 1, 40) 0%, rgb(130, 43, 105) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .custom-form-container {
        background: white;
        border: 2px solid rgb(228, 228, 230);
        border-radius: 20px;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
    }
    
    .custom-form-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, rgb(240, 175, 58) 0%, rgb(130, 43, 105) 50%, rgb(0, 1, 40) 100%);
    }
    
    .custom-input {
        border: 2px solid rgb(228, 228, 230);
        border-radius: 12px;
        padding: 0.875rem 1rem;
        font-size: 1rem;
        transition: all 0.3s ease;
        background: white;
    }
    
    .custom-input:focus {
        border-color: rgb(240, 175, 58);
        box-shadow: 0 0 0 3px rgba(240, 175, 58, 0.2);
        outline: none;
    }
    
    .custom-input.error {
        border-color: #e74c3c;
    }
    
    .custom-input.error:focus {
        border-color: #e74c3c;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2);
    }
    
    .custom-label {
        color: rgb(0, 1, 40);
        font-weight: 600;
        font-size: 0.95rem;
        margin-bottom: 0.5rem;
        display: block;
    }
    
    .custom-error {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 0.25rem;
        font-weight: 500;
    }
    
    .custom-btn-submit {
        background: linear-gradient(135deg, rgb(0, 1, 40) 0%, rgb(130, 43, 105) 100%);
        border: none;
        color: white;
        font-weight: 700;
        padding: 1rem 2rem;
        border-radius: 14px;
        font-size: 1.1rem;
        transition: all 0.3s ease;
        box-shadow: 0 6px 20px rgba(0, 1, 40, 0.3);
        width: 100%;
    }
    
    .custom-btn-submit:hover {
        background: linear-gradient(135deg, rgb(130, 43, 105) 0%, rgb(0, 1, 40) 100%);
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(0, 1, 40, 0.4);
    }
`;

export default function Settings() {
    const toast = useRef(null);
    const [user, setUser] = useState(null);

    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm({ defaultValues: { name: '', email: '', password: '', }, });

    const getUser = async () => {
        try {
            const response = await api.get('user/getUserByToken');
            setUser(response.data.data);
        } catch (err) {
            console.error('Error fetching user:', err);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (!user) return;
        setValue('name', user.name || '');
        setValue('email', user.email || '');
    }, [user, setValue]);

    const onSubmit = async (data) => {
        try {
            await api.put('/user/updateUser', data);
        } catch (err) {
            console.error('Error updating user:', err);
        }
    };
    return (
        <>
            <style>{customStyles}</style>
                <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen py-10">

                    {/* סקשן הטופס — רוחב מצומצם ומרכז */}
                    <section className="custom-form-container p-10 max-w-lg mx-auto w-full">
                        <h2 className="text-2xl font-bold text-center mb-6 custom-title">Update Profile</h2>
                        <form style={{ display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">
                            <div>
                                <label htmlFor="name" className="custom-label">
                                    Name
                                </label>
                                <InputText
                                    id="name"
                                    {...register('name', { required: 'Name is required' })}
                                    className={`custom-input w-full ${errors.name ? 'error' : ''}`}
                                    aria-invalid={errors.name ? 'true' : 'false'}
                                />
                                {errors.name && (
                                    <small role="alert" className="custom-error">
                                        {errors.name.message}
                                    </small>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="custom-label">
                                    Email
                                </label>
                                <InputText
                                    id="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Invalid email format',
                                        },
                                    })}
                                    className={`custom-input w-full ${errors.email ? 'error' : ''}`}
                                    aria-invalid={errors.email ? 'true' : 'false'}
                                />
                                {errors.email && (
                                    <small role="alert" className="custom-error">
                                        {errors.email.message}
                                    </small>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="custom-label">
                                    Password
                                </label>
                                <InputText
                                    id="password"
                                    type="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters',
                                        },
                                    })}
                                    className={`custom-input w-full ${errors.password ? 'error' : ''}`}
                                    aria-invalid={errors.password ? 'true' : 'false'}
                                />
                                {errors.password && (
                                    <small role="alert" className="custom-error">
                                        {errors.password.message}
                                    </small>
                                )}
                            </div>

                            <Button
                                type="submit"
                                label="Save Changes"
                                icon="pi pi-check"
                                className="custom-btn-submit mt-4"
                            />
                        </form>
                        <Toast ref={toast} />
                    </section>
                </div>
        </>
    );
}