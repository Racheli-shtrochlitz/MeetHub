import { createSlice } from "@reduxjs/toolkit"
const initialValue = {
        name: "",
        email: "",
       activeRole: "",
       //isAuthenticated: false
}

const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload
        },
        logOut: () => initialValue
        // setActiveRole: (state, action) => {
        //     state.activeRole = action.payload.activeRole;
        // },
        // getActiveRole: (state) => {
        //     return state.activeRole;
        // },
    }
})

export const { setUserDetails, logOut } = userSlice.actions
export default userSlice.reducer






