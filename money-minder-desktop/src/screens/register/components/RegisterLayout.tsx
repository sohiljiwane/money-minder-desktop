import React from "react";
import { ChildrenProps } from "../../../types/Children";
import GoogleSignInButton from "../../login/components/GoogleSignInButton";

const RegisterLayout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-green-100 text-center hidden lg:flex"></div>
          <div className="lg:w-1/2 xl:w-7/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <GoogleSignInButton />
            </div>

            <div className="my-12 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Or Register with Money Minder E-mail
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterLayout;
