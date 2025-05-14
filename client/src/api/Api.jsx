import axios from "axios";

//let firstDomain = "https://cbtquestion-production.up.railway.app/api/v3/u/";

const Api = axios.create({
  baseURL: "https://nctquestionback-production.up.railway.app/api/v3/u/",
  withCredentials: true,
});

export default Api;
