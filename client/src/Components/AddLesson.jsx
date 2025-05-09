
import { AutoComplete } from "primereact/autocomplete";
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Calendar } from "primereact/calendar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';



export default function AddLesson() {

    const [value, setValue] = useState(null);
    const [subjectValue, setSubjectValue] = useState();
    const [items, setItems] = useState([]);
    const [studentValue, setStudentValue] = useState(null);
    const navigate = useNavigate();
    const [datetime, setDateTime] = useState(null);
    const [visible, setVisible] = useState(false);

    function sendToServer() {
        fetch('http://localhost:3000/lesson/addLesson', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                "lesson": {
                    "student": "681245909db7e8970fd8fd46" || studentValue,
                    "lessonDate": datetime,
                    "subject": subjectValue,
                    "recording": true
                }
            })
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

    // put student list from 
    const search = (event) => {
        fetch('http://localhost:3000/student/getAllStudents', {
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
                setItems(data.map((item) => item.name));
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
                        <Dropdown value={studentValue} onChange={(e) => setStudentValue(e.value)} options={items} optionLabel="name"
                            className="w-full md:w-14rem" />
                    </div>
                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            subject
                        </label>
                        <AutoComplete inputId="ac" value={subjectValue}  completeMethod={search}  onChange={(e) => setSubjectValue(e.value)} />
                            {/*suggestions={items}*/}
                    </div>
                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            data and time
                        </label>
                        <Calendar value={datetime} onChange={(e) => setDateTime(e.value)} showTime hourFormat="24" showIcon />
                    </div>
                    <div className="flex align-items-center">
                        <TriStateCheckbox value={value} onChange={(e) => setValue(e.value)} />
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

