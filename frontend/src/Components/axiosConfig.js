import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://payze-server.vercel.app"
})

export default axiosInstance;