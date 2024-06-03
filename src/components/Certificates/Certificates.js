// src/components/Certificate.jsx

import { motion } from "framer-motion";
import Section from "../Common/Section";
import LeftSvg from "../../assets/svg/left-pattern.svg";
import CertificateList from "./CertificateList";

const Certificate = () => {
  return (
    <Section
      id="certificate"
      title="Certificates"
      subtitle="View my certificates here."
      className="relative"
    >
      <img
        src={LeftSvg}
        className="absolute hidden left-0 -top-1/4 w-1/12 max-w-xs md:block"
        loading="lazy"
        height={700}
        width={320}
        alt=""
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 0.5,
          delay: 0.1,
        }}
        className="container flex justify-center flex-col lg:flex-row lg:mt-10 px-5 md:px-20 lg:space-x-4"
      >
        <CertificateList />
      </motion.div>
    </Section>
  );
};

export default Certificate;
