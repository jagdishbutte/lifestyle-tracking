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

const token = localStorage.getItem("token");

// console.log(token)

export const apiConnector = async <T>(
    method: Method,
    url: string,
    data?: unknown,
    params?: object,
    headers?: Record<string, string>,
) => {
    const config: AxiosRequestConfig = {
        method,
        url,
        data,
        params,
        headers: {
            ...headers,
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
        },
    };

    return await axiosInstance<T>(config);

};