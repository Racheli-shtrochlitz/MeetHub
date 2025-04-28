import {createSlice} from "@reduxjs/toolkit"
const initialValue = {
    name: "",
    // email: "",
    activeRole:"",
    isAuthenticated:false
}

const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers:{
        Login: (state, action)=>{
                fetch('http://localhost:5000/user/signIn', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: {
                        name:action.pylaod.name,
                        email:action.payload.email,
                        password:action.payload.password,
                        role:action.payload.role,
                    },
                })
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error('Network response was not ok' + res.error);
                        }
                        return res.json()
                    })
                    .then(response => {
                        console.log(response);
                        if (response.token) {
                            localStorage.setItem('token', response.token);
                            state.name = action.payload.name;
                            state.activeRole = action.payload.role;
                            // state.email = action.payload.email;
                            state.isAuthenticated = true;
                            return true;
                        }
                        else {
                            console.log(response.message);
                        }
                    })
                    .catch((error) => {
                        console.error('There was a problem with the fetch operation:', error);
                    })
            return false;
        },
        setActiveRole: (state, action) => {
            state.activeRole = action.payload.activeRole;
        },
        getActiveRole: (state) => {
            return state.activeRole;
        },
    }
})

export const {Login, Logout,setActiveRole, getActiveRole} = userSlice.actions
export default userSlice.reducer






