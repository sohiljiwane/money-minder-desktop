import React from "react";
import SubmitButton from "../../login/components/SubmitButton";

const RegisterForm = () => {
  return (
    <>
      <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0 py-4">
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border"
              id="firstName"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div className="md:ml-2 py-4">
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border"
              id="lastName"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="mb-4 py-4">
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0 py-4">
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border"
              id="password"
              type="password"
              placeholder="Password"
            />
            <p className="text-xs italic text-red-500">
              Please choose a password.
            </p>
          </div>
          <div className="md:ml-2 py-4">
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border"
              id="c_password"
              type="password"
              placeholder="Confirm Password"
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
            href="./index.html"
          >
            Already have an account? Login!
          </a>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
