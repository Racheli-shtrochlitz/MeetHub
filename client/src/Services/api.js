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

// פונקציה שמחליפה טקסטים של מורה/תלמיד ל-Host/Member
function replaceTeacherStudent(text) {
  if (!text || typeof text !== "string") return text;
  return text
    .replace(/teacher/gi, "host")
    .replace(/student/gi, "member")
    .replace(/Teacher/gi, "Host")
    .replace(/Student/gi, "Member")
    .replace(/lesson/gi, "meeting")
    .replace(/lessons/gi, "meetings")
    .replace(/Lesson/gi, "Meeting")
    .replace(/Lessons/gi, "Meetings")
}

api.interceptors.response.use(
  (response) => {
    const isGet = response.config.method?.toLowerCase() === 'get';
    if (!isGet && response?.data?.message) {
      showToast({
        severity: 'success',
        summary: 'Success',
        detail: replaceTeacherStudent(response.data.message),
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
    showToast({
      severity: 'error',
      summary: 'Error',
      detail: replaceTeacherStudent(error.response?.data?.message || 'Something went wrong'),
      life: 3000,
    });

    return Promise.reject(error);
  }
);

export default api;
