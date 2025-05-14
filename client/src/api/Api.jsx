import axios from "axios";

let firstDomain = "https://cbtquestion-production.up.railway.app/api/v3/u/";

const Api = axios.create({
  baseURL: firstDomain,
  withCredentials: true,
});

export default Api;
