import axios from "axios";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_URL;

const clientInstance = axios.create({
  baseURL: SERVER_BASE_URL,
});

clientInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default clientInstance;
