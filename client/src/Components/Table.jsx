import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CustomerService } from './CustomerService';
import useGetToken from '../Hooks/useGetToken';
import useUser from '../Hooks/useUser';
import { MultiSelect } from 'primereact/multiselect';
import UserAvatar from '../Components/UserAvatar';
import { FaTrash } from 'react-icons/fa';
import { Toast } from 'primereact/toast';
import api from '../Services/api';




export default function CustomDateFilterDemo() {

    const toast = useRef(null);
    const [customers, setCustomers] = useState([]);
    const [users, setusers] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        subject: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        userId: { value: null, matchMode: FilterMatchMode.IN },
    });

    const user = useUser();

    const userBodyTemplate = (rowData) => <UserAvatar user={rowData.user} />;
    const usersItemTemplate = (option) => <UserAvatar user={option} />;


    useEffect(() => {
        if (!user?.activeRole) return;
        CustomerService.getData().then((data) => {
            setCustomers(getCustomers(data));
        });
    }, [user]);

    useEffect(() => {
        if (!user?.activeRole) return;

        const fetchusers = async () => {
            const users = await CustomerService.getUsers(user);
            const mapped = users.map(u => ({
                id: u.user?._id,
                name: u.user?.name,
                image: u.user?.image
            }));

            // סינון כפילויות ל
            const unique = [];
            const seen = new Set();

            for (const u of mapped) {
                if (u.id && !seen.has(u.id)) {
                    seen.add(u.id);
                    unique.push(u);
                }
            }

            setusers(unique);
        };

        fetchusers();
    }, [user]);



    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            const relevantUser = user.activeRole === 'teacher' ? d.student.user : d.teacher.user;
            return {
                ...d,
                id: d._id || d.id,
                date: new Date(d.lessonDate),
                title: d.title || '',
                userDisplay: relevantUser.name,
                user: {
                    name: relevantUser.name,
                    image: relevantUser.image
                },
                userId: relevantUser._id,
                userName: relevantUser.name,
                attachments: d.attachments,
                recordingUrl: d.recordingUrl || '',
                zoomLink: d.zoomLink || '',
            };
        });
    };


    const userRowFilterTemplate = (options) => {
        return (
            <MultiSelect
                value={options.value}
                options={users}
                itemTemplate={usersItemTemplate}
                onChange={(e) => {
                    setFilters((prev) => ({
                        ...prev,
                        userId: { value: e.value, matchMode: FilterMatchMode.IN }
                    }));
                }}
                optionLabel="name"
                optionValue="id"
                placeholder="Any"
                className="p-column-filter"
                maxSelectedLabels={1}
                style={{ minWidth: '14rem' }}
            />
        );
    };

    const handleDelete = async (lesson) => {
        if (window.confirm('Are you sure you want to delete this lesson?')) {

            try {
                console.log(lesson.id)
                const response = await api.delete(`lesson/deleteLesson/${lesson.id}`);
                console.log(response)
                toast.current.show({
                    severity: 'success',
                    summary: 'Successful Delete',
                    detail: 'Lesson Deleted Successfuly',
                    life: 3000
                });
                setCustomers(prev => prev.filter(l => l.id !== lesson.id));

            }
            catch (err) {
                toast.current.show({
                    severity: 'error',
                    summary: 'Delete Failed',
                    detail: err.message,
                    life: 3000
                });
            }
        }
    };

    return (
        <div className="card">
            <DataTable
                value={customers}
                paginator
                rows={10}
                dataKey="id"
                filters={filters}
                filterDisplay="row"
                emptyMessage="No meetings found."
                sortField="date"
                sortOrder={-1}
            >
                <Column field="date" header="Date" body={(rowData) => rowData.date?.toLocaleString() || '—'} style={{ minWidth: '12rem' }} />
                <Column field="title" header="Meeting Title" filter filterPlaceholder="Search by title" style={{ minWidth: '12rem' }} />

                <Column
                    header={user?.activeRole === 'teacher' ? 'Member' : 'Host'}
                    filterField="userId"
                    showFilterMenu={false}
                    filterMenuStyle={{ width: '14rem' }}
                    style={{ minWidth: '14rem' }}
                    body={userBodyTemplate}
                    filter
                    filterElement={userRowFilterTemplate}
                />

                <Column header="Attachments" body={(rowData) =>
                    rowData.attachments
                        ? <a href={rowData.attachments} target="_blank" rel="noreferrer">Open Folder</a>
                        : '—'} style={{ minWidth: '12rem' }} />

                <Column header="Recording" body={(rowData) =>
                    rowData.recordingUrl
                        ? <a href={rowData.recordingUrl} target="_blank" rel="noreferrer">View</a>
                        : '—'} style={{ minWidth: '10rem' }} />

                <Column
                    header="Start Meeting"
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
                                        window.open(rowData.zoomLink, '_blank');
                                    }
                                }}
                            />
                        );
                    }}
                    style={{ minWidth: '10rem' }}
                />

                <Column
                    body={(rowData) => (
                        <Button
                            icon={<FaTrash />}
                            className="p-button-rounded p-button-text"
                            onClick={() => handleDelete(rowData)}
                            tooltip="Delete Meeting"
                            tooltipOptions={{ position: 'top' }}
                            style={{ color: 'var(--blue)' }}
                        />
                    )}
                    style={{ width: '3rem', textAlign: 'center' }}
                />

            </DataTable>
            <Toast ref={toast} />

        </div>
    );
}
