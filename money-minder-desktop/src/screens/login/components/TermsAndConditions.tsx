import React from "react";

const TermsAndConditions = () => {
  return (
    <>
      <p className="mt-6 text-xs text-gray-600 text-center">
        I agree to abide by Money Minder
        <a href="#" className="border-b border-gray-500 border-dotted">
          <span> Terms of Service</span>
        </a>
        <span> and its </span>
        <a href="#" className="border-b border-gray-500 border-dotted">
          <span>Privacy Policy</span>
        </a>
      </p>
    </>
  );
};

export default TermsAndConditions;
