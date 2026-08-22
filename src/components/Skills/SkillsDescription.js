import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "../Common/Reveal";

const SkillsDescription = () => {
  return (
    <div className="text-left lg:pt-0">
      <motion.h2
        initial={{ x: 50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="font-medium text-2xl text-amber-500 dark:text-amber-300 mt-5 mb-5"
      >
        <Reveal width="100%">
          A look at all the programming languages, libraries, and tools I've
          worked with.
        </Reveal>
      </motion.h2>
      <motion.p
        initial={{ x: 50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-sm font-light"
      >
        With a strong foundation in both backend and frontend engineering, I've
        built production-grade systems spanning &nbsp;
        <span className="font-semibold">Enterprise Java Backend Development</span> and{" "}
        <span className="font-semibold">Modern Frontend Development</span>.
      </motion.p>

      <motion.h2
        initial={{ x: 50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="font-medium text-lg text-amber-500 dark:text-amber-300 mt-5"
      >
        <Reveal width="100%">Backend — Spring Boot & Microservices</Reveal>
      </motion.h2>
      <motion.p
        initial={{ x: 50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-sm font-light"
      >
        My primary expertise lies in building enterprise-grade microservices with
        Java and Spring Boot. I design scalable REST APIs with Spring Security,
        Keycloak, JWT authentication, and RBAC authorization patterns.
      </motion.p>

      <div className="flex">
        <div className="">
          <motion.h3
            initial={{ x: 50, opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-medium text-lg text-neutral-600 dark:text-neutral-200 mt-5"
          >
            Spring Boot
          </motion.h3>
          <motion.p
            initial={{ x: 50, opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sm font-light"
          >
            Spring Boot is my go-to framework for building production-ready
            backend services. I leverage it daily for microservices, REST APIs,
            and enterprise integrations.
          </motion.p>
          <motion.h3
            initial={{ x: 50, opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-medium text-lg text-neutral-600 dark:text-neutral-200 mt-5"
          >
            React.js
          </motion.h3>
          <motion.p
            initial={{ x: 50, opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sm font-light"
          >
            I really enjoy building web applications and React is my go-to
            library for creating dynamic, responsive user interfaces.
          </motion.p>
          <motion.h3
            initial={{ x: 50, opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-medium text-lg text-neutral-600 dark:text-neutral-200 mt-5"
          >
            Cloud & DevOps
          </motion.h3>
          <motion.p
            initial={{ x: 50, opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sm font-light"
          >
            I containerize applications with Docker, orchestrate with
            Kubernetes, and automate CI/CD pipelines with GitHub Actions
            for reliable, repeatable deployments.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default SkillsDescription;
