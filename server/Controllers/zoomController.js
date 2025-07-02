const axios = require("axios");
require("dotenv").config();

async function getAccessToken() {
    const { CLIENT_ID, CLIENT_SECRET, ACCOUNT_ID } = process.env;
    if (!CLIENT_ID || !CLIENT_SECRET || !ACCOUNT_ID) {
        throw new Error("Missing required environment variables.");
    }

    const token = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

    try {
        const response = await axios.post(
            `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ACCOUNT_ID}`,
            {},
            {
                headers: {
                    Authorization: `Basic ${token}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error("Error getting access token:", error.response?.data || error.message);
        throw error;
    }
}

const createMeeting=async (req,res)=> {
    try {
        const token = await getAccessToken();

        const response = await axios.post(
            "https://api.zoom.us/v2/users/me/meetings",
            {
                topic: "My Meeting",
                type: 1,
                settings: {
                    join_before_host: true,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.status(200).json({data:{meetingId: response.data.id, joinUrl: response.data.join_url, startUrl: response.data.start_url},
             message: "Meeting created successfully!"});
    } catch (error) {
        console.error("Error creating meeting:", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to create Zoom meeting" });
    }
};

module.exports={
    createMeeting
}