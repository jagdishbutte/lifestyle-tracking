import axios, { type AxiosRequestConfig, type Method } from "axios";
import { BASE_URL } from "./apiConnection";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

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
        headers,
    };

    return axiosInstance<T>(config);
};