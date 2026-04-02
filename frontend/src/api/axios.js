import axios from "axios";

const API = axios.create({
  baseURL: "https://social-app-csld.onrender.com"
});

export default API;
