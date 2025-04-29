import { createSlice } from "@reduxjs/toolkit"
const initialValue = {
    name: "",
     email: "",
    activeRole: "",
    isAuthenticated: false
}

const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        setUserDetails: (state, action) => {
            const { name, activeRole,email } = action.payload
            state.name = name
            state.email=email
            state.activeRole = activeRole
            state.isAuthenticated = true
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






