import { InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "../auth/tokenService";

export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Get the access token from storage
    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/json';

    if (config.method === 'get') {
        config.params = {
            ...config.params,
            _t: Date.now(),
        };
    }

    return config;
};