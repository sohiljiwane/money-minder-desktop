import React from "react";
import SubmitButton from "../../login/components/SubmitButton";

const RegisterForm = () => {
  return (
    <>
      <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0">
            <label
              className="block mb-2 text-sm font-bold"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div className="md:ml-2">
            <label
              className="block mb-2 text-sm font-bold"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0">
            <label
              className="block mb-2 text-sm font-bold "
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p className="text-xs italic text-red-500">
              Please choose a password.
            </p>
          </div>
          <div className="md:ml-2">
            <label
              className="block mb-2 text-sm font-bold"
              htmlFor="c_password"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="c_password"
              type="password"
              placeholder="******************"
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
