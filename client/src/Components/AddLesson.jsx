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
import { useEffect, useState } from "react";

const customStyles = `
    .custom-main {
        background: linear-gradient(135deg, #e4e4e6 0%, #f0f0f2 100%);
        min-height: 100vh;
        padding: 2rem 1rem;
    }
    .custom-title {
        color: #001128;
        background: linear-gradient(135deg, #001128 0%, #822b69 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 2px 4px rgba(0,0,0,0.08);
        letter-spacing: 1px;
    }
    .custom-form-container {
        background: #fff;
        border: 2px solid #e4e4e6;
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0,1,40,0.08);
        position: relative;
        overflow: hidden;
        padding: 1.5rem 1.5rem;
        max-width: 95vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 40px;
        margin-bottom: 40px;
    }
    .custom-form-container::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 4px;
        background: linear-gradient(90deg, #f0af3a 0%, #822b69 50%, #001128 100%);
    }
    .custom-label {
        color: #001128;
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        display: block;
        letter-spacing: 0.5px;
    }
    .custom-input {
        border: 2px solid #e4e4e6;
        border-radius: 12px;
        padding: 0.875rem 1rem;
        font-size: 1rem;
        transition: all 0.3s;
        background: #fff;
        color: #001128;
    }
    .custom-input:focus {
        border-color: #f0af3a;
        box-shadow: 0 0 0 3px rgba(240,175,58,0.13);
        outline: none;
    }
    .custom-input.error {
        border-color: #e74c3c;
    }
    .custom-input.error:focus {
        border-color: #e74c3c;
        box-shadow: 0 0 0 3px rgba(231,76,60,0.13);
    }
    .custom-error {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 0.25rem;
        font-weight: 500;
    }
    .custom-btn-submit {
        background: linear-gradient(135deg, #001128 0%, #822b69 100%);
        border: none;
        color: #fff;
        font-weight: 700;
        padding: 1rem 2rem;
        border-radius: 14px;
        font-size: 1.1rem;
        transition: all 0.3s;
        box-shadow: 0 6px 20px rgba(0,1,40,0.13);
        width: 100%;
        letter-spacing: 1px;
    }
    .custom-btn-submit:hover {
        background: linear-gradient(135deg, #822b69 0%, #001128 100%);
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 10px 30px rgba(0,1,40,0.18);
    }
`;

export default function AddLesson() {
    const token = useGetToken();
    const [studentsItems, setStudentsItems] = useState([]);
    const [teacher, setTeacher] = useState(null);
    const [visible, setVisible] = useState(true);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { student: null, title: "", datetime: null, recording: false, materials: "" }
    });

    useEffect(() => {
        if (!token) return;
        const fetchTeacher = async () => {
            try {
                const response = await api.get("teacher/getTeacherByToken");
                console.log("Teacher data:", response.data);
                setTeacher(response.data.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchTeacher();
    }, []);

    useEffect(() => {
        if (!token) return;
        const fetchStudents = async () => {
            try {
                const response = await api.get("teacher/getAllStudents");
                console.log("Students data:", response.data);
                setStudentsItems(response.data.data);
            } catch (error) {
                console.error("Fetch error (students):", error);
            }
        };
        fetchStudents();
    }, []);

    const onSubmit = async (data) => {
        let zoomLink = ""
        if (!teacher) {
            console.error("Teacher data is not available.");
        }
        try {
            const response = await api.post("zoom/createMeeting");
            zoomLink = response.data.data.joinUrl;
            console.log("Zoom meeting created successfully:", response);
            console.log("Zoom link:", zoomLink);
        } catch (error) {
            console.error("Zoom fetch error:", error);
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
            setVisible(false);
            //reset();
        } catch (error) {
            console.error("Lesson error:", error);
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
        <div className="card flex justify-content-center custom-main">
            <style>{customStyles}</style>
            <Dialog
                header="Schedule Meeting"
                visible={visible}
                style={{ width: "30vw" }}
                onHide={() => setVisible(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="card flex flex-wrap gap-3 p-fluid custom-form-container">
                    {/* MEMBER */}
                    <div className="flex-auto">
                        <label className="font-bold block mb-2 custom-label">Member</label>
                        <Controller
                            name="student"
                            control={control}
                            rules={{ required: "member is required" }}
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
                        {errors.student && <small className="p-error custom-error">{errors.student.message}</small>}
                    </div>

                    {/* TITLE */}
                    <div className="flex-auto">
                        <label className="font-bold block mb-2 custom-label">Meeting Title</label>
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: "Please enter a title" }}
                            render={({ field }) => (
                                <InputText {...field} className={errors.title ? "p-invalid custom-input" : "custom-input"} />
                            )}
                        />
                        {errors.title && <small className="p-error custom-error">{errors.title.message}</small>}
                    </div>

                    {/* DATETIME */}
                    <Controller
                        name="datetime"
                        control={control}
                        rules={{ required: "Date and time is required" }}
                        render={({ field, fieldState }) => (
                            <div className="flex flex-column">
                                <label className="font-bold block mb-2 custom-label">Date and Time</label>
                                <Calendar
                                    {...field}
                                    showTime
                                    hourFormat="24"
                                    showIcon
                                    value={field.value || null}
                                />
                                {fieldState.error && (
                                    <small className="p-error custom-error">{fieldState.error.message}</small>
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
                        <label className="font-bold block mb-2 custom-label">Resource Link (Google Drive)</label>
                        <Controller
                            name="materials"
                            control={control}
                            rules={{
                                pattern: {
                                    value: /^https:\/\/(drive|docs)\.google\.com/,
                                    message: "Link must be to Google Drive"
                                }
                            }}
                            render={({ field }) => (
                                <InputText {...field} className={errors.materials ? "p-invalid custom-input" : "custom-input"} />
                            )}
                        />
                        {errors.materials && <small className="p-error custom-error">{errors.materials.message}</small>}
                    </div>

                    {/* SUBMIT */}
                    <Button type="submit" label="Schedule" icon="pi pi-check" className="custom-btn-submit" />
                </form>
            </Dialog>
        </div>
    );
}