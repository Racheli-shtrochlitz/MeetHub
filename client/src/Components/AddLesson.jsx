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


export default function AddLesson() {
    const navigate = useNavigate();
    const token = useGetToken();

    const [studentValue, setStudentValue] = useState(null);
    const [studentsItems, setStudentsItems] = useState(["temp", "demo"]);
    const [subjectItems, setSubjectItems] = useState(["demo", "temp"]);
    const [datetime, setDateTime] = useState(null);
    const [checked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [filteredSubjects, setFilteredSubjects] = useState(null);
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
                const response = await fetch('http://localhost:3000/teacher/getTeacherByToken', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error:", errorData.message || "Unknown error");
                    alert("Error: " + (errorData.message || "Unknown error"));
                    return;
                }

                const data = await response.json();
                setTeacher(data);
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
            const response = await fetch('http://localhost:3000/zoom/createMeeting', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                zoomLink = data.joinUrl;
            } else {
                const err = await response.json();
                console.error("Zoom Server error:", err.message || err);
                alert("Error creating Zoom meeting: " + (err.message || "Unknown error"));
            }
        } catch (error) {
            alert("Failed to create Zoom meeting. Using default link.");
            console.error('Zoom fetch error:', error);
        }

        try {
            const response = await fetch('http://localhost:3000/lesson/addLesson', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lesson: {
                        teacher: teacher?._id,
                        student: studentValue,
                        lessonDate: datetime.toISOString(),
                        subject: selectedSubject,
                        recording: checked,
                        zoomLink: zoomLink
                    }
                })
            });

            if (!response.ok) {
                const err = await response.json();
                console.error("Lesson Server error:", err.message || err);
                alert("Error: " + (err.message || "Unknown error"));
                return;
            }

            const data = await response.json();
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

    const getAllStudentsAndSubjects = (curFetch) => {
        let curUrl = '';

        if (curFetch === "students") {
            curUrl = 'http://localhost:3000/teacher/getAllStudents';
        } else if (curFetch === "subjects") {
            curUrl = 'http://localhost:3000/teacher/getAllSubjects';
        }

        return fetch(curUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    alert("error: " + (response.message || 'Unknown error'));
                    return;
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.error(`There was a problem with the fetch operation (get all ${curFetch}):`, error);
                return [];
            });
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
            <Button label="add lesson" icon="pi pi-external-link" onClick={() => setVisible(true)} />

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
                            checked={checked}
                            onChange={(e) => setChecked(e.value)}
                            className="w-8rem"
                        />
                        <label className="ml-2">recording</label>
                    </div>

                    <div className="flex-auto">
                        <Button label="upload" icon="pi pi-external-link" onClick={() => navigate('/upload')} />
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
