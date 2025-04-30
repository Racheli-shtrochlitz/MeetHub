import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const nevigate = useNavigate();

    return (
        <>
            {/* <div className="p-mx-auto">
                <h1>Welcome to the Home Page</h1>
                <p>This is the home page of your application.</p>
                <Button label="add teacher profile" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button>
                <Button onClick={() => { nevigate(/signUp)}} label="add student profile" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button >
                <Button onClick={() => { nevigate(/signUp)}} label="add student profile" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button >
            </div> */}
        </>
    )
}