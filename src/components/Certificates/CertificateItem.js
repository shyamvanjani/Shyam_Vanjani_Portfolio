// src/components/CertificateItem.jsx

import React from "react";

const CertificateItem = ({ name, link, image }) => {
  return (
    <div className="certificate-item flex flex-col items-center p-4 border border-gray-200 dark:border-white/5 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 dark:bg-neutral-900 bg-white hover:border-amber-500/30 dark:hover:border-amber-500/30">
      <div className="image-container" style={{ width: "100%", height: "170px", overflow: "hidden" }}>
        <img src={image} alt={name} className="w-full h-full object-cover rounded-lg transition-all duration-300 transform hover:scale-105" />
      </div>
      <h3 className="text-xl font-semibold my-2 text-center">{name}</h3>
      <a href={link} className="text-amber-500 hover:text-amber-400 hover:underline transition-colors duration-200 font-medium" target="_blank" rel="noopener noreferrer">
        View Certificate
      </a>
    </div>
  );
};

export default CertificateItem;
