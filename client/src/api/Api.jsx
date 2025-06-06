import axios from "axios";

const Api = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_ENDPOINT ||
    "https://cbtquestionbank.publicvm.com/api/v3/u",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;
