
export const CustomerService = {

    async getData(token) {
        const response = await fetch("http://localhost:3000/user/getAllLessons", {

            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.log(response)
            return [

            ]
                ;
        }
        const data = await response.json();
        console.log("CustomerService:  ", data);
        return data;
    },

    async getUsers(user,token) {
        const data =await this.getData(token);
        if (user.activeRole === 'teacher') {
            return data.map(u => u.student).filter(Boolean);

        }
        return data.map(u => u.teacher).filter(Boolean);
    }
};
