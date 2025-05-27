// // import  { useEffect, useRef, useState } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { InputText } from 'primereact/inputtext';
// // import { Button } from 'primereact/button';
// // import { Toast } from 'primereact/toast';
// // import { Card } from 'primereact/card';
// // import { useNavigate } from 'react-router-dom';
// // import api from '../Services/api';
// // import { useDispatch } from 'react-redux';
// // import { setActiveRole } from '../Store/UserSlice';

// // export default function Settings() {
// //     const toast = useRef(null);
// //     const navigate = useNavigate();
// //     const dispatch = useDispatch();
// //     const [user, setUser] = useState(null);

// //     const activeRole = user?.activeRole || (user?.roles?.length === 1 ? user.roles[0] : 'student');
// //     const userName = user?.name || 'User';

// //     const {register, handleSubmit, setValue, formState: { errors }} = 
// //     useForm({ defaultValues: {name: '', email: '', password: '',},});

// //     const getUser = async () => {
// //         try {
// //             const response = await api.get('user/getUserByToken');
// //             setUser(response.data.data);
// //         } catch (err) {
// //             console.error('Error fetching user:', err);}
// //     };

// //     useEffect(() => {
// //         getUser();
// //     }, []);

// //     useEffect(() => {
// //         if (!user) return;
// //         setValue('name', user.name || '');
// //         setValue('email', user.email || '');
// //     }, [user, setValue]);

// //     const onSubmit = async (data) => {
// //         try {
// //             await api.put('/user/updateUser', data);
// //         } catch (err) {
// //             console.error('Error updating user:', err);
// //         }
// //     };

// //     const switchRole = async (role) => {
// //         try {
// //             const response = await api.post('user/changeActiveRole', { activeRole: role });
// //             localStorage.setItem('token', response.data.data);
// //             dispatch(setActiveRole(role));
// //             await getUser();  // יעדכן את תצוגת התפקיד
// //             navigate('/home');
// //         } catch (err) {
// //             console.error('Error switching role:', err);}
// //     };

// //     const addProfile = async (newRole) => {
// //         try {
// //             const response = await api.post('user/addProfile', { newRole });
// //             if (response.status === 200) {
// //                 await getUser();  // לרענון תפקידים חדשים
// //             } else {
// //                 // showToast('warn', 'Profile Not Added', `Server responded with status ${response.status}.`);
// //             }
// //         } catch (err) {
// //             console.error('Error adding profile:', err);}
// //     };

// //     return (
// //         <main className="p-6 max-w-3xl mx-auto flex flex-col gap-10">
// //             {/* סקשן הכרטיסים — רוחב מלא, פריסה לרוחב */}
// //             <section>
// //                 <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome back, {userName}!</h1>
// //                 <p className="text-gray-600 text-lg mb-8">Here’s what you can do today</p>

// //                 <div className="flex flex-col gap-8 items-stretch">
// //                     {activeRole === 'student' && user?.roles?.length <= 1 && (
// //                         <Card title="Want to become a teacher?" className="shadow-lg border border-gray-200">
// //                             <p className="mb-4 text-gray-700">You can apply to become a teacher and start managing your own lessons.</p>
// //                             <Button label="Apply as Teacher" icon="pi pi-user-plus" onClick={() => addProfile("teacher")} />
// //                         </Card>
// //                     )}

// //                     {activeRole === 'teacher' && user?.roles?.length <= 1 && (
// //                         <Card title="Want to join as a student?" className="shadow-lg border border-gray-200">
// //                             <p className="mb-4 text-gray-700">Add your student profile and learn from other teachers.</p>
// //                             <Button label="Add Student Profile" icon="pi pi-user-edit" className="p-button-success" onClick={() => addProfile("student")} />
// //                         </Card>
// //                     )}

