
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

    const [subjectItems, setSubjectItems] = useState(["demo", "temp"]);
    const [studentValue, setStudentValue] = useState(null);
    const [studentsItems, setStudentsItems] = useState(["temp", "demo"]);
    const [subjectValue, setSubjectValue] = useState();
    const [datetime, setDateTime] = useState(null);
    const [checked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);


    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [filteredSubjects, setFilteredSubjects] = useState(null);

    const search = (event) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filteredSubjects;

            if (!event.query.trim().length) {
                _filteredSubjects = [...subjects];
            }
            else {
                _filteredSubjects = subjects.filter((subject) => {
                    return subject.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFilteredSubjects(_filteredSubjects);
        }, 250);
    }


    function sendToServer() {
        const body = JSON.stringify({
            "lesson": {
                "student": "681245909db7e8970fd8fd46" || studentValue,
                "lessonDate": datetime,
                "subject": subjectValue,
                "recording": checked,
            }
        })
        console.log(body);
        fetch('http://localhost:3000/lesson/addLesson', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
            body: body
        })
            .then(response => {
                // if (!response.ok) {
                //     alert("error: " + (response.message || 'Unknown error'));
                //     return;
                // }
                if (!response) {
                    console.log("error: " + (response.message || 'Unknown error'));
                    return;
                }
                console.log(response);
                return response.json();
            })
    }

    useEffect(() => {
        {
           setStudentsItems(getAllStudentsAndSubjects("students"));

           setSubjects( getAllStudentsAndSubjects("subjects"))

        }
    }, []);


    const getAllStudentsAndSubjects = (curFetch) => {
        // let curUrl = '';
        // if (curFetch === "students") {
        //     curUrl = 'http://localhost:3000/teacher/getAllStudents';
        // }
        // else if (curFetch === "subjects") {
        //     curUrl = 'http://localhost:3000/teacher/getAllSubjects';
        // }
        // fetch(curUrl, {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': localStorage.getItem('token'),
        //     },
        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             alert("error: " + (response.message || 'Unknown error'));
        //             return;
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         console.log(data);
        //         return data;
        //     })
        //     .catch((error) => {
        //         console.error('There was a problem with the fetch operation:', error);
        //     })
        return ["hbnj", "jhnmk", "jjn"]

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
                        <AutoComplete field="name" value={selectedSubject} suggestions={filteredSubjects} completeMethod={search} onChange={(e) => setSelectedSubject(e.value)} />
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

