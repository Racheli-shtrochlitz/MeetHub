import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

        
 const Login = lazy(() => import('./Components/Login'));
 const Navbar = lazy(() => import('./Components/Navbar'));
 const Table = lazy(() => import('./Components/Table'));
 const SideBar = lazy(() => import('./Components/Sidebar'));
const SignUp = lazy(() => import('./Components/Signup'));
const Home = lazy(() => import('./Components/Home'));


function App() {
  return (
    <>

      <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <Table/>
            {/* <SideBar/> */}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
