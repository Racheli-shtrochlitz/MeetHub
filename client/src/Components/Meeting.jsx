import React from 'react';

const ZoomMeetingButton = () => {
    const createMeeting = async () => {
        console.log("create metting!!!")
        try {
            const response = await fetch("http://localhost:3000/zoom/createMeeting/123", {
                method: "POST",
            });
            const data = await response.json();
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
