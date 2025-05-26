import { useForm, Controller } from "react-hook-form";
import { ToggleButton } from "primereact/togglebutton";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import useGetToken from "../Hooks/useGetToken";
import UserAvatar from "../Components/UserAvatar";
import api from "../Services/api";
import React, { useEffect, useState } from "react";

export default function AddLesson() {
    const token = useGetToken();
    const [studentsItems, setStudentsItems] = useState([]);
    const [teacher, setTeacher] = useState(null);
    const [visible, setVisible] = useState(true);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            student: null,
            title: "",
            datetime: null,
            recording: false,
            materials: ""
        }
    });

    useEffect(() => {
        if (!token) return;
        const fetchTeacher = async () => {
            try {
                const response = await api.get("teacher/getTeacherByToken");
                setTeacher(response.data);
            } catch (error) {
                console.error("Fetch error:", error);
                alert("שגיאה בטעינת המורה");
            }
        };
        fetchTeacher();
    }, [token]);

    useEffect(() => {
        if (!token) return;
        const fetchStudents = async () => {
            try {
                const response = await api.get("teacher/getAllStudents");
                setStudentsItems(response.data);
            } catch (error) {
                console.error("Fetch error (students):", error);
                alert("שגיאה בטעינת תלמידים");
            }
        };
        fetchStudents();
    }, []);

    const onSubmit = async (data) => {
        if (!teacher?._id) {
            alert("המורה לא נטען");
            return;
        }

        let zoomLink = "";
        try {
            const response = await api.post("zoom/createMeeting");
            zoomLink = response.data.joinUrl;
        } catch (error) {
            console.error("Zoom fetch error:", error);
            alert("שגיאה ביצירת זום");
        }

        try {
            await api.post("lesson/addLesson", {
                lesson: {
                    teacher: teacher._id,
                    student: data.student,
                    lessonDate: data.datetime.toISOString(),
                    title: data.title,
                    recording: data.recording,
                    materials: data.materials,
                    zoomLink: zoomLink
                }
            });
            alert("השיעור נוסף בהצלחה");
            setVisible(false);
            //reset();
        } catch (error) {
            console.error("Lesson error:", error);
            alert("שגיאה בהוספת שיעור");
        }
    };

    const studentItemTemplate = (student) => (
        <div className="flex align-items-center gap-2">
            <UserAvatar user={{ name: student.user.name, image: student.user.image }} />
        </div>
    );

    const selectedStudentTemplate = (student) => {
        if (!student?.user) return null;
        return (
            <div className="flex align-items-center gap-2">
                <UserAvatar user={{ name: student.user.name, image: student.user.image }} />
            </div>
        );
    };

    return (
        <div className="card flex justify-content-center">
            <Dialog
                header="Add Lesson"
                visible={visible}
                style={{ width: "30vw" }}
                onHide={() => setVisible(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="card flex flex-wrap gap-3 p-fluid">
                    {/* STUDENT */}
                    <div className="flex-auto">
                        <label className="font-bold block mb-2">Student</label>
                        <Controller
                            name="student"
                            control={control}
                            rules={{ required: "חובה לבחור תלמיד" }}
                            render={({ field }) => (
                                <Dropdown
                                    {...field}
                                    options={studentsItems}
                                    optionValue="_id"
                                    className={`w-full md:w-14rem ${errors.student ? "p-invalid" : ""}`}
                                    itemTemplate={studentItemTemplate}
                                    valueTemplate={selectedStudentTemplate}
                                />
                            )}
                        />
                        {errors.student && <small className="p-error">{errors.student.message}</small>}
                    </div>

                    {/* TITLE */}
                    <div className="flex-auto">
                        <label className="font-bold block mb-2">Title</label>
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: "נא להזין כותרת" }}
                            render={({ field }) => (
                                <InputText {...field} className={errors.title ? "p-invalid" : ""} />
                            )}
                        />
                        {errors.title && <small className="p-error">{errors.title.message}</small>}
                    </div>

                    {/* DATETIME */}
                    <Controller
                        name="datetime"
                        control={control}
                        rules={{ required: "Date and time is required" }}
                        render={({ field, fieldState }) => (
                            <div className="flex flex-column">
                                <label className="font-bold block mb-2">Date and time</label>
                                <Calendar
                                    {...field}
                                    showTime
                                    hourFormat="24"
                                    showIcon
                                    value={field.value || null}
                                />
                                {fieldState.error && (
                                    <small className="p-error">{fieldState.error.message}</small>
                                )}
                            </div>
                        )}
                    />


                    {/* RECORDING */}
                    <div className="flex align-items-center">
                        <Controller
                            name="recording"
                            control={control}
                            render={({ field }) => (
                                <ToggleButton
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.value)}
                                    style={{ width: "2rem" }}
                                />
                            )}
                        />
                        <label className="font-bold ml-2">Recording</label>
                    </div>

                    {/* MATERIAL LINK */}
                    <div className="flex-auto">
                        <label className="font-bold block mb-2">Material Link (Google Drive)</label>
                        <Controller
                            name="materials"
                            control={control}
                            rules={{
                                pattern: {
                                    value: /^https:\/\/(drive|docs)\.google\.com/,
                                    message: "הקישור חייב להיות ל-Google Drive"
                                }
                            }}
                            render={({ field }) => (
                                <InputText {...field} className={errors.materials ? "p-invalid" : ""} />
                            )}
                        />
                        {errors.materials && <small className="p-error">{errors.materials.message}</small>}
                    </div>

                    {/* SUBMIT */}
                    <Button type="submit" label="Add" icon="pi pi-check" />
                </form>
            </Dialog>
        </div>
    );
}
