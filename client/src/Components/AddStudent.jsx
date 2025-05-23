import React, { useRef } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import api from "../Services/api";

export default function AddStudentForm() {
    const toast = useRef(null);

    const formik = useFormik({
        initialValues: { email: "" },
        validate: (data) => {
            const errors = {};
            if (!data.email) {
                errors.email = "Email is required.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                errors.email = "Invalid email format.";
            }
            return errors;
        },
        onSubmit: () => connectToServer()
    });

    const connectToServer = async () => {
        try {
            const response = await api.post("teacher/addStudent", {
                email: formik.values.email
            });
            toast.current.show({
                severity: "success",
                summary: "Student Added",
                detail: response.data.message,
                life: 2500
            });
            formik.resetForm();
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
        !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) =>
        isFormFieldInvalid(name) ? (
            <small className="p-error">{formik.errors[name]}</small>
        ) : (
            <small className="p-error">&nbsp;</small>
        );

    return (
        <div className="p-4 flex flex-column align-items-center justify-content-center" style={{ minWidth: "300px" }}>
            <Toast ref={toast} />
            <form
                onSubmit={formik.handleSubmit}
                className="w-full flex flex-column gap-3"
                style={{ maxWidth: "320px" }}
            >
                <div className="flex flex-column">
                    <label htmlFor="email" className="mb-2 font-semibold text-sm">
                        Student Email
                    </label>
                    <InputText
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={(e) => formik.setFieldValue("email", e.target.value)}
                        onBlur={formik.handleBlur}
                        placeholder="example@student.com"
                        className={classNames({ "p-invalid": isFormFieldInvalid("email") })}
                    />
                    {getFormErrorMessage("email")}
                </div>
                <div className="flex justify-content-end">
                    <Button
                        type="submit"
                        label="Add"
                        size="small"
                        disabled={!formik.isValid || !formik.dirty}
                    />
                </div>
            </form>
        </div>
    );
}