// //                     {user?.roles?.length > 1 && (
// //                         <Card title="Switch Role" className="shadow-lg border border-gray-200">
// //                             <p className="mb-4 text-gray-700">Use the system as a different role if you have one.</p>
// //                             <Button
// //                                 label={`Switch to ${activeRole === 'teacher' ? 'Student' : 'Teacher'}`}
// //                                 icon="pi pi-refresh"
// //                                 className="p-button-warning"
// //                                 onClick={() => {
// //                                     const newRole = activeRole === 'teacher' ? 'student' : 'teacher';
// //                                     switchRole(newRole);
// //                                     navigate('/profile');
// //                                 }}
// //                             />
// //                         </Card>
// //                     )}
// //                 </div>
// //             </section>

// //             {/* סקשן הטופס — רוחב מצומצם ומרכז */}
// //             <section className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto w-full flex flex-col">
// //                 <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
// //                     <div>
// //                         <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
// //                             Name
// //                         </label>
// //                         <InputText
// //                             id="name"
// //                             {...register('name', { required: 'Name is required' })}
// //                             className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.name
// //                                 ? 'border-red-500 focus:ring-red-400'
// //                                 : 'border-gray-300 focus:ring-blue-400'
// //                                 }`}
// //                             aria-invalid={errors.name ? 'true' : 'false'}
// //                         />
// //                         {errors.name && (
// //                             <small role="alert" className="text-red-600 mt-1 block">
// //                                 {errors.name.message}
// //                             </small>
// //                         )}
// //                     </div>

// //                     <div>
// //                         <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
// //                             Email
// //                         </label>
// //                         <InputText
// //                             id="email"
// //                             {...register('email', {
// //                                 required: 'Email is required',
// //                                 pattern: {
// //                                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
// //                                     message: 'Invalid email format',
// //                                 },
// //                             })}
// //                             className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.email
// //                                 ? 'border-red-500 focus:ring-red-400'
// //                                 : 'border-gray-300 focus:ring-blue-400'
// //                                 }`}
// //                             aria-invalid={errors.email ? 'true' : 'false'}
// //                         />
// //                         {errors.email && (
// //                             <small role="alert" className="text-red-600 mt-1 block">
// //                                 {errors.email.message}
// //                             </small>
// //                         )}
// //                     </div>

// //                     <div>
// //                         <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
// //                             Password
// //                         </label>
// //                         <InputText
// //                             id="password"
// //                             type="password"
// //                             {...register('password', {
// //                                 required: 'Password is required',
// //                                 minLength: {
// //                                     value: 6,
// //                                     message: 'Password must be at least 6 characters',
// //                                 },
// //                             })}
// //                             className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.password
// //                                 ? 'border-red-500 focus:ring-red-400'
// //                                 : 'border-gray-300 focus:ring-blue-400'
// //                                 }`}
// //                             aria-invalid={errors.password ? 'true' : 'false'}
// //                         />
// //                         {errors.password && (
// //                             <small role="alert" className="text-red-600 mt-1 block">
// //                                 {errors.password.message}
// //                             </small>
// //                         )}
// //                     </div>

// //                     <Button
// //                         type="submit"
// //                         label="Save"
// //                         icon="pi pi-check"
// //                         className="w-full p-3 text-lg font-semibold"
// //                     />
// //                 </form>
// //                 <Toast ref={toast} />
// //             </section>
// //         </main>

// //     );
// // }


// import  { useEffect, useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
// import { Card } from 'primereact/card';
// import { useNavigate } from 'react-router-dom';
// import api from '../Services/api';
// import { useDispatch } from 'react-redux';
// import { setActiveRole } from '../Store/UserSlice';

// const customStyles = `
//     .custom-main {
//         background: linear-gradient(135deg, rgb(228, 228, 230) 0%, rgb(240, 240, 242) 100%);
//         min-height: 100vh;
//         padding: 2rem 1rem;
//     }
    
//     .custom-title {
//         color: rgb(0, 1, 40);
//         background: linear-gradient(135deg, rgb(0, 1, 40) 0%, rgb(130, 43, 105) 100%);
//         -webkit-background-clip: text;
//         -webkit-text-fill-color: transparent;
//         background-clip: text;
//         text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }
    
//     .custom-subtitle {
//         color: rgb(130, 43, 105);
//         font-weight: 500;
//     }
    
