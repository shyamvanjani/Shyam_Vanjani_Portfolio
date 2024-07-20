// src/components/CertificateItem.jsx

import React from "react";

const CertificateItem = ({ name, link, image }) => {
  return (
    <div className="certificate-item flex flex-col items-center p-4 border rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="image-container" style={{ width: "100%", height: "130px", overflow: "hidden" }}>
        <img src={image} alt={name} className="w-full h-full object-cover rounded-lg transition-all duration-300 transform hover:scale-105" />
      </div>
      <h3 className="text-xl font-semibold my-2">{name}</h3>
      <a href={link} className="text-amber-500 hover:underline" target="_blank" rel="noopener noreferrer">
      {/* <a href={link} className="bg-gradient-to-r border-2 hover:border-transparent border-amber-500 bg-transparent transition-colors hover:from-amber-600 hover:to-amber-500 py-2 rounded-xl z-0 font-semibold tracking-[1px] hover:text-black shadow-lg shadow-gray-400/30 dark:shadow-black/30 px-4" target="_blank" rel="noopener noreferrer"> */}
        View Certificate
      </a>
    </div>
  );
};

export default CertificateItem;
