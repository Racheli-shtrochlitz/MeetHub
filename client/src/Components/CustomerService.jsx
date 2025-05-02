export const CustomerService = {
    
    async getData(token) {
        console.log("CustomerService:  " +token);
        const token2=token||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTM3MzdjY2MxNTdhNjJkN2EyMWY5NyIsImFjdGl2ZVJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzQ2MTA1MjEzLCJleHAiOjE3NDYxNDEyMTN9.nS8fFOOOa3gJcOlyQzHvo3kUYVPv44DKqo2Z-bEDi_8";
        const response = await fetch("http://localhost:3000/student/getAllStudents", {

            method: "GET",
            headers: {
                "Authorization": `Bearer ${token2}`,
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        //console.log(data);

        return data;
    },

    async getCustomersSmall() {
        const data = await this.getData();
       // console.log(data);
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
