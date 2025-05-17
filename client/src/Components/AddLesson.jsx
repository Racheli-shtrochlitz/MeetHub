
import { AutoComplete } from "primereact/autocomplete";
import { ToggleButton } from 'primereact/togglebutton';
import { Calendar } from "primereact/calendar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

export default function AddLesson() {
    const navigate = useNavigate();

    const [studentValue, setStudentValue] = useState(null);
    const [studentsItems, setStudentsItems] = useState(["temp", "demo"]);

    const [subjectItems, setSubjectItems] = useState(["demo", "temp"]);
    const [datetime, setDateTime] = useState(null);
    const [checked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);


    const [selectedSubject, setSelectedSubject] = useState(null);
    const [filteredSubjects, setFilteredSubjects] = useState(null);

    const search = (event) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filteredSubjects;

            if (!event.query.trim().length) {
                _filteredSubjects = [...subjectItems];
            }
            else {
                _filteredSubjects = subjectItems.filter((subject) => {
                    return subject.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFilteredSubjects(_filteredSubjects);
        }, 250);
    }


    function sendToServer() {
        fetch('http://localhost:3000/lesson/addLesson', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json', // הוסיפי את זה!
            },
            body: JSON.stringify({
                "lesson": {
                    "student": studentValue,
                    "lessonDate": datetime,
                    "subject": selectedSubject,
                    "recording": checked,
                }
            })
        })
            .then(response => {
                // if (!response.ok) {
                //     alert("error: " + (response.message || 'Unknown error'));
                //     return;
                // }
                if (!response) {
                    alert("error: " + (response.message || 'Unknown error'));
                    console.log("error: " + (response.message || 'Unknown error'));
                    return;
                }
                console.log(response);
                alert("Lesson added successfully!");
                return response.json();
            })
            .catch((error) => {
                alert("Failed to add lesson. Please try again.")
                console.error('There was a problem with the fetch operation:', error);
            })
    }

    useEffect(() => {
        {
            getAllStudentsAndSubjects("students").then((data) => { setStudentsItems(data) });
            getAllStudentsAndSubjects("subjects").then((data) => { setSubjectItems(data); });
        }
    }, []);


    const getAllStudentsAndSubjects = (curFetch) => {
        let curUrl = '';
        if (curFetch === "students") {
            curUrl = 'http://localhost:3000/teacher/getAllStudents';
        }
        else if (curFetch === "subjects") {
            curUrl = 'http://localhost:3000/teacher/getAllSubjects';
        }
        return fetch(curUrl, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
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
            })

    }
    return (
        <div className="card flex justify-content-center" >
            <Button label="add lesson" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog header="add lesson" visible={visible} style={{ width: '30vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <div className="card flex flex-wrap gap-3 p-fluid">
                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            student
                        </label>
                        <Dropdown value={studentValue} onChange={(e) => setStudentValue(e.value)} options={studentsItems}
                            className="w-full md:w-14rem" />
                    </div>
                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            subject
                        </label>
                        {/* problem with the style of auto complete can'ot sae the writing */}
                        <AutoComplete field="name" value={selectedSubject} suggestions={filteredSubjects} panelStyle={{ backgroundColor: 'white', color: 'black' }} completeMethod={search} onChange={(e) => setSelectedSubject(e.value)} />
                    </div>
                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            data and time
                        </label>
                        <Calendar value={datetime} onChange={(e) => setDateTime(e.value)} showTime hourFormat="24" showIcon />
                    </div>
                    <div className="flex align-items-center">
                        <ToggleButton checked={checked} onChange={(e) => setChecked(e.value)} className="w-8rem" />
                        <label className="ml-2">recording</label>
                    </div>
                    <div className="flex-auto">
                        <Button label="upload" icon="pi pi-external-link" onClick={() => navigate('/upload')} />
                    </div>
                    <Button label="Ok" icon="pi pi-check" onClick={() => { sendToServer(); setVisible(false); }} autoFocus />
                </div>
            </Dialog>
        </div>
    )
}

