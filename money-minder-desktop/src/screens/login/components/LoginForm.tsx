import React from "react";
import SubmitButton from "./SubmitButton";
import TermsAndConditions from "./TermsAndConditions";

const LoginForm = () => {
  return (
    <>
      <input
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        type="email"
        placeholder="Email"
      />
      <input
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
        type="password"
        placeholder="Password"
      />
<<<<<<< HEAD
      <SubmitButton text="Sign In" />
=======
      <SubmitButton />
>>>>>>> 41ca0b8 (MMD-29: Create Form for Login Page)
      <TermsAndConditions />
    </>
  );
};

export default LoginForm;
