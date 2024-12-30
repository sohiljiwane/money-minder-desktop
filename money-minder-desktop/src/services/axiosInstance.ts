import axios from "axios";
import responseInterceptor from "./interceptors/responseInterceptors";
import { requestInterceptor } from "./interceptors/requestInterceptor";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(
    responseInterceptor.onSuccess,
    responseInterceptor.onError
);

export default axiosInstance;
