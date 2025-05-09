import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import useGetToken from './Hooks/useGetToken';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './Store/UserSlice';

const Login = lazy(() => import('./Components/Login'));
const Navbar = lazy(() => import('./Components/Navbar'));
const Table = lazy(() => import('./Components/Table'));
const SideBar = lazy(() => import('./Components/Sidebar'));
const SignUp = lazy(() => import('./Components/Signup'));
const Home = lazy(() => import('./Components/Home'));
const AddLesson = lazy(() => import('./Components/AddLesson'));
const UploadFiles = lazy(() => import('./Components/UploadFiles'));


function App() {
  const dispatch = useDispatch();
  const token = useGetToken();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/user/getUserByToken', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
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
        <Route path="/table" element={<Table />} />
        <Route path="/addLesson" element={<AddLesson />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lessons" element={<Table />} />
      </Routes>
    </Suspense>
  );
}

export default App;
