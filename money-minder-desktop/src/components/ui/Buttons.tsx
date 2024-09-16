import React from "react";

interface ButtonProps {
    text: string
}

const Buttons: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className="bg-shamrockGreen hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-full">
      {text}
    </button>
  );
};

export default Buttons;
