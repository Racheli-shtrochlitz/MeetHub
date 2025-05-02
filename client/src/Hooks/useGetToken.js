const getToken=()=>{
    localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTM3MzdjY2MxNTdhNjJkN2EyMWY5NyIsImFjdGl2ZVJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzQ2MTA1MjEzLCJleHAiOjE3NDYxNDEyMTN9.nS8fFOOOa3gJcOlyQzHvo3kUYVPv44DKqo2Z-bEDi_8")
    return localStorage.getItem("token");
}

export default getToken;