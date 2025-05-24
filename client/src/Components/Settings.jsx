import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';
import useUser from '../Hooks/useUser';
import { useDispatch } from 'react-redux';
import { setActiveRole } from '../Store/UserSlice';

export default function Settings() {
    const toast = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);

    const activeRole = user?.activeRole || (user?.roles?.length === 1 ? user.roles[0] : 'student');
    const userName = user?.name || 'User';

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const getUser = async () => {
        try {
            const response = await api.get('user/getUserByToken');
            setUser(response.data);
        } catch (err) {
            alert(`getUser failed: ${err.message}`);
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
            toast.current.show({
                severity: 'success',
                summary: 'Update Successful',
                detail: 'Your details have been updated',
                life: 3000,
            });
        } catch (err) {
            toast.current.show({
                severity: 'error',
                summary: 'Update Failed',
                detail: err.message,
                life: 3000,
            });
        }
    };

    const switchRole = async (role) => {
        try {
            const response = await api.post('user/changeActiveRole', { activeRole: role });
            const data = response.data;
            localStorage.setItem('token', data.token);
            dispatch(setActiveRole(role));
            getUser();
        } catch (err) {
            toast.current.show({
                severity: 'error',
                summary: 'Role switch failed',
                detail: err.message,
                life: 3000,
            });
        }
    };

    return (
        <main className="p-6 max-w-5xl mx-auto flex flex-col gap-10">
            {/* סקשן הכרטיסים — רוחב מלא, פריסה לרוחב */}
            <section>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome back, {userName}!</h1>
                <p className="text-gray-600 text-lg mb-8">Here’s what you can do today</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">                    {/* הכרטיסים כאן */}
                    {activeRole === 'student' && user?.roles?.length <= 1 && (
                        <Card title="Want to become a teacher?" className="shadow-lg border border-gray-200">
                            <p className="mb-4 text-gray-700">You can apply to become a teacher and start managing your own lessons.</p>
                            <Button label="Apply as Teacher" icon="pi pi-user-plus" onClick={() => navigate('/applyTeacher')} />
                        </Card>
                    )}

                    {activeRole === 'teacher' && user?.roles?.length <= 1 && (
                        <Card title="Want to join as a student?" className="shadow-lg border border-gray-200">
                            <p className="mb-4 text-gray-700">Add your student profile and learn from other teachers.</p>
                            <Button label="Add Student Profile" icon="pi pi-user-edit" className="p-button-success" onClick={() => navigate('/addStudentProfile')} />
                        </Card>
                    )}

                    {user?.roles?.length > 1 && (
                        <Card title="Switch Role" className="shadow-lg border border-gray-200">
                            <p className="mb-4 text-gray-700">Use the system as a different role if you have one.</p>
                            <Button
                                label={`Switch to ${activeRole === 'teacher' ? 'Student' : 'Teacher'}`}
                                icon="pi pi-refresh"
                                className="p-button-warning"
                                onClick={() => {
                                    const newRole = activeRole === 'teacher' ? 'student' : 'teacher';
                                    switchRole(newRole);
                                    navigate('/profile');
                                }}
                            />
                        </Card>
                    )}
                </div>
            </section>

            {/* סקשן הטופס — רוחב מצומצם ומרכז */}
            <section className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto w-full flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
                    <div>
                        <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                            Name
                        </label>
                        <InputText
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.name
                                ? 'border-red-500 focus:ring-red-400'
                                : 'border-gray-300 focus:ring-blue-400'
                                }`}
                            aria-invalid={errors.name ? 'true' : 'false'}
                        />
                        {errors.name && (
                            <small role="alert" className="text-red-600 mt-1 block">
                                {errors.name.message}
                            </small>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
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
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.email
                                ? 'border-red-500 focus:ring-red-400'
                                : 'border-gray-300 focus:ring-blue-400'
                                }`}
                            aria-invalid={errors.email ? 'true' : 'false'}
                        />
                        {errors.email && (
                            <small role="alert" className="text-red-600 mt-1 block">
                                {errors.email.message}
                            </small>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
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
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.password
                                ? 'border-red-500 focus:ring-red-400'
                                : 'border-gray-300 focus:ring-blue-400'
                                }`}
                            aria-invalid={errors.password ? 'true' : 'false'}
                        />
                        {errors.password && (
                            <small role="alert" className="text-red-600 mt-1 block">
                                {errors.password.message}
                            </small>
                        )}
                    </div>

                    <Button
                        type="submit"
                        label="Save"
                        icon="pi pi-check"
                        className="w-full p-3 text-lg font-semibold"
                    />
                </form>
                <Toast ref={toast} />
            </section>
        </main>

    );
}
