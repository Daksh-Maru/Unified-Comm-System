import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000", // Ensure this is your backend URL
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
