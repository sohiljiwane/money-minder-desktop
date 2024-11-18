import React, { ChangeEvent, FormEvent, useState } from "react";
import SubmitButton from "./SubmitButton";
import TermsAndConditions from "./TermsAndConditions";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {id, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setShowValidation(true);

    const errors = [];
    if (!formData.email) {
      errors.push("Please enter an email id.");
    }
    if (!formData.password) {
      errors.push("Please enter a password");
    }
    if (errors.length > 0) {
      console.log(errors);
      console.log("Login failed.", formData);
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
