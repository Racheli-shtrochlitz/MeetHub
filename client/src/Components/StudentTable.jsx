import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import api from '../Services/api';

export default function MemberTable() {
    const [members, setMembers] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await api.get('/teacher/getAllStudents');
                const data = response.data.data || [];
                const formatted = data.map((s) => ({
                    id: s._id,
                    name: s.user.name || '—',
                    email: s.user.email || '—',
                }));
                setMembers(formatted);
            } catch (err) {
                console.error('Failed to fetch members:', err);
            }
        };

        fetchMembers();
    }, []);

    const header = (
        <div className="table-header" style={{ width: '100%' }}>
            <h2>Members</h2>
        </div>
    );

    return (
        <div className="card" style={{ width: '100%' }}>
            <DataTable
                value={members}
                paginator
                rows={10}
                dataKey="id"
                filters={filters}
                filterDisplay="row"
                emptyMessage="No members found."
                header={header}
                style={{ width: '100%' }}
            >
                <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                <Column field="email" header="Email" filter filterPlaceholder="Search by email" style={{ minWidth: '14rem' }} />
            </DataTable>
        </div>
    );
    
}
