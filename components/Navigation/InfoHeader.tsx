import React from "react";

const InfoHeader: React.FC = () => {
  return (
    <a
      href="https://www.producthunt.com/products/resme"
      target="_blank"
      className=" flex items-center justify-center sticky h-11 inset-x-0 top-0 z-30 w-full bg-blue-600/25 backdrop-blur-lg transition-all"
    >
      <span className="font-normal duration-500 transition-all hover:font-semibold text-blue-600">
        Get upto 50% off on our product hunt page 🚀
      </span>
    </a>
  );
};

export default InfoHeader;
