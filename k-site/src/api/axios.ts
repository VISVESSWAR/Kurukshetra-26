import axios from "axios";

const api = axios.create({
  baseURL: "https://your-backend-domain.org.in", // <-- PUT GIVEN URL HERE
  withCredentials: true,
});

export default api;
