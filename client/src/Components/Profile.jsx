import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';
import { useNavigate } from 'react-router-dom';
import Table from './Table';
import { AutoComplete } from 'primereact/autocomplete';
import api from '../Services/api';

export default function Profile() {
    const navigate = useNavigate();

    const [activeRole] = useState(localStorage.getItem('activeRole') || "student");


    const [visibleTable, setVisibleTable] = useState(false);
    const [visibleAddLesson, setVisibleAddLesson] = useState(false);
    const [visibleAddStudent, setVisibleAddStudent] = useState(false)
    const [usrName, setUsrName] = useState();
    const [countMess, setCountMess] = useState(0);
    const [Messages, setMessages] = useState([]);
    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const btnRef3 = useRef(null);
    const btnRef4 = useRef(null);

    function setVisibleFalse() {
        setVisibleTable(false);
        setVisibleAddLesson(false);
    }

    // useEffect(() => {
    //     setUsrName(localStorage.getItem('name') || "jh");
    //     setCountMess(0);
    //     const token = localStorage.getItem('token');
    //      setStudentsItems(getAllStudentsAndSubjects("students"));
    // }, [])

    async function getAllMessFromServer() {
        const response = await api.get('message/getAllMessages');
        const data = response.data;
        setMessages(data);
        setCountMess(data.length);
    }

    async function gotToMaterial() {
        const response = await api.get('material/getMaterialLink');
        const data = response.data;
        window.open(data.Link || "https://www.google.com");
    }
    
    return (
        <div className="min-h-screen flex relative">
            <div className="surface-section h-screen flex-shrink-0 border-right-1 surface-border select-none" style={{ width: '280px', backgroundColor: 'white' }}>

                <div className="min-h-screen flex relative lg:static surface-ground">
                    <div id="app-sidebar-2" className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none" style={{ width: '280px' }}>
                        <div className="flex flex-column h-full">
                            <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                                <span className="inline-flex align-items-center gap-2">

                                    <span className="font-semibold text-2xl text-primary">Your Page</span>
                                </span>
                            </div>
                            <div className="overflow-y-auto">
                                <ul className="list-none p-3 m-0">
                                    <li>
                                        <StyleClass nodeRef={btnRef1} selector="@next" enterFromClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                            <div ref={btnRef1} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer">
                                                <span className="font-medium">LESSONS</span>
                                                <i className="pi pi-chevron-down"></i>
                                                <Ripple />
                                            </div>
                                        </StyleClass>
                                        <ul className="list-none p-0 m-0 overflow-hidden">
                                            <li onClick={() => { navigate("profile/lessontable"); }}>
                                                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                    <i className="pi pi-home mr-2"></i>
                                                    <span className="font-medium">My Lessons</span>
                                                    <Ripple />
                                                </a>
                                            </li>
                                            <li onClick={() => { navigate('profile/records'); }}>
                                                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                    <i className="pi pi-microphone mr-2"></i>
                                                    <span className="font-medium">Records</span>
                                                    <Ripple />
                                                </a>
                                            </li>
                                            <li onClick={() => { gotToMaterial() }}>
                                                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                    <i className="pi pi-chart-line mr-2"></i>
                                                    <span className="font-medium">Materials</span>
                                                    <Ripple />
                                                </a>
                                            </li>
                                            {activeRole === "teacher" ? (<li onClick={() => { navigate('profile/addlesson') }}>
                                                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                    <i className="pi pi-calendar-plus mr-2"></i>
                                                    <span className="font-medium">Add lesson</span>
                                                    <Ripple />
                                                </a>
                                            </li>) : <></>}
                                            <li onClick={() => { navigate('profile/calendar') }}>
                                                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                    <i className="pi pi-calendar mr-2"></i>
                                                    <span className="font-medium">Calendar</span>
                                                    <Ripple />
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className="list-none p-3 m-0">
                                    <li>
                                        <StyleClass nodeRef={btnRef2} selector="@next" enterFromClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                            <div ref={btnRef2} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer">
                                                <span className="font-medium">STUDENTS</span>
                                                <i className="pi pi-chevron-down"></i>
                                                <Ripple />
                                            </div>
                                        </StyleClass>
                                        <ul className="list-none p-0 m-0 overflow-hidden">
                                            <li>
                                                <a onClick={() => { navigate('Profile/students') }} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                    <i className="pi pi-users mr-2"></i>
                                                    <span className="font-medium">your students</span>
                                                    <span className="inline-flex align-items-center justify-content-center ml-auto bg-blue-500 text-0 border-circle" style={{ minWidth: '1.5rem', height: '1.5rem' }}>
                                                    </span>
                                                    <Ripple />
                                                </a>
                                            </li>
                                            <li onClick={() => { navigate('profile/addstudent') }}>
                                                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                    <i className="pi pi-user-plus mr-2"></i>
                                                    <span className="font-medium">Add Students</span>
                                                    <Ripple />
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className="list-none p-3 m-0">
                                    <StyleClass nodeRef={btnRef3} selector="@next" enterFromClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                        <div ref={btnRef3} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer">
                                            <span className="font-medium">MESSAGES</span>
                                            <i className="pi pi-chevron-down"></i>
                                            <Ripple />
                                        </div>
                                    </StyleClass>
                                    <ul className="list-none p-0 m-0 overflow-hidden">
                                        <li onClick={() => { navigate('profile/messages') }}>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-comments mr-2"></i>
                                                <span className="font-medium">your messages</span>
                                                <span className="inline-flex align-items-center justify-content-center ml-auto bg-blue-500 text-0 border-circle" style={{ minWidth: '1.5rem', height: '1.5rem' }}>
                                                    {countMess}
                                                </span>
                                                <Ripple />
                                            </a>
                                        </li>
                                        <li onClick={() => { navigate('profile/sendmessage') }}>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-send mr-2"></i>
                                                <span className="font-medium">send message</span>
                                                <span className="inline-flex align-items-center justify-content-center ml-auto bg-blue-500 text-0 border-circle" style={{ minWidth: '1.5rem', height: '1.5rem' }}>
                                                </span>
                                                <Ripple />
                                            </a>
                                        </li>
                                        <li onClick={() => { navigate('profile/messagesettings') }}>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-cog mr-2"></i>
                                                <span className="font-medium">messages settings</span>
                                                <span className="inline-flex align-items-center justify-content-center ml-auto bg-blue-500 text-0 border-circle" style={{ minWidth: '1.5rem', height: '1.5rem' }}>
                                                </span>
                                                <Ripple />
                                            </a>
                                        </li>
                                    </ul>
                                </ul>
                            </div>
                            <div className="mt-auto">
                                <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                                <a className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                    <Avatar image='profile.png' shape="circle" />
                                    <span className="font-bold">{usrName}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}