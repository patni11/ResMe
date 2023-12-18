import React from "react";

const InfoHeader: React.FC = () => {
  return (
    <a
      href="/pricing"
      target="_blank"
      className=" flex items-center justify-center sticky h-11 inset-x-0 top-0 z-30 w-full bg-blue-600/25 backdrop-blur-lg transition-all"
    >
      <span className="font-semibold duration-500 transition-all hover:font-bold text-blue-600">
        Holiday Discount: Get 30% off 🚀
      </span>
    </a>
  );
};

export default InfoHeader;
