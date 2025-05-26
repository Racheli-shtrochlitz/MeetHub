import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import { Badge } from 'primereact/badge';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom'; // Removed for demo
import { useDispatch } from 'react-redux';
import { setActiveRole } from '../Store/UserSlice';


const colors = {
    gray: 'rgb(228, 228, 230)',
    mustard: 'rgb(240, 175, 58)',
    purple: 'rgb(130, 43, 105)',
    blue: 'rgb(0, 1, 40)'
};

export default function Settings() {
    const toast = useRef(null);
    const navigate = useNavigate(); 
    const dispatch=useDispatch();
    const [user, setUser] = useState(null);
    const [activeRole,setactiveRole]=useState('');
    const [userName,setUserName]=useState('');


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
            const userData = response.data.data;
            setUser(userData);
            setUserName(userData.name);
            setactiveRole(userData.activeRole);
            setValue('name', userData.name || '');
            setValue('email', userData.email || '');
        } catch (err) {
            showToast('error', 'Failed to Load User', err.message);
        }
    };
    

    useEffect(() => {
        getUser();
    }, []);


    const onSubmit = async (data) => {
        try {
            await api.put('/user/updateUser', data);
            console.log("Updating user:", data);
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
            localStorage.setItem('token', response.data.token);
            dispatch(setActiveRole(role));
            showToast('success', 'Role Switched', `You are now using the system as a ${role}.`);
            await getUser();  // יעדכן את תצוגת התפקיד
            navigate('/profile');
        } catch (err) {
            showToast('error', 'Role Switch Failed', err.message);
        }
    };

    const showToast = (severity, summary, detail) => {
        toast.current?.clear();
        toast.current?.show({
            severity,
            summary,
            detail,
            life: 3000,
        });
    };

    const addProfile = async (newRole) => {
        try {
            const response = await api.post('user/addProfile', { newRole });
            if (response.status === 200) {
                showToast('success', 'Profile Added', `You've added the ${newRole} profile.`);
                await getUser();  // לרענון תפקידים חדשים
            } else {
                showToast('warn', 'Profile Not Added', `Server responded with status ${response.status}.`);
            }
        } catch (err) {
            showToast('error', 'Profile Addition Failed', err.message);
        }
    }; 

    const customButtonStyle = {
        backgroundColor: colors.mustard,
        borderColor: colors.mustard,
        color: colors.blue,
        fontWeight: '600',
        borderRadius: '12px',
        padding: '0.75rem 1.5rem',
        transition: 'all 0.3s ease'
    };

    const secondaryButtonStyle = {
        backgroundColor: colors.purple,
        borderColor: colors.purple,
        color: 'white',
        fontWeight: '600',
        borderRadius: '12px',
        padding: '0.75rem 1.5rem',
        transition: 'all 0.3s ease'
    };

    const cardStyle = {
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        border: `2px solid ${colors.gray}`,
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: `linear-gradient(135deg, ${colors.gray} 0%, #ffffff 50%, ${colors.gray} 100%)`,
            padding: '2rem 0'
        }}>
            <main className="max-w-6xl mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div style={{ 
                            background: `linear-gradient(135deg, ${colors.mustard} 0%, ${colors.purple} 100%)`,
                            borderRadius: '50%',
                            padding: '4px'
                        }}>
                            <Avatar 
                                label={userName?.charAt(0).toUpperCase()} 
                                size="xlarge" 
                                style={{ 
                                    backgroundColor: 'white',
                                    color: colors.blue,
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    width: '120px',
                                    height: '120px'
                                }}
                            />
                        </div>
                    </div>
                    <h1 style={{ 
                        fontSize: '3rem', 
                        fontWeight: '800', 
                        color: colors.blue,
                        marginBottom: '0.5rem',
                        background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.purple} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Welcome back, {userName}!
                    </h1>
                    <div className="flex justify-center items-center gap-3 mb-4">
                        <Badge 
                            value={`Current: ${activeRole}`} 
                            style={{ 
                                backgroundColor: colors.mustard, 
                                color: colors.blue,
                                fontSize: '1rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                fontWeight: '600'
                            }}
                        />
                        {user?.roles?.length > 1 && (
                            <Badge 
                                value={`${user.roles.length} Profiles`} 
                                style={{ 
                                    backgroundColor: colors.purple, 
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '20px'
                                }}
                            />
                        )}
                    </div>
                    <p style={{ 
                        color: colors.blue, 
                        fontSize: '1.2rem',
                        opacity: '0.8',
                        fontWeight: '500'
                    }}>
                        Manage your account settings and preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Role Management Section */}
                    <div>
                        <h2 style={{ 
                            fontSize: '1.8rem', 
                            fontWeight: '700', 
                            color: colors.blue,
                            marginBottom: '1.5rem',
                            textAlign: 'center'
                        }}>
                            Profile Management
                        </h2>
                        
                        <div className="flex flex-col gap-6">
                            {activeRole === 'student' && user?.roles?.length <= 1 && (
                                <Card 
                                    style={cardStyle}
                                    className="hover:transform hover:scale-105"
                                >
                                    <div className="text-center p-6">
                                        <div style={{ 
                                            fontSize: '3rem', 
                                            marginBottom: '1rem',
                                            background: `linear-gradient(135deg, ${colors.mustard} 0%, ${colors.purple} 100%)`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}>
                                            🎓
                                        </div>
                                        <h3 style={{ 
                                            fontSize: '1.5rem', 
                                            fontWeight: '700', 
                                            color: colors.blue,
                                            marginBottom: '1rem'
                                        }}>
                                            Become a Teacher
                                        </h3>
                                        <p style={{ 
                                            color: colors.blue, 
                                            opacity: '0.8',
                                            marginBottom: '1.5rem',
                                            lineHeight: '1.6'
                                        }}>
                                            Share your knowledge and start teaching students around the world
                                        </p>
                                        <Button 
                                            label="Apply as Teacher" 
                                            icon="pi pi-user-plus" 
                                            style={customButtonStyle}
                                            className="hover:shadow-lg"
                                            onClick={() => addProfile("teacher")} 
                                        />
                                    </div>
                                </Card>
                            )}

                            {activeRole === 'teacher' && user?.roles?.length <= 1 && (
                                <Card 
                                    style={cardStyle}
                                    className="hover:transform hover:scale-105"
                                >
                                    <div className="text-center p-6">
                                        <div style={{ 
                                            fontSize: '3rem', 
                                            marginBottom: '1rem',
                                            background: `linear-gradient(135deg, ${colors.mustard} 0%, ${colors.purple} 100%)`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}>
                                            📚
                                        </div>
                                        <h3 style={{ 
                                            fontSize: '1.5rem', 
                                            fontWeight: '700', 
                                            color: colors.blue,
                                            marginBottom: '1rem'
                                        }}>
                                            Join as Student
                                        </h3>
                                        <p style={{ 
                                            color: colors.blue, 
                                            opacity: '0.8',
                                            marginBottom: '1.5rem',
                                            lineHeight: '1.6'
                                        }}>
                                            Continue learning from other amazing teachers on the platform
                                        </p>
                                        <Button 
                                            label="Add Student Profile" 
                                            icon="pi pi-user-edit" 
                                            style={customButtonStyle}
                                            className="hover:shadow-lg"
                                            onClick={() => addProfile("student")} 
                                        />
                                    </div>
                                </Card>
                            )}

                            {user?.roles?.length > 1 && (
                                <Card 
                                    style={cardStyle}
                                    className="hover:transform hover:scale-105"
                                >
                                    <div className="text-center p-6">
                                        <div style={{ 
                                            fontSize: '3rem', 
                                            marginBottom: '1rem',
                                            background: `linear-gradient(135deg, ${colors.mustard} 0%, ${colors.purple} 100%)`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}>
                                            🔄
                                        </div>
                                        <h3 style={{ 
                                            fontSize: '1.5rem', 
                                            fontWeight: '700', 
                                            color: colors.blue,
                                            marginBottom: '1rem'
                                        }}>
                                            Switch Profile
                                        </h3>
                                        <p style={{ 
                                            color: colors.blue, 
                                            opacity: '0.8',
                                            marginBottom: '1.5rem',
                                            lineHeight: '1.6'
                                        }}>
                                            Switch between your teacher and student profiles
                                        </p>
                                        <Button
                                            label={`Switch to ${activeRole === 'teacher' ? 'Student' : 'Teacher'}`}
                                            icon="pi pi-refresh"
                                            style={secondaryButtonStyle}
                                            className="hover:shadow-lg"
                                            onClick={() => {
                                                const newRole = activeRole === 'teacher' ? 'student' : 'teacher';
                                                switchRole(newRole);
                                            }}
                                        />
                                    </div>
                                </Card>
                            )}
                        </div>
                    </div>

                    {/* Account Settings Form */}
                    <div>
                        <h2 style={{ 
                            fontSize: '1.8rem', 
                            fontWeight: '700', 
                            color: colors.blue,
                            marginBottom: '1.5rem',
                            textAlign: 'center'
                        }}>
                            Account Settings
                        </h2>

                        <Card style={cardStyle}>
                            <div className="p-6">
                                <div onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                                    <div>
                                        <label 
                                            htmlFor="name" 
                                            style={{ 
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontWeight: '600',
                                                color: colors.blue,
                                                fontSize: '1.1rem'
                                            }}
                                        >
                                            Full Name
                                        </label>
                                        <InputText
                                            id="name"
                                            {...register('name', { required: 'Name is required' })}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                borderRadius: '12px',
                                                border: errors.name ? `2px solid #ef4444` : `2px solid ${colors.gray}`,
                                                fontSize: '1rem',
                                                transition: 'border-color 0.3s ease',
                                                backgroundColor: '#fafafa'
                                            }}
                                            className="focus:outline-none focus:border-purple-500"
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name && (
                                            <small style={{ color: '#ef4444', display: 'block', marginTop: '0.5rem', fontWeight: '500' }}>
                                                {errors.name.message}
                                            </small>
                                        )}
                                    </div>

                                    <div>
                                        <label 
                                            htmlFor="email" 
                                            style={{ 
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontWeight: '600',
                                                color: colors.blue,
                                                fontSize: '1.1rem'
                                            }}
                                        >
                                            Email Address
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
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                borderRadius: '12px',
                                                border: errors.email ? `2px solid #ef4444` : `2px solid ${colors.gray}`,
                                                fontSize: '1rem',
                                                transition: 'border-color 0.3s ease',
                                                backgroundColor: '#fafafa'
                                            }}
                                            className="focus:outline-none focus:border-purple-500"
                                            placeholder="Enter your email address"
                                        />
                                        {errors.email && (
                                            <small style={{ color: '#ef4444', display: 'block', marginTop: '0.5rem', fontWeight: '500' }}>
                                                {errors.email.message}
                                            </small>
                                        )}
                                    </div>

                                    <div>
                                        <label 
                                            htmlFor="password" 
                                            style={{ 
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontWeight: '600',
                                                color: colors.blue,
                                                fontSize: '1.1rem'
                                            }}
                                        >
                                            New Password
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
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                borderRadius: '12px',
                                                border: errors.password ? `2px solid #ef4444` : `2px solid ${colors.gray}`,
                                                fontSize: '1rem',
                                                transition: 'border-color 0.3s ease',
                                                backgroundColor: '#fafafa'
                                            }}
                                            className="focus:outline-none focus:border-purple-500"
                                            placeholder="Enter new password"
                                        />
                                        {errors.password && (
                                            <small style={{ color: '#ef4444', display: 'block', marginTop: '0.5rem', fontWeight: '500' }}>
                                                {errors.password.message}
                                            </small>
                                        )}
                                    </div>

                                    <Divider style={{ margin: '1rem 0', borderColor: colors.gray }} />

                                    <Button
                                        type="submit"
                                        label="Save Changes"
                                        icon="pi pi-check"
                                        style={{
                                            ...customButtonStyle,
                                            width: '100%',
                                            padding: '1rem',
                                            fontSize: '1.1rem',
                                            fontWeight: '700'
                                        }}
                                        className="hover:shadow-lg"
                                        onClick={handleSubmit(onSubmit)}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <Toast ref={toast} />
            </main>
        </div>
    );
}