import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

class AuthService {
  private static BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${this.BASE_URL}/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Important for handling cookies/credentials
      });

      // Store the token in localStorage or secure storage
      if (response.data.token) {
        localStorage.setItem('user_token', response.data.token);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'An error occurred during login'
        );
      }
      throw error;
    }
  }

  static logout() {
    // Remove the token from storage
    localStorage.removeItem('user_token');
    // Optionally call logout endpoint if needed
    return axios.post(`${this.BASE_URL}/auth/logout`);
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem('user_token');
  }
}

export default AuthService;