//     .custom-card {
//         background: white;
//         border: 2px solid rgb(228, 228, 230);
//         border-radius: 16px;
//         box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
//         transition: all 0.3s ease;
//         position: relative;
//         overflow: hidden;
//     }
    
//     .custom-card::before {
//         content: '';
//         position: absolute;
//         top: 0;
//         left: 0;
//         right: 0;
//         height: 4px;
//         background: linear-gradient(90deg, rgb(240, 175, 58) 0%, rgb(130, 43, 105) 100%);
//     }
    
//     .custom-card:hover {
//         transform: translateY(-4px);
//         box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
//         border-color: rgb(240, 175, 58);
//     }
    
//     .custom-card .p-card-title {
//         color: rgb(0, 1, 40) !important;
//         font-weight: 700;
//         font-size: 1.25rem;
//         margin-bottom: 0.75rem;
//     }
    
//     .custom-card .p-card-content {
//         color: rgb(130, 43, 105);
//         padding-top: 0;
//     }
    
//     .custom-btn-primary {
//         background: linear-gradient(135deg, rgb(240, 175, 58) 0%, rgb(250, 185, 78) 100%);
//         border: none;
//         color: rgb(0, 1, 40);
//         font-weight: 600;
//         padding: 0.75rem 1.5rem;
//         border-radius: 12px;
//         transition: all 0.3s ease;
//         box-shadow: 0 4px 16px rgba(240, 175, 58, 0.3);
//     }
    
//     .custom-btn-primary:hover {
//         background: linear-gradient(135deg, rgb(250, 185, 78) 0%, rgb(240, 175, 58) 100%);
//         transform: translateY(-2px);
//         box-shadow: 0 8px 24px rgba(240, 175, 58, 0.4);
//     }
    
//     .custom-btn-success {
//         background: linear-gradient(135deg, rgb(130, 43, 105) 0%, rgb(150, 63, 125) 100%);
//         border: none;
//         color: white;
//         font-weight: 600;
//         padding: 0.75rem 1.5rem;
//         border-radius: 12px;
//         transition: all 0.3s ease;
//         box-shadow: 0 4px 16px rgba(130, 43, 105, 0.3);
//     }
    
//     .custom-btn-success:hover {
//         background: linear-gradient(135deg, rgb(150, 63, 125) 0%, rgb(130, 43, 105) 100%);
//         transform: translateY(-2px);
//         box-shadow: 0 8px 24px rgba(130, 43, 105, 0.4);
//     }
    
//     .custom-btn-warning {
//         background: linear-gradient(135deg, rgb(0, 1, 40) 0%, rgb(20, 21, 60) 100%);
//         border: none;
//         color: white;
//         font-weight: 600;
//         padding: 0.75rem 1.5rem;
//         border-radius: 12px;
//         transition: all 0.3s ease;
//         box-shadow: 0 4px 16px rgba(0, 1, 40, 0.3);
//     }
    
//     .custom-btn-warning:hover {
//         background: linear-gradient(135deg, rgb(20, 21, 60) 0%, rgb(0, 1, 40) 100%);
//         transform: translateY(-2px);
//         box-shadow: 0 8px 24px rgba(0, 1, 40, 0.4);
//     }
    
//     .custom-form-container {
//         background: white;
//         border: 2px solid rgb(228, 228, 230);
//         border-radius: 20px;
//         box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
//         position: relative;
//         overflow: hidden;
//     }
    
//     .custom-form-container::before {
//         content: '';
//         position: absolute;
//         top: 0;
//         left: 0;
//         right: 0;
//         height: 4px;
//         background: linear-gradient(90deg, rgb(240, 175, 58) 0%, rgb(130, 43, 105) 50%, rgb(0, 1, 40) 100%);
//     }
    
//     .custom-input {
//         border: 2px solid rgb(228, 228, 230);
//         border-radius: 12px;
//         padding: 0.875rem 1rem;
//         font-size: 1rem;
//         transition: all 0.3s ease;
//         background: white;
//     }
    
//     .custom-input:focus {
//         border-color: rgb(240, 175, 58);
//         box-shadow: 0 0 0 3px rgba(240, 175, 58, 0.2);
//         outline: none;
//     }
    
//     .custom-input.error {
//         border-color: #e74c3c;
//     }
    
//     .custom-input.error:focus {
//         border-color: #e74c3c;
//         box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2);
//     }
    
//     .custom-label {
//         color: rgb(0, 1, 40);
//         font-weight: 600;
//         font-size: 0.95rem;
//         margin-bottom: 0.5rem;
//         display: block;
//     }
    
//     .custom-error {
//         color: #e74c3c;
//         font-size: 0.85rem;
//         margin-top: 0.25rem;
//         font-weight: 500;
//     }
    
//     .custom-btn-submit {
//         background: linear-gradient(135deg, rgb(0, 1, 40) 0%, rgb(130, 43, 105) 100%);
//         border: none;
//         color: white;
//         font-weight: 700;
//         padding: 1rem 2rem;
//         border-radius: 14px;
//         font-size: 1.1rem;
//         transition: all 0.3s ease;
//         box-shadow: 0 6px 20px rgba(0, 1, 40, 0.3);
//         width: 100%;
//     }
    
//     .custom-btn-submit:hover {
//         background: linear-gradient(135deg, rgb(130, 43, 105) 0%, rgb(0, 1, 40) 100%);
//         transform: translateY(-3px);
//         box-shadow: 0 10px 30px rgba(0, 1, 40, 0.4);
//     }
// `;

export default function Settings() {
//     const toast = useRef(null);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [user, setUser] = useState(null);

//     const activeRole = user?.activeRole || (user?.roles?.length === 1 ? user.roles[0] : 'student');
//     const userName = user?.name || 'User';

//     const {register, handleSubmit, setValue, formState: { errors }} = 
//     useForm({ defaultValues: {name: '', email: '', password: '',},});

//     const getUser = async () => {
//         try {
//             const response = await api.get('user/getUserByToken');
//             setUser(response.data.data);
//         } catch (err) {
//             console.error('Error fetching user:', err);}
//     };

//     useEffect(() => {
//         getUser();
//     }, []);

//     useEffect(() => {
//         if (!user) return;
//         setValue('name', user.name || '');
//         setValue('email', user.email || '');
//     }, [user, setValue]);

//     const onSubmit = async (data) => {
//         try {
//             await api.put('/user/updateUser', data);
//         } catch (err) {
//             console.error('Error updating user:', err);
//         }
//     };

//     const switchRole = async (role) => {
//         try {
//             const response = await api.post('user/changeActiveRole', { activeRole: role });
//             localStorage.setItem('token', response.data.data);
//             dispatch(setActiveRole(role));
//             await getUser();  // יעדכן את תצוגת התפקיד
//             navigate('/home');
//         } catch (err) {
//             console.error('Error switching role:', err);}
//     };

//     const addProfile = async (newRole) => {
//         try {
//             const response = await api.post('user/addProfile', { newRole });
//             if (response.status === 200) {
//                 await getUser();  // לרענון תפקידים חדשים
//             } else {
//                 // showToast('warn', 'Profile Not Added', `Server responded with status ${response.status}.`);
//             }
//         } catch (err) {
//             console.error('Error adding profile:', err);}
//     };

    return (
        <></>
        // <>
/*             <style>{customStyles}</style>
//             <main className="custom-main">
//                 <div className="max-w-4xl mx-auto flex flex-col gap-12">
//                     /* סקשן הכרטיסים — רוחב מלא, פריסה לרוחב */
//                     <section>
//                         <h1 className="custom-title text-5xl font-extrabold mb-3">
//                             Welcome back, {userName}!
//                         </h1>
//                         <p className="custom-subtitle text-xl mb-10">
//                             Here's what you can do today
//                         </p>

//                         <div className="flex flex-col gap-8 items-stretch">
//                             {activeRole === 'student' && user?.roles?.length <= 1 && ( */}
//                                 <Card 
//                                     title="Want to become a teacher?" 
//                                     className="custom-card"
//                                 > */
//                                     <p className="mb-6 text-gray-700 text-lg leading-relaxed">
//                                         You can apply to become a teacher and start managing your own lessons.
//                                     </p>
//                                     <Button 
//                                         label="Apply as Teacher" 
//                                         icon="pi pi-user-plus" 
//                                         className="custom-btn-primary"
//                                         onClick={() => addProfile("teacher")} 
//                                     />
//                                 </Card>
//                             )}

//                             {activeRole === 'teacher' && user?.roles?.length <= 1 && (
//                                 <Card 
//                                     title="Want to join as a student?" 
//                                     className="custom-card"
//                                 >
//                                     <p className="mb-6 text-gray-700 text-lg leading-relaxed">
//                                         Add your student profile and learn from other teachers.
//                                     </p>
//                                     <Button 
//                                         label="Add Student Profile" 
//                                         icon="pi pi-user-edit" 
//                                         className="custom-btn-success"
//                                         onClick={() => addProfile("student")} 
//                                     />
//                                 </Card>
//                             )}

//                             {user?.roles?.length > 1 && (
//                                 <Card 
//                                     title="Switch Role" 
//                                     className="custom-card"
//                                 >
//                                     <p className="mb-6 text-gray-700 text-lg leading-relaxed">
//                                         Use the system as a different role if you have one.
//                                     </p>
//                                     <Button
//                                         label={`Switch to ${activeRole === 'teacher' ? 'Student' : 'Teacher'}`}
//                                         icon="pi pi-refresh"
//                                         className="custom-btn-warning"
//                                         onClick={() => {
//                                             const newRole = activeRole === 'teacher' ? 'student' : 'teacher';
//                                             switchRole(newRole);
//                                             navigate('/profile');
//                                         }}
//                                     />
//                                 </Card>
//                             )}
//                         </div>
//                     </section>

//                     {/* סקשן הטופס — רוחב מצומצם ומרכז */}
//                     <section className="custom-form-container p-10 max-w-lg mx-auto w-full">
//                         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">
//                             <div>
//                                 <label htmlFor="name" className="custom-label">
//                                     Name
//                                 </label>
//                                 <InputText
//                                     id="name"
//                                     {...register('name', { required: 'Name is required' })}
//                                     className={`custom-input w-full ${errors.name ? 'error' : ''}`}
//                                     aria-invalid={errors.name ? 'true' : 'false'}
//                                 />
//                                 {errors.name && (
//                                     <small role="alert" className="custom-error">
//                                         {errors.name.message}
//                                     </small>
//                                 )}
//                             </div>

//                             <div>
//                                 <label htmlFor="email" className="custom-label">
//                                     Email
//                                 </label>
//                                 <InputText
//                                     id="email"
//                                     {...register('email', {
//                                         required: 'Email is required',
//                                         pattern: {
//                                             value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                                             message: 'Invalid email format',
//                                         },
//                                     })}
//                                     className={`custom-input w-full ${errors.email ? 'error' : ''}`}
//                                     aria-invalid={errors.email ? 'true' : 'false'}
//                                 />
//                                 {errors.email && (
//                                     <small role="alert" className="custom-error">
//                                         {errors.email.message}
//                                     </small>
//                                 )}
//                             </div>

//                             <div>
//                                 <label htmlFor="password" className="custom-label">
//                                     Password
//                                 </label>
//                                 <InputText
//                                     id="password"
//                                     type="password"
//                                     {...register('password', {
//                                         required: 'Password is required',
//                                         minLength: {
//                                             value: 6,
//                                             message: 'Password must be at least 6 characters',
//                                         },
//                                     })}
//                                     className={`custom-input w-full ${errors.password ? 'error' : ''}`}
//                                     aria-invalid={errors.password ? 'true' : 'false'}
//                                 />
//                                 {errors.password && (
//                                     <small role="alert" className="custom-error">
//                                         {errors.password.message}
//                                     </small>
//                                 )}
//                             </div>

//                             <Button
//                                 type="submit"
//                                 label="Save Changes"
//                                 icon="pi pi-check"
//                                 className="custom-btn-submit mt-4"
//                             />
//                         </form>
//                         <Toast ref={toast} />
//                     </section>
//                 </div>
//             </main> */}
        
    );
}