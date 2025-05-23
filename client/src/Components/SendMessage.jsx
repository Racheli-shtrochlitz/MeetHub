import React, { useRef } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import api from "../Services/api";
import UserAvatar from "./UserAvatar";
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from "react";
export default function SendMessage() {
    const toast = useRef(null);

    const [studentsItems, setStudentsItems] = useState([]);

    const form = useFormik({
        initialValues: { student: "", message: "" },
        validate: (data) => {
            const errors = {};
            if (!data.student) {
                errors.student = "Student is required.";
            }
            if (!data.message) {
                errors.message = "Message is required.";
            }
            return errors;
        },
        onSubmit: ()=>{connectToServer()}
    });

useEffect(() => {
    const fetchStudents = async () => {
        try {
            const response = await api.get('teacher/getAllStudents');
            setStudentsItems(response.data);
        } catch (error) {
            console.error(`Fetch error:`, error);
            setStudentsItems([]);
        }
    };

    fetchStudents();
}, []);

useEffect(() => {
    if (studentsItems.length > 0) {
        form.setFieldValue("student", studentsItems[0]._id); 
    }
}, [studentsItems]);

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

    const connectToServer = async () => {
        try {
            const response = await api.post("message/sendMessage", {
                student: form.values.student,
                message: form.values.message
            });
            toast.current.show({
                severity: "success",
                summary: "message sent",
                detail: response.data.message,
                life: 2500
            });
            form.resetForm();
        } catch (err) {
            const status = err.response?.status;
            const serverMessage = err.response?.data?.error || err.message;
            toast.current.show({
                severity: "error",
                summary: `Error ${status || ""}`,
                detail: serverMessage,
                life: 3000
            });
        }
    };

    const isFormFieldInvalid = (name) =>
        !!(form.touched[name] && form.errors[name]);

    const getFormErrorMessage = (name) =>
        isFormFieldInvalid(name) ? (
            <small className="p-error">{form.errors[name]}</small>
        ) : (
            <small className="p-error">&nbsp;</small>
        )
    return (
        <div className="p-4 flex flex-column align-items-center justify-content-center" style={{ minWidth: "300px" }}>
            <Toast ref={toast} />
            <form
                onSubmit={form.handleSubmit}
                className="w-full flex flex-column gap-3"
                style={{ maxWidth: "320px" }}
            >
                <div className="flex flex-column">
                    <label htmlFor="email" className="mb-2 font-semibold text-sm">
                        Student
                    </label>

                    <Dropdown
                        id="student"
                        name="student"
                        value={form.values.student}
                        onChange={(e) => form.setFieldValue("student", e.target.value)}
                        onBlur={form.handleBlur}
                        options={studentsItems}
                        optionValue="_id"
                        className="w-full md:w-14rem"
                        itemTemplate={studentItemTemplate}
                        valueTemplate={selectedStudentTemplate}
                    />
                    </div>
                <div className="flex justify-content-end">
                    <InputText
                        id="message"
                        name="message"
                        value={form.values.message}
                        onChange={(e) => form.setFieldValue("message", e.target.value)}
                        onBlur={form.handleBlur}
                        placeholder="this is your message"
                        className={classNames({ "p-invalid": isFormFieldInvalid("message") })}
                    />
                    {getFormErrorMessage("message")}
                </div>
                <div className="flex justify-content-end">
                    <Button
                        type="submit"
                        label="Add"
                        size="small"
                        disabled={!form.isValid || !form.dirty}
                    />
                </div>
            </form>
        </div>
    );
}
