import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CustomerService } from './CustomerService';
import useGetToken from '../Hooks/useGetToken';
import useUser from '../Hooks/useUser';


export default function CustomDateFilterDemo() {
    const [customers, setCustomers] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        subject: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const token = useGetToken();
    const user = useUser();

    useEffect(() => {
        if (!token || !user?.activeRole) return;
        CustomerService.getCustomersMedium(token).then((data) => {
            setCustomers(getCustomers(data));
        });
    }, [user, token]);

    const getCustomers = (data) => {
        console.log("user from store: ", user);

        console.log("activeRole: ", user?.activeRole)
        return [...(data || [])].map((d) => ({
            ...d,
            id: d._id || d.id,
            date: new Date(d.lessonDate),
            subject: d.subject || '',
            userDisplay:
                user.activeRole === 'teacher'
                    ? `${d.student.user.name}`
                    : `${d.teacher.user.name}`,
            attachments: d.attachments,
            recordingUrl: d.recordingUrl || '',
            zoomLink: d.zoomLink || '',
        }));
    };

    return (
        <div className="card">
            <DataTable value={customers} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row"
                emptyMessage="No lessons found.">
                <Column field="date" header="Date" body={(rowData) => rowData.date?.toLocaleString() || '—'} style={{ minWidth: '12rem' }} />
                <Column field="subject" header="Subject" filter filterPlaceholder="Search by subject" style={{ minWidth: '12rem' }} />
                <Column field="userDisplay" header={user?.activeRole === 'teacher' ? "Student" : "Teacher"} body={(rowData) => rowData.userDisplay || '—'} style={{ minWidth: '12rem' }} />
                <Column header="Attachments" body={(rowData) =>
                    rowData.attachments
                        ? <a href={rowData.attachments} target="_blank" rel="noreferrer">Open Folder</a>
                        : '—'} style={{ minWidth: '12rem' }} />
                <Column header="Recording" body={(rowData) =>
                    rowData.recordingUrl
                        ? <a href={rowData.recordingUrl} target="_blank" rel="noreferrer">View</a>
                        : '—'} style={{ minWidth: '10rem' }} />
                <Column
                    header="Start Lesson"
                    body={(rowData) => {
                        const now = new Date();
                        const lessonTime = new Date(rowData.date);
                        const timeDiff = (lessonTime - now) / (1000 * 60);
                        const canStart = timeDiff <= 30 && timeDiff >= -180;
                        return (
                            <Button
                                label="Start"
                                disabled={!canStart}
                                className="p-button-sm"
                                style={{
                                    backgroundColor: canStart ? 'var(--purple)' : '#d3d3d3',
                                    opacity: canStart ? 1 : 0.5,
                                    pointerEvents: canStart ? 'auto' : 'none',
                                    cursor: canStart ? 'pointer' : 'not-allowed'
                                }}
                                onClick={() => {
                                    if (canStart) {
                                        
                                        console.log('Starting lesson...');
                                        window.open(rowData.zoomLink, '_blank');
                                    }
                                }}
                            />
                        );
                    }}
                    style={{ minWidth: '10rem' }}
                />

            </DataTable>
        </div>
    );
}
