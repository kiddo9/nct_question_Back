import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ENDPOINT,
  withCredentials: true,
});

export default Api;
