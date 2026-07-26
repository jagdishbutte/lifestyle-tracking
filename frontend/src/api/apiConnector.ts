import axios, {
    type AxiosRequestConfig,
    type Method,
} from "axios";
import { BASE_URL } from "./apiConnection";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type":"application/json",
    }
});

export const apiConnector = async <T>(
    method: Method,
    url: string,
    data?: unknown,
    params?: object,
    headers?: object
) => {
    const config: AxiosRequestConfig = {
        method,
        url,
        data,
        params,
        headers,
    };

    return await axiosInstance<T>(config);

};