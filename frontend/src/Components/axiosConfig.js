import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://quickpay-server.vercel.app/"
})

export default axiosInstance;