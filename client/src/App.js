import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        
// Lazy load for the Login component
 const Login = lazy(() => import('./Components/Login'));
 const Navbar = lazy(() => import('./Components/Navbar'));
 const Table = lazy(() => import('./Components/Table'));
 const SideBar = lazy(() => import('./Components/Sidebar'));


function App() {
  return (
    <>

      <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <Table/>
            {/* <SideBar/> */}
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
