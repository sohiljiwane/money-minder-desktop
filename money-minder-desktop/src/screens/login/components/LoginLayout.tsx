import React from "react";

interface ChildrenProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">{children}</div>
          <div className="flex-1 bg-green-100 text-center hidden lg:flex"></div>
        </div>
      </div>
    </>
  );
};

export default LoginLayout;
