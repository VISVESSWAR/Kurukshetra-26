import axios from "axios";

const api = axios.create({
  baseURL: "https://api.kurukshetraceg.org.in/api/v1", // <-- PUT GIVEN URL HERE
  withCredentials: true,
});

export default api;
