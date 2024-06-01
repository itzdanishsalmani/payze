import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:7000/api/v1/"
})

export default axiosInstance;