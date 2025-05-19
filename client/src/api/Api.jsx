import axios from "axios";

const Api = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_ENDPOINT ||
    "https://cbtquestion-production.up.railway.app/api/v3/u/",
  withCredentials: true,
});

export default Api;
