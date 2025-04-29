const getToken=()=>{
    localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTEwZThlN2Q5MDU5YTIyYTc5Y2UzOSIsImFjdGl2ZVJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzQ1OTQ4MzAzLCJleHAiOjE3NDU5ODQzMDN9.GDrnrdEdsnsFTy8CUH6O-1Ua1F8e9MXn5vADfzS-3CM")
    return localStorage.getItem("token");
}

export default getToken;