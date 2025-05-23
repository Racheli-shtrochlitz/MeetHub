import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import api from '../Services/api';
import useUser from '../Hooks/useUser';

export default function Settings() {
    const user = useUser();
    const toast = useRef(null);

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
                summary: 'Update Successfully',
                detail: 'Your details updated',
                life: 3000,
            });
        } catch (err) {
            console.error(err);
            toast.current.show({
                severity: 'error',
                summary: 'Update Failed',
                detail: err.message,
                life: 3000,
            });
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Update Your Info</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="block mb-1">Name</label>
                    <InputText
                        {...register('name', { required: 'Name is required' })}
                        className="w-full"
                    />
                    {errors.name && (
                        <small className="text-red-500">{errors.name.message}</small>
                    )}
                </div>

                <div className="mb-3">
                    <label className="block mb-1">Email</label>
                    <InputText
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email format',
                            },
                        })}
                        className="w-full"
                    />
                    {errors.email && (
                        <small className="text-red-500">{errors.email.message}</small>
                    )}
                </div>

                <div className="mb-3">
                    <label className="block mb-1">Password</label>
                    <InputText
                        type="password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })}
                        className="w-full"
                    />
                    {errors.password && (
                        <small className="text-red-500">{errors.password.message}</small>
                    )}
                </div>

                <Button type="submit" label="Save" icon="pi pi-check" />

                <Toast ref={toast} />
            </form>
        </div>
    );
}
