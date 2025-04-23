export const CustomerService = {
    async getData() {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDkwM2U5YjgxNDc3YzU4NGNmM2MwZSIsImFjdGl2ZVJvbGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNzQ1NDIxMjg5LCJleHAiOjE3NDU0NTcyODl9.Rp9vfE3Lz8lg0F59yBmX7Ss0eXfcSdVVrOk2Z6BE69w";
        const response = await fetch("http://localhost:3000/student/getAllStudents", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);

        return data;
    },

    async getCustomersSmall() {
        const data = await this.getData();
        console.log(data);
        return data.slice(0, 10);    },

    async getCustomersMedium() {
        const data = await this.getData();
        console.log(data);
        return data.slice(0, 20);
    },

    async getCustomersLarge() {
        const data = await this.getData();
        console.log(data);
        return data.slice(0, 100);    },

    async getCustomersXLarge() {
        const data = await this.getData();
        console.log(data);
        return data.slice(0, 200);    },

    async getCustomers(params) {
        const queryParams = params
            ? Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')
            : '';

        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
        //return await this.getData();
    }
};
