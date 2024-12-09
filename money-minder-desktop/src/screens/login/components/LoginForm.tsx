import React, { ChangeEvent, FormEvent, useState } from "react";
import SubmitButton from "./SubmitButton";
import TermsAndConditions from "./TermsAndConditions";

// Simple authentication service using only axios
export const authService = {
  async login(email: string, password: string) {
    try {
      console.log("Starting API call.");
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('user_token', data.token);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
};

interface LoginFormData {
  email: string,
  password: string
};

const initialLoginFormData: LoginFormData = {
  email: "",
  password: ""
};

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>(initialLoginFormData);

  const [showValidation, setShowValidation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {id, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setShowValidation(true);
    setError(null);

    const errors = [];
    if (!formData.email) {
      errors.push("Please enter an email id.");
    }
    if (!formData.password) {
      errors.push("Please enter a password");
    }
    if (errors.length > 0) {
      console.log(errors);
      return;
    }

    try {
      const userData = await authService.login(formData.email, formData.password);
      // On successful login, you might want to:
      // 1. Store user data
      // 2. Redirect to dashboard
      // 3. Update application state
      console.log('Login successful', userData);
      
      // Simulating navigation (replace with your actual navigation logic)
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-4 text-red-500 text-sm">
          {error}
        </div>
      )}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          id="email"
          type="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        {showValidation && !formData.email && (
          <p className="text-xs italic text-red-500">
            Please enter an email address.
          </p>
        )}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        {showValidation && !formData.password && (
          <p className="text-xs italic text-red-500">
          Please enter a password.
        </p>
        )}
        <SubmitButton text="Sign In" />
        <TermsAndConditions />
      </form>
    </>
  );
};

export default LoginForm;
