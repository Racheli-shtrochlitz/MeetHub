import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import api from '../Services/api';

const customStyles = `
    body {
        background: linear-gradient(135deg, #e4e4e6 0%, #f0f0f2 100%);
    }
    .custom-main {
        background: linear-gradient(135deg, #e4e4e6 0%, #f0f0f2 100%);
        min-height: 100vh;
        padding: 2rem 1rem;
    }
    .custom-title {
        color: #001128;
        background: linear-gradient(135deg, #001128 0%, #822b69 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 2px 4px rgba(0,0,0,0.08);
        letter-spacing: 1px;
    }
    .custom-form-container {
        background: #fff;
        border: 2px solid #e4e4e6;
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0,1,40,0.08);
        position: relative;
        overflow: hidden;
        padding: 2.5rem 2rem;
        /* שינוי רוחב וגובה כדי להתקרב לריבוע */
        width: 370px;
        min-height: 370px;
        max-width: 95vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .custom-form-container::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 4px;
        background: linear-gradient(90deg, #f0af3a 0%, #822b69 50%, #001128 100%);
    }
    .custom-label {
        color: #001128;
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        display: block;
        letter-spacing: 0.5px;
    }
    .custom-input {
        border: 2px solid #e4e4e6;
        border-radius: 12px;
        padding: 0.875rem 1rem;
        font-size: 1rem;
        transition: all 0.3s;
        background: #fff;
        color: #001128;
    }
    .custom-input:focus {
        border-color: #f0af3a;
        box-shadow: 0 0 0 3px rgba(240,175,58,0.13);
        outline: none;
    }
    .custom-input.error {
        border-color: #e74c3c;
    }
    .custom-input.error:focus {
        border-color: #e74c3c;
        box-shadow: 0 0 0 3px rgba(231,76,60,0.13);
    }
    .custom-error {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 0.25rem;
        font-weight: 500;
    }
    .custom-btn-submit {
        background: linear-gradient(135deg, #001128 0%, #822b69 100%);
        border: none;
        color: #fff;
        font-weight: 700;
        padding: 1rem 2rem;
        border-radius: 14px;
        font-size: 1.1rem;
        transition: all 0.3s;
        box-shadow: 0 6px 20px rgba(0,1,40,0.13);
        width: 100%;
        letter-spacing: 1px;
    }
    .custom-btn-submit:hover {
        background: linear-gradient(135deg, #822b69 0%, #001128 100%);
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 10px 30px rgba(0,1,40,0.18);
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