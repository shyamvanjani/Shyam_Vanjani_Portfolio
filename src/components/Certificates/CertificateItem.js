// src/components/CertificateItem.jsx

import React from "react";

const CertificateItem = ({ name, link, image }) => {
  return (
    <div className="certificate-item flex flex-col items-center p-4 border rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="image-container" style={{ width: "100%", height: "130px", overflow: "hidden" }}>
        <img src={image} alt={name} className="w-full h-full object-cover rounded-lg transition-all duration-300 transform hover:scale-105" />
      </div>
      <h3 className="text-xl font-semibold my-2">{name}</h3>
      <a href={link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
        View Certificate
      </a>
    </div>
  );
};

export default CertificateItem;
