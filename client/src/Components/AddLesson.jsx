import { AutoComplete } from "primereact/autocomplete";
import { ToggleButton } from 'primereact/togglebutton';
import { Calendar } from "primereact/calendar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import useGetToken from '../Hooks/useGetToken';
import UserAvatar from '../Components/UserAvatar';
import api from "../Services/api";
import { InputText } from "primereact/inputtext";

export default function AddLesson() {
    const navigate = useNavigate();
    const token = useGetToken();

    const [studentValue, setStudentValue] = useState(null);
    const [studentsItems, setStudentsItems] = useState(["temp", "demo"]);
    const [subjectItems, setSubjectItems] = useState(["demo", "temp"]);
    const [datetime, setDateTime] = useState(null);
    const [checked, setChecked] = useState(false);
    const [visible, setVisible] = useState(true);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [filteredSubjects, setFilteredSubjects] = useState(null);
    const [materialLink, setMaterialLink] = useState('');
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        console.log("studentsItems:", studentsItems);
    }, [studentsItems]);

    const search = (event) => {
        setTimeout(() => {
            let _filteredSubjects;
            if (!event.query.trim().length) {
                _filteredSubjects = [...subjectItems];
            } else {
                _filteredSubjects = subjectItems.filter((subject) => {
                    return subject.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredSubjects(_filteredSubjects);
        }, 250);
    };

    useEffect(() => {
        if (!token) return;
        const fetchTeacher = async () => {
            try {
                const response = await api.get('teacher/getTeacherByToken');
                setTeacher(response.data);
            } catch (error) {
                console.error('Fetch error:', error);
                alert('Fetch error: ' + error.message);
            }
        };
        fetchTeacher();
    }, [token]);

    async function sendToServer() {
        if (!teacher) return;
        let zoomLink;
        try {
            const response = await api.post('zoom/createMeeting');
            const data = response.data;
            zoomLink = data.joinUrl;
        } catch (error) {
            alert("Failed to create Zoom meeting. Using default link.");
            console.error('Zoom fetch error:', error);
        }
        try {
            const response = await api.post('lesson/addLesson', {
                lesson: {
                    teacher: teacher?._id,
                    student: studentValue,
                    lessonDate: datetime.toISOString(),
                    subject: selectedSubject,
                    recording: checked,
                    materials: materialLink,
                    zoomLink: zoomLink
                }
            });
            const data = response.data;
            alert("Lesson added successfully!");
            console.log("Response:", data);
        } catch (error) {
            alert("Failed to add lesson. Please try again.");
            console.error('Lesson fetch error:', error);
        }
    }

    useEffect(() => {
        if (!token) return;
        getAllStudentsAndSubjects("students").then((data) => setStudentsItems(data));
        getAllStudentsAndSubjects("subjects").then((data) => setSubjectItems(data));
    }, []);

    const getAllStudentsAndSubjects = async (curFetch) => {
        let curUrl = '';
        if (curFetch === "students") {
            curUrl = 'teacher/getAllStudents';
        } else if (curFetch === "subjects") {
            curUrl = 'teacher/getAllSubjects';
        }
        try {
            const response = await api.get(curUrl);
            return response.data;
        } catch (error) {
            console.error(`Fetch error (${curFetch}):`, error);
            return [];
        }
    };


    const studentItemTemplate = (student) => {
        return (
            <div className="flex align-items-center gap-2">
                <UserAvatar user={{ name: student.user.name, image: student.user.image }} />
            </div>
        );
    };

    const selectedStudentTemplate = (student) => {
        if (!student || !student.user) return null;

        return (
            <div className="flex align-items-center gap-2">
                <UserAvatar user={{ name: student.user.name, image: student.user.image }} />
            </div>
        );
    };



    return (
        <div className="card flex justify-content-center">
            <Dialog header="add lesson" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)}>
                <div className="card flex flex-wrap gap-3 p-fluid">
                    <div className="flex-auto">

                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            student
                        </label>
                        <Dropdown
                            value={studentValue}
                            onChange={(e) => setStudentValue(e.value)}
                            options={studentsItems || []}
                            optionValue="_id"
                            className="w-full md:w-14rem"
                            itemTemplate={studentItemTemplate}
                            valueTemplate={selectedStudentTemplate}
                        />

                    </div>

                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            subject
                        </label>
                        <AutoComplete
                            field="name"
                            value={selectedSubject}
                            suggestions={filteredSubjects}
                            panelStyle={{ backgroundColor: 'white', color: 'black' }}
                            completeMethod={search}
                            onChange={(e) => setSelectedSubject(e.value)}
                        />
                    </div>

                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            date and time
                        </label>
                        <Calendar
                            value={datetime}
                            onChange={(e) => setDateTime(e.value)}
                            showTime
                            hourFormat="24"
                            showIcon
                        />
                    </div>

                    <div className="flex align-items-center">
                        <ToggleButton
                            style={{width: '2rem'}}
                            checked={checked}
                            onChange={(e) => setChecked(e.value)}
                            className="w-8rem"
                        /> 
                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            recording
                        </label>
                    </div>

                    <div className="flex-auto">
                         <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            material link (in drive)
                        </label>
                        <InputText value={materialLink} onChange={(e) => setMaterialLink(e.target.value)} />
                    </div>

                    <Button
                        label="Ok"
                        icon="pi pi-check"
                        onClick={() => {
                            if (!teacher?._id) {
                                alert("Teacher not loaded yet.");
                                return;
                            }
                            sendToServer();
                            setVisible(false);
                        }}
                        autoFocus
                    />
                </div>
            </Dialog>
        </div>
    );
}
