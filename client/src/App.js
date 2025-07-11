import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect, useRef } from 'react';
import useGetToken from './Hooks/useGetToken';
import useUser from './Hooks/useUser';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './Store/UserSlice';
import api, { setToastInstance } from './Services/api';
import { Toast } from 'primereact/toast';

const Login = lazy(() => import('./Components/Login'));
const Navbar = lazy(() => import('./Components/Navbar'));
const Table = lazy(() => import('./Components/Table'));
const SignUp = lazy(() => import('./Components/Signup'));
const Home = lazy(() => import('./Components/Home'));
const Profile = lazy(() => import('./Components/Profile'));
const AddLesson = lazy(() => import('./Components/AddLesson'));
const Calendar = lazy(() => import('./Components/Calendar'));
const AddStudent = lazy(() => import('./Components/AddStudent'));
const SendMessage = lazy(() => import('./Components/SendMessage'));
const StudentTable = lazy(() => import('./Components/StudentTable'));
const Settings = lazy(() => import('./Components/Settings'));

function App() {
  const dispatch = useDispatch();
  const token = useGetToken();
  const user = useUser();

  const toastRef = useRef(null);

  useEffect(() => {
    setToastInstance(toastRef); // חשוב! מעביר את הרפרנס ל־api.js
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('user/getUserByToken');
        const data = response.data.data;

        dispatch(setUserDetails({
          name: data.name,
          email: data.email,
          activeRole: data.activeRole
        }));
      } catch (err) {
        console.error(err);
      }
    }

    if (token) fetchData();
  }, [token]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} >
          <Route index element={<Settings />} />
          <Route path="lessons" element={<Table />} />
          <Route path="addLesson" element={<AddLesson />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="records" element={<>demo</>} />
          <Route path="students" element={<StudentTable />} />
          <Route path="addStudent" element={<AddStudent />} />
          <Route path="messages" element={<>demo</>} />
          <Route path="sendMessage" element={<SendMessage />} />
          <Route path="messageSettings" element={<>demo</>} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toast ref={toastRef} />
    </Suspense>
  );
}

export default App;
