import axios from "axios";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_URL;

const clientInstance = axios.create({
  baseURL: SERVER_BASE_URL,
});

export default clientInstance;
