export const CustomerService = {
    async getData() {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGU0OWJkN2NkNmY1ZmFjNzRiYWVhZSIsImFjdGl2ZVJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzQ1NzY2ODQ1LCJleHAiOjE3NDU4MDI4NDV9.UM6k3K2DtTYeq8WxXu1L3R5kd5t9aYlxXO_10u2wiDM";
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
