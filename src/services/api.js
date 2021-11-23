import axios from "axios";

const api = axios.create({
    baseURL: "http://198.100.155.70:8080/"
});

export default api;