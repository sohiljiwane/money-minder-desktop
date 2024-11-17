import React, { ChangeEvent, FormEvent, useState } from "react";
import SubmitButton from "../../login/components/SubmitButton";
import { useNavigate } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  c_password: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  c_password: ""
};

const RegisterForm: React.FC = () => {

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [showValidation, setShowValidation] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {id, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setShowValidation(true);

    if (formData.password) {
      try {
        console.log("Form submitted: ", formData);
        navigate("/login");
      } catch (error) {
        console.error("Registration failed.", error);
      }
    }
  };

  const handleNavigateToLogin = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <>
      <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0 py-4">
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border"
              id="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:ml-2 py-4">
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border"
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-4 py-4">
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border"
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0 py-4">
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border"
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {showValidation && !formData.password && (
              <p className="text-xs italic text-red-500">
              Please choose a password.
              </p>
            )}
          </div>
          <div className="md:ml-2 py-4">
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border"
              id="c_password"
              type="password"
              placeholder="Confirm Password"
              value={formData.c_password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-6 text-center">
          <SubmitButton text="Register" />
        </div>
        <hr className="mb-6 border-t" />
        <div className="text-center">
          <a
            className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center">
          <a
            className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
            href="#"
            onClick={handleNavigateToLogin}
          >
            Already have an account? Login!
          </a>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
