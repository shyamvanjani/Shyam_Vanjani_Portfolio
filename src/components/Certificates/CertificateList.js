// src/components/CertificateList.jsx

import React from "react";
import CertificateItem from "./CertificateItem";
import nptel from '../../assets/yellow/download.png'
import coursera from '../../assets/yellow/coursera.png'
import ibm from '../../assets/yellow/download (1).png'
import ssip from '../../assets/yellow/ssip.png'
import './Certificate.css'

const CertificateList = () => {
  const certificates = [
    {
      name: "Database Management System",
      link: "https://drive.google.com/file/d/1ebnvjlfuwcv_dwKwK2_AppangMvqWGP_/view",
      image: nptel
    },
    {
      name: "Machine Learning",
      link: "https://drive.google.com/file/d/1jMS_nHq2_9DlFG5uhLI0d-pTtNTQ-rgq/view",
      image: coursera
    },
    {
      name: "Introduction to Cloud Development with HTML,CSS and JavaScript",
      link: "https://drive.google.com/file/d/19NyH5QdTMezlyGK6sqipbnvcippDoiyP/view",
      image: ibm
    },
    {
        name: "SSIP Hackathon Participation - 2023",
        link: "https://drive.google.com/file/d/1pfq_W3pBALaCdvIr2zM1fV0ijIvG5n_H/view",
        image: ssip
      }
  ];

  return (
    <div className="certificate-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {certificates.map((certificate, index) => (
        <CertificateItem key={index} {...certificate} />
      ))}
    </div>
  );
};

export default CertificateList;
