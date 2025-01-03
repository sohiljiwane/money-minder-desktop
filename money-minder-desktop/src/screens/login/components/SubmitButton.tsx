import React from "react";

interface ButtonProps {
  text: string;
}

const SubmitButton: React.FC<ButtonProps> = ({ text }) => {
  return (
    <>
      <button className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
        <span className="ml-">{text}</span>
      </button>
    </>
  );
};

export default SubmitButton;
