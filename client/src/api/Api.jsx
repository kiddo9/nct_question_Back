import axios from "axios";

const Api = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_ENDPOINT ||
    "https://qbank.nct.publicvm.com/api/v3/u",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;
