import axios from "axios";
import { localStorageService } from "../storage/localStorageService";

export const getAccessToken = (): string | null => {
    return localStorageService.getItem('accessToken');
}

export const setAccessToken = (token: string): void => {
    localStorageService.setItem('accessToken', token);
}

export const refreshAccessToken = async (): Promise<string> => {
    try {
        // TO DO: Add code for refresh token API
        const refreshToken = localStorageService.getItem('refreshToken');
        const response = await axios.post('/auth/refresh', {
            refreshToken
        });

        const { accessToken } = response.data;

        setAccessToken(accessToken);

        return accessToken;
    } catch (error) {
        throw error;
    }
}