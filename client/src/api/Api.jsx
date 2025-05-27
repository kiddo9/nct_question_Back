import axios from "axios";

const Api = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_ENDPOINT ||
    "http://ec2-44-208-163-45.compute-1.amazonaws.com:3000/api/v3/u/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;
