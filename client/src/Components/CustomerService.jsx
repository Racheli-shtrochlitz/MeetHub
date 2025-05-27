import api from "../Services/api";

export const CustomerService = {

    async getData() {
        console.log("Fetching lessons data...");
        const response = await api.get('user/getAllLessons');
        console.log("Fetched lessons response:", response);
        const data = response.data.data;
        return data;
    },

    async getUsers(user) {
        const data =await this.getData();
        if (user.activeRole === 'teacher') {
            return data.map(u => u.student).filter(Boolean);

        }
        return data.map(u => u.teacher).filter(Boolean);
    }
};
