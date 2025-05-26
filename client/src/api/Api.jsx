import axios from "axios";

const Api = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_ENDPOINT ||
    "http://ec2-16-170-220-241.eu-north-1.compute.amazonaws.com/api/v3/u/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;
