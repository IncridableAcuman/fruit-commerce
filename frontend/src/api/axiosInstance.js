import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // refresh token cookie uchun
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axiosInstance.get("/auth/refresh"); // cookie bilan yuboradi
        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance.request(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        toast.error("Session expired. Please login again.");
        console.log(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
