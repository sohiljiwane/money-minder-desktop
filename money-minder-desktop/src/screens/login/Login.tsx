import React from "react";
import LoginLayout from "./components/LoginLayout";
import GoogleSignInButton from "./components/GoogleSignInButton";
import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <>
      <LoginLayout>
        <div></div>
        <div className="mt-12 flex flex-col items-center">
          <GoogleSignInButton />
        </div>

        <div className="my-12 border-b text-center">
          <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
            Or Sign In with Money Minder E-mail
          </div>
        </div>

        <div className="mx-auto max-w-xs">
          <LoginForm />
        </div>
      </LoginLayout>
    </>
  );
};

export default Login;
