import axios from "axios";

const api = axios.create({
    baseURL: "https://api-dados-climaticos.herokuapp.com/"
});

export default api;