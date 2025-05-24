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
            state.user = action.payload
        },

        logOut: () => initialValue,

        setActiveRole: (state, action) => {
            state.activeRole = action.payload;
        },
    }
})

export const { setUserDetails, logOut, setActiveRole } = userSlice.actions
export default userSlice.reducer






