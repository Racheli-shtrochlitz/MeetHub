
import React, { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import useGetToken from '../Hooks/useGetToken';
import UserAvatar from '../Components/UserAvatar';
import api from "../Services/api";


export default function AddStudent() {

    const [studentsItems, setStudentsItems] = useState(["temp", "demo"]);
    const [studentValue, setStudentValue] = useState(null);
    const token = useGetToken();


    useEffect(() => {
        if (!token) return;

        getAllStudents().then((data) => {
            const updatedData = data.map(student => ({
                ...student,
                email: student.user.email  // לצורך הסינון
            }));
            setStudentsItems(updatedData);
        });
    }, []);



    const getAllStudents = async () => {
        try {
          const response = await api.get('/student/getAllStudents');
          return response.data;
        } catch (error) {
          console.error('Error fetching students:', error);
          alert('error: ' + (error.response?.data?.message || 'Unknown error'));
          return [];
        }
      };


    const studentItemTemplate = (student) => {
        return (
            <div className="flex align-items-center gap-2">
                <UserAvatar user={{ name: student.user.email, image: student.user.image }} />
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
        <>
            <div className="flex-auto">

                <label htmlFor="buttondisplay" className="font-bold block mb-2">
                    student
                </label>
                <Dropdown
                    value={studentValue}
                    onChange={(e) => setStudentValue(e.value)}
                    options={studentsItems || []}
                    optionValue="_id"
                    optionLabel="email"
                    filter
                    filterPlaceholder="Search by email"
                    showFilterClear={false} // אופציונלי
                    className="w-full md:w-14rem"
                    itemTemplate={studentItemTemplate}
                    valueTemplate={selectedStudentTemplate}
                />


            </div>
        </>
    );
}