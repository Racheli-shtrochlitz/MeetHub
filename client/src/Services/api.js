import axios from 'axios';

let toast = null;

export const setToastInstance = (toastRef) => {
  toast = toastRef;
};

export const showToast = (options) => {
  toast?.current?.show(options);
};

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
function toShow(response){
    const isGet = response.config.method?.toLowerCase() === 'get';
    return !isGet && (response?.data?.message || response?.status != 200);
}
api.interceptors.response.use(
  (response) => {
    if (toShow(response)) {
      showToast({
        severity: 'success',
        summary: 'Success',
        detail: response.data.message,
        life: 2000,
      });
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    if (toShow(error.response))
      showToast({
        severity: 'error',
        summary: 'Error',
        detail: error.response?.data?.message || 'Something went wrong',
        life: 3000,
      });

    return Promise.reject(error);
  }
);

export default api;
