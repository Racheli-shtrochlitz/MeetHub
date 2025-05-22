import React from 'react';

const ZoomMeetingButton = () => {
    const createMeeting = async () => {
        try {
            const response = await api.post('zoom/createMeeting/123');
            const data = response.data;
            console.log("Meeting created:", data);
            window.open(data.joinUrl, "_blank"); // פותח את הפגישה בלשונית חדשה
        } catch (error) {
            console.error("Error creating meeting", error);
        }
    };

    return (
        <button onClick={createMeeting}>
            Start Zoom Meeting
        </button>
    );
};

export default ZoomMeetingButton;
