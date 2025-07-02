import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import api from "../Services/api";
import UserAvatar from "./UserAvatar";
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SendMessage() {

    const user = useSelector((state) => state.user);
    const [emailsItems, setEmailsItems] = useState([]);

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isDirty, isValid }
    } = useForm({
        defaultValues: {
            emails: "",
            message: ""
        },
        mode: "onChange"
    });

    useEffect(() => {
        const fetchEmails = async () => {
            const activeRole = "teacher" || user.activeRole;
            let url = '';
            try {
                if (activeRole === "teacher")
                    url = "/teacher/getAllStudents";
                else if (activeRole === "student")
                    url = "/student/getAllTeachers";
                const response = await api.get(url);
                setEmailsItems(response.data.data);
            } catch (error) {
                setEmailsItems([]);
            }
        };
        fetchEmails();
    }, []);

    useEffect(() => {
        if (emailsItems.length > 0) {
            setValue("emails", emailsItems[0]);
        }
    }, [emailsItems, setValue]);

    const onSubmit = async (data) => {
        try {
            await api.post("/message/sendMessage", {
                toName: data.emails,
                formName: user.name,
                email: data.emails,
                message: data.message
            });
            reset();
        } catch (err) {
            console.error("Send message failed: ", err);
        }
    };

    const emailItemTemplate = (email) => (
        <div className="flex align-items-center gap-2">
            <UserAvatar user={{ name: email.user.name, image: email.user.image }} />
        </div>
    );

    const selectedEmailsTemplate = (email) => {
        if (!email || !email.user) return null;
        return (
            <div className="flex align-items-center gap-2">
                <UserAvatar user={{ name: email.user.name, image: email.user.image }} />
            </div>
        );
    };

    return (
        <div className="p-4 flex flex-column align-items-center justify-content-center" style={{ minWidth: "300px" }}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-column gap-3"
                style={{ maxWidth: "320px" }}
            >
                <div className="flex flex-column">
                    <label htmlFor="emails" className="mb-2 font-semibold text-sm">
                        {user.activeRole === "teacher" ? "Member Email" : "Host Email"}
                    </label>
                    <Controller
                        name="emails"
                        control={control}
                        rules={{ required: user.activeRole === "teacher" ? "Member is required." : "Host is required." }}
                        render={({ field }) => (
                            <Dropdown
                                {...field}
                                id="emails"
                                options={emailsItems}
                                optionValue="user.email"
                                className={classNames("w-full md:w-14rem", {
                                    "p-invalid": !!errors.emails
                                })}
                                itemTemplate={emailItemTemplate}
                                valueTemplate={selectedEmailsTemplate}
                            />
                        )}
                    />
                    {errors.emails && <small className="p-error">{errors.emails.message}</small>}
                </div>

                <div className="flex flex-column">
                    <label htmlFor="message" className="mb-2 font-semibold text-sm">
                        Message
                    </label>
                    <Controller
                        name="message"
                        control={control}
                        rules={{ required: "Message is required." }}
                        render={({ field }) => (
                            <InputText
                                {...field}
                                id="message"
                                placeholder="This is your message"
                                className={classNames({ "p-invalid": !!errors.message })}
                            />
                        )}
                    />
                    {errors.message && <small className="p-error">{errors.message.message}</small>}
                </div>

                <div className="flex justify-content-end">
                    <Button
                        type="submit"
                        label="Send"
                        size="small"
                        disabled={!isDirty || !isValid}
                    />
                </div>
            </form>
        </div>
    );
}
