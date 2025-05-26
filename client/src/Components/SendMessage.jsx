import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import api from "../Services/api";
import UserAvatar from "./UserAvatar";
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from "react";
import useUser from "../Hooks/useUser";
export default function SendMessage() {
    const user = useUser();

    const [emailsItems, setEmailsItems] = useState([]);

    const form = useFormik({
        initialValues: { emails: "", message: "" },
        validate: (data) => {
            const errors = {};
            if (!data.emails) {
                errors.emails = "Student is required.";
            }
            if (!data.message) {
                errors.message = "Message is required.";
            }
            return errors;
        },
        onSubmit: () => { connectToServer() }
    });

    useEffect(() => {
        const fetchEmails = async () => {
            const activeRole = user.activeRole;
            let url = '';
            try {
                if (activeRole == "teacher")
                    url = "/teacher/getAllStudents";
                else if (activeRole == "student")
                    url = "/student/getAllTeachers";
                const response = await api.get(url);
                setEmailsItems(response.data);
            } catch (error) {
                console.error(`Fetch error:`, error);
                setEmailsItems([]);
            }
        };
        fetchEmails();
    }, []);

    useEffect(() => {
        if (emailsItems.length > 0) {
            form.setFieldValue("student", emailsItems[0]._id);
        }
    }, [emailsItems]);

    const emailItemTemplate = (email) => {
        return (
            <div className="flex align-items-center gap-2">
                <UserAvatar user={{ name: email.user.name, image: email.user.image }} />
            </div>
        );
    };

    const selectedEmailsTemplate = (emails) => {
        if (!emails || !emails.user) return null;

        return (
            <div className="flex align-items-center gap-2">
                <UserAvatar user={{ name: emails.user.name, image: emails.user.image }} />
            </div>
        );
    };

    const connectToServer = async () => {
        try {
            const response = await api.post("/message/sendMessage", {
                toName: form.values.emails,
                formName: user.name,
                email: form.values.emails,
                message: form.values.message
            });
            form.resetForm();
        } catch (err) {
            console.error("Send message failed: ", err);
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
            <form
                onSubmit={form.handleSubmit}
                className="w-full flex flex-column gap-3"
                style={{ maxWidth: "320px" }}
            >
                <div className="flex flex-column">
                    <label htmlFor="email" className="mb-2 font-semibold text-sm">
                        Emails
                    </label>

                    <Dropdown
                        id="emails"
                        name="emails"
                        value={form.values.emails}
                        onChange={(e) => form.setFieldValue("emails", e.target.value)}
                        onBlur={form.handleBlur}
                        options={emailsItems}
                        optionValue="user.email"
                        className="w-full md:w-14rem"
                        itemTemplate={emailItemTemplate}
                        valueTemplate={selectedEmailsTemplate}
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
                        label="Send"
                        size="small"
                        disabled={!form.isValid || !form.dirty}
                    />
                </div>
            </form>
        </div>
    );
}
