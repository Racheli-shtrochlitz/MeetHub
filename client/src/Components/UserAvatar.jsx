// components/UserAvatar.jsx
import React from 'react';

const getRandomColor = (name) => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#009688', '#4caf50', '#ff9800', '#795548'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
};

const UserAvatar = ({ user }) => {
    const hasImage = !!user?.image;
    const bgColor = getRandomColor(user?.name || '');
    const firstLetter = user?.name?.charAt(0)?.toUpperCase() || '?';

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

export default UserAvatar;
