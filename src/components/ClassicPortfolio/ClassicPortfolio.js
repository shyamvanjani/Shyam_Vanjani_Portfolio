import React from "react";
import { motion } from "framer-motion";
import AppFooter from "../Footer/Footer";
import SkillsPage from "../Skills/SkillsPage";
import HeaderNav from "../Header/HeaderNav";
import Projects from "../Projects/Projects";
import { Toaster } from "react-hot-toast";
import About from "../About/About";
import Hero from "../Common/Hero";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Certificate from "../Certificates/Certificates";
import Experience from "../Experience/Experience";

const ClassicPortfolio = ({ darkMode, setDarkMode }) => {

  return (
    <main className="bg-white dark:bg-[#0d0c0e] text-gray-900 dark:text-white duration-700 ease-in-out">
      <Toaster position="top-center" reverseOrder={false} />
      <HeaderNav darkMode={darkMode} setDarkMode={setDarkMode} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.2, 0.4, 0.8, 1] }}
        transition={{ duration: 0.2 }}
      >
        <Hero />
      </motion.div>
      <About />
      <Experience />
      <SkillsPage />
      <Projects />
      <Certificate />
      <AppFooter />
      <SpeedInsights />
      <Analytics />
    </main>
  );
};

export default ClassicPortfolio;