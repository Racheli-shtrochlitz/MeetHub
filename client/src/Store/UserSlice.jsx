// src/Store/UserSlice.js

import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    name: "",
    email: "",
    activeRole: "",
}

const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        setUserDetails: (state, action) => {
            // מפזר את הערכים לתוך הסטייט הראשי
            state.email = action.payload.email;
            state.activeRole = action.payload.activeRole;
            state.name = action.payload.name || ""; // אם יש שם, אחרת שומר ריק
        },

        logOut: () => initialValue,

        setActiveRole: (state, action) => {
            state.activeRole = action.payload;
        },
    }
})

export const { setUserDetails, logOut, setActiveRole } = userSlice.actions
export default userSlice.reducer
