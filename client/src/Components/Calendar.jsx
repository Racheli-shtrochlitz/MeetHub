import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CustomerService } from './CustomerService';
import useGetToken from '../Hooks/useGetToken';
import useUser from '../Hooks/useUser';
import { useEffect, useState } from 'react';

export default function MyCalendar() {

    const token = useGetToken();
    const user = useUser();

    const [events, setEvents] = useState([]);

    useEffect(() => {
        if(!user||!token) return;
        CustomerService.getData(token).then((data) => {
            const calendarEvents = getCustomers(data).map((lesson) => ({
                id: lesson.id,
                title: `${lesson.name} - ${lesson.subject}`,
                start: lesson.date,
                allDay: true
            }));
            setEvents(calendarEvents);
        });
    }, [token, user])




    const getCustomers = (data) => {
        return [...(data.lessons || [])].map((d) => {
            const relevantUser = user.activeRole === 'teacher' ? d.student.user : d.teacher.user;
            return {
                ...d,
                id: d._id || d.id,
                date: new Date(d.lessonDate),
                subject: d.subject || '',
                name: relevantUser.name
            };
        });
    };


    return (
        <div className="p-4">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                height="auto"
                 eventColor="var(--purple)" 
            />
        </div>
    );
}
