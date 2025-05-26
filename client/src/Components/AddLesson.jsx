import { ToggleButton } from 'primereact/togglebutton';
import { Calendar } from "primereact/calendar";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import useGetToken from '../Hooks/useGetToken';
import UserAvatar from '../Components/UserAvatar';
import api from "../Services/api";
import { InputText } from "primereact/inputtext";
import { useForm } from 'react-hook-form';
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

export default function AddLesson() {
    const token = useGetToken();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { student: null, title: 'lesson', dateAndTime: null, recording: false, materialLink: '' },
    });

    const [studentsItems, setStudentsItems] = useState(["temp", "demo"]);
    const [visible, setVisible] = useState(true);
    const [teacher, setTeacher] = useState(null);
    //get students for options in form
    useEffect(() => {
        console.log("studentsItems:", studentsItems);
    }, [studentsItems]);
    //get current teacher for lesson object
    useEffect(() => {
        if (!token) return;
        const fetchTeacher = async () => {
            try {
                const response = await api.get('teacher/getTeacherByToken');
                setTeacher(response.data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchTeacher();
    }, [token]);
    //get zoom link for lesson object and create lesson
    async function sendToServer(data) {
        if (!teacher) return;
        let zoomLink;
        try {
            const response = await api.post('zoom/createMeeting');
            const data = response.data;
            zoomLink = data.joinUrl;
        } catch (error) {
            console.error('Zoom fetch error:', error);
        }
        try {
            await api.post('lesson/addLesson', {
                lesson: {
                    teacher: teacher?._id,
                    student: data.student,
                    lessonDate: data.dateAndTime.toISOString(),
                    title: data.title,
                    recording: data.recording,
                    materials: data.materialLink,
                    zoomLink: zoomLink
                }
            });
        } catch (error) {
            console.error('Lesson fetch error:', error);
        }
    }
    //get all student ,in page load time 
    useEffect(() => {
        if (!token) return;
        getAllStudents().then((data) => setStudentsItems(data));
    }, []);

    const getAllStudents = async () => {
        try {
            const response = await api.get('teacher/getAllStudents');
            return response.data;
        } catch (error) {
            console.error(`Fetch error getAllStudents:`, error);
            return [];
        }
    };


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

    return (
        <div className="card flex justify-content-center">
            <form onSubmit={handleSubmit((data) => {
                if (!teacher?._id) {
                    alert("Teacher not loaded yet.");
                    return;
                }
                sendToServer(data);
                setVisible(false);
            })}>
                <Dialog header="add lesson" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)}>
                    <div className="card flex flex-wrap gap-3 p-fluid">
                        <div className="flex-auto">

                            <label htmlFor="buttondisplay" className="font-bold block mb-2">
                                student
                            </label>
                            <Controller
                                name="student"
                                control={control}
                                rules={{ required: true }}
                                render={({ field, fieldState }) => (
                                    <Dropdown
                                        {...field}
                                        options={studentsItems || []}
                                        optionValue="_id"
                                        className={`w-full md:w-14rem ${fieldState.invalid ? 'p-invalid' : ''}`}
                                        itemTemplate={studentItemTemplate}
                                        valueTemplate={selectedStudentTemplate}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex-auto">
                            <label htmlFor="buttondisplay" className="font-bold block mb-2">
                                title
                            </label>
                            <InputText {...register("title", { required: true })} />
                        </div>
                        <div className="flex-auto">
                            <label htmlFor="buttondisplay" className="font-bold block mb-2">
                                date and time
                            </label>
                            <Calendar {...register("datAndTime", { required: true })} showTime hourFormat="24" showIcon />
                        </div>
                        <div className="flex align-items-center">
                            <Controller
                                name="recording"
                                control={control}
                                rules={{ required: true }}
                                render={({ field, fieldState }) => (
                                    <ToggleButton
                                        {...field}
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        style={{ width: '2rem' }}
                                        className={`w-8rem ${fieldState.invalid ? 'p-invalid' : ''}`}
                                    />
                                )}
                            />
                            <label htmlFor="buttondisplay" className="font-bold block mb-2">
                                recording
                            </label>
                        </div>

                        <div className="flex-auto">
                            <label htmlFor="buttondisplay" className="font-bold block mb-2">
                                material link (in drive)
                            </label>
                            <InputText {...register("materialLink", { required: true })} />
                        </div>
                        <Button
                            label="Ok"
                            type="submit"
                            icon="pi pi-check"
                            autoFocus
                        />
                    </div>
                </Dialog>
            </form>
        </div>
    );
}
