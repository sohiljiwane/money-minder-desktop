import axios, { AxiosError, AxiosResponse } from "axios";
import { refreshAccessToken } from "../auth/tokenService";

const responseInterceptor = {
    onSuccess: (response: AxiosResponse) => {
        // Log Successful Response
        console.log("API Response: ", {
            url: response.config.url,
            method: response.config.method,
            status: response.status,
        });

        return response;
    },

    onError: async (error: AxiosError) => {
        const originalRequest = error.config;

        // Check if it's an unauthorized error (token expired)
        if (error.response?.status === 401) {
            try {
                // TO DO: Add code for refresh token
                const newToken = await refreshAccessToken();

                // Update the original request with the new token.
                if (originalRequest?.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                }

                // Retru the original request
                return axios;
            } catch (refreshError) {
                // If token refresh fails, log out the user
                // You might want to redirect to login or dispatch a logout call.
                console.log('Token refresh failed', refreshError);

                // Programatic logout
                return Promise.reject(error);
            }
        }

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            switch (error.response.status) {
                case 400:
                    console.log("Bad Request", error.response.data);
                    break;
                case 403:
                    console.log("Forbidden", error.response.data);
                    break;
                case 404:
                    console.log("Not Found", error.response.data);
                    break;
                case 500:
                    console.log("Internal Server Error", error.response.data);
                    break;
                default:
                    console.log("Something went wrong", error.response.data);
                    break;
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received: ', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request: ', error.message);
        }

        // Always return a rejected promise to allow catching errors
        return Promise.reject(error);
    }
}

export default responseInterceptor;