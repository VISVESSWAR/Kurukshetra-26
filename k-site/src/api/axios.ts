import axios from "axios";

const api = axios.create({
  baseURL: "https://api.kurukshetraceg.org.in", // <-- PUT GIVEN URL HERE
  withCredentials: true,
});

export default api;
