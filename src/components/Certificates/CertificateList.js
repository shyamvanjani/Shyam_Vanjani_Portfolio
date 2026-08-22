// src/components/CertificateList.jsx

import React from "react";
import CertificateItem from "./CertificateItem";
import nptel from '../../assets/yellow/nptel.png'
import coursera from '../../assets/yellow/coursera.png'
import ibm from '../../assets/yellow/download (1).png'
import ssip from '../../assets/yellow/ssip.png'
import cygnetBuildathon from '../../assets/yellow/cygnet_buildathon.png'
import oracleGenai from '../../assets/yellow/oracle_genai.png'
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
    },
    {
      name: "Cygnet Build-A-Thon 2025",
      link: "https://drive.google.com/file/d/10SIk3cbqLy0g-UmeduP0A1XFfEyDkXWH/view",
      image: cygnetBuildathon
    },
    {
      name: "Oracle Cloud Infrastructure Generative AI Professional",
      link: "https://drive.google.com/file/d/1HmRbsvLPRNdXJcQccjxtgoI8A40-TDFM/view",
      image: oracleGenai
    },
  ];

  return (
    <div className="certificate-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certificates.map((certificate, index) => (
        <CertificateItem key={index} {...certificate} />
      ))}
    </div>
  );
};

export default CertificateList;
