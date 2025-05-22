import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import useGetToken from './Hooks/useGetToken';
import useUser from './Hooks/useUser';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './Store/UserSlice';
import api from './Services/api';

const Login = lazy(() => import('./Components/Login'));
const Navbar = lazy(() => import('./Components/Navbar'));
const Table = lazy(() => import('./Components/Table'));
const SignUp = lazy(() => import('./Components/Signup'));
const Home = lazy(() => import('./Components/Home'));
const Profile = lazy(() => import('./Components/Profile'));
const UploadFiles = lazy(() => import('./Components/UploadFiles'));
const AddLesson = lazy(() => import('./Components/AddLesson'));
const Calendar = lazy(() => import('./Components/Calendar'));
const AddStudent = lazy(() => import('./Components/AddStudent'));




function App() {
  const dispatch = useDispatch();
  const token = useGetToken();
  const user = useUser();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('user/getUserByToken');
        const data = response.data;

        dispatch(setUserDetails({
          name: data.name,
          email: data.email,
          activeRole: data.activeRole
        }));
        
        console.log(data);
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
          <Route path="lessons" element={<Table />} />
          <Route path="addLesson" element={<AddLesson/>} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="records" element={<>demo</>} />
          <Route path="students" element={< >demo</>} />
          <Route path="addStudent" element={<AddStudent/>} />
          <Route path="messages" element={< >demo</>} />
          <Route path="sendMessage" element={< >demo</>} />
          <Route path="messageSettings" element={<>demo</>} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadFiles/>}/>
        {/* <Route path="/calendar" element={<Calendar/>}/> */}
        {/* <Route path="/addStudent" element={<AddStudent/>}/> */}


      </Routes>
    </Suspense>
  );
}
export default App;
