import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CustomerService } from './CustomerService';
import useGetToken from '../Hooks/useGetToken';
import useUser from '../Hooks/useUser';
import { MultiSelect } from 'primereact/multiselect';



export default function CustomDateFilterDemo() {
    const [customers, setCustomers] = useState([]);
    const [users, setusers] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        subject: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        userId: { value: null, matchMode: FilterMatchMode.IN },
    });
    const token = useGetToken();
    const user = useUser();

    useEffect(() => {
        if (!token || !user?.activeRole) return;
        CustomerService.getCustomersMedium(token).then((data) => {
            setCustomers(getCustomers(data));
        });
    }, [user, token]);

    useEffect(() => {
        if (!token || !user?.activeRole) return;

        const fetchusers = async () => {
            const users = await CustomerService.getUsers(user, token);
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
    }, [user, token]);



    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            const relevantUser = user.activeRole === 'teacher' ? d.student.user : d.teacher.user;
            return {
                ...d,
                id: d._id || d.id,
                date: new Date(d.lessonDate),
                subject: d.subject || '',
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

    const getRandomColor = (name) => {
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#009688', '#4caf50', '#ff9800', '#795548'];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };

    const renderUserAvatar = (user) => {
        const hasImage = !!user.image;
        const bgColor = getRandomColor(user.name);
        const firstLetter = user.name?.charAt(0)?.toUpperCase() || '?';

        return (
            <div className="flex align-items-center gap-2">
                {hasImage ? (
                    <img
                        alt={user.name}
                        src={`https://primefaces.org/cdn/primereact/images/avatar/${user.image}`}
                        width="32"
                        height="32"
                        style={{ borderRadius: '50%' }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '';
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: bgColor,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                        }}
                    >
                        {firstLetter}
                    </div>
                )}
                <span>{user.name}</span>
            </div>
        );
    };

    const userBodyTemplate = (rowData) => renderUserAvatar(rowData.user);

    const usersItemTemplate = (option) => renderUserAvatar(option);
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
    




    return (
        <div className="card">
            <DataTable value={customers} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row"
                emptyMessage="No lessons found." sortField="date"
                sortOrder={-1}>
                <Column field="date" header="Date" body={(rowData) => rowData.date?.toLocaleString() || '—'} style={{ minWidth: '12rem' }} />
                <Column field="subject" header="Subject" filter filterPlaceholder="Search by subject" style={{ minWidth: '12rem' }} />

                <Column
                    header="User"
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
