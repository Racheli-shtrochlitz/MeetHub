export const CustomerService = {

    async getData(token) {
        console.log("CustomerService111:  " , token);
        const response = await fetch("http://localhost:3000/user/getAllLessons", {

            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        console.log("CustomerService token: ",token)
        console.log("CustomerService response:  ", response);

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

    async getCustomersSmall(token) {
        const data = await this.getData(token);
        return data.slice(0, 10);
    },

    async getCustomersMedium(token) {
        const data = await this.getData(token);
        console.log("getCustomersMedium:  ", data);

        return data.slice(0, 20);
    },

    async getCustomersLarge(token) {
        const data = await this.getData(token);
        return data.slice(0, 100);
    },

    async getCustomersXLarge(token) {
        const data = await this.getData(token);
        return data.slice(0, 200);
    },

    async getCustomers(params) {
        const queryParams = params
            ? Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')
            : '';

        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
        //return await this.getData(token);
    }
};
