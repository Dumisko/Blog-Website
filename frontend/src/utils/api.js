import axios from "axios";

const api = axios.create({
  baseURL: "https://blog-website-ykxv.onrender.com/api",
});

export default api;
