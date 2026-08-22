import React from "react";
import Label from "./Label";
import { motion } from "framer-motion";
import { Reveal } from "../Common/Reveal";

const Details = () => {
  return (
    <div className="flex flex-col text-left pt-5">
      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="font-medium text-lg text-amber-500 dark:text-amber-300 mt-5 mb-1"
      >
        <Reveal width="100%">Programming Languages</Reveal>
      </motion.h2>
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        <Label indicator={90}>Java</Label>
        <Label indicator={75}>Kotlin</Label>
        <Label indicator={80}>Javascript</Label>
        <Label indicator={70}>C/C++</Label>
        <Label indicator={60}>HTML</Label>
        <Label indicator={60}>CSS</Label>
      </motion.div>

      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="font-medium text-lg text-amber-500 dark:text-amber-300 mt-5 mb-1"
      >
        <Reveal width="100%">Backend</Reveal>
      </motion.h2>
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        <Label indicator={95}>Spring Boot</Label>
        <Label indicator={85}>Spring Security</Label>
        <Label indicator={90}>REST APIs</Label>
        <Label indicator={85}>Microservices</Label>
        <Label indicator={80}>JWT Authentication</Label>
        <Label indicator={80}>RBAC</Label>
        <Label indicator={75}>Keycloak</Label>
        <Label indicator={70}>Logstash</Label>
        <Label indicator={75}>Node.js</Label>
        <Label indicator={60}>Express.js</Label>
      </motion.div>

      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="font-medium text-lg text-amber-500 dark:text-amber-300 mt-5 mb-1"
      >
        <Reveal width="100%">Frontend</Reveal>
      </motion.h2>
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        <Label indicator={90}>React.js</Label>
        <Label indicator={65}>Next.js</Label>
        <Label indicator={75}>Bootstrap</Label>
      </motion.div>

      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="font-medium text-lg text-amber-500 dark:text-amber-300 mt-5 mb-1"
      >
        <Reveal width="100%">Databases</Reveal>
      </motion.h2>
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        <Label indicator={85}>PostgreSQL</Label>
        <Label indicator={80}>MongoDB</Label>
        <Label indicator={70}>MongoDB Atlas</Label>
        <Label indicator={70}>MySQL</Label>
        <Label indicator={75}>Elasticsearch</Label>
      </motion.div>

      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="font-medium text-lg text-amber-500 dark:text-amber-300 mt-5 mb-1"
      >
        <Reveal width="100%">Cloud & DevOps</Reveal>
      </motion.h2>
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        <Label indicator={80}>Docker</Label>
        <Label indicator={70}>Kubernetes</Label>
        <Label indicator={75}>GitHub Actions</Label>
        <Label indicator={75}>CI/CD</Label>
      </motion.div>

      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="font-medium text-lg text-amber-500 dark:text-amber-300 mt-5 mb-1"
      >
        <Reveal width="100%">Softwares and Tools</Reveal>
      </motion.h2>
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        <Label indicator={90}>Git</Label>
        <Label indicator={90}>GitHub</Label>
        <Label indicator={95}>IntelliJ IDEA</Label>
        <Label indicator={100}>VS Code</Label>
        <Label indicator={80}>Postman</Label>
        <Label indicator={70}>Graylog</Label>
        <Label indicator={70}>Splunk</Label>
        <Label indicator={80}>Gradle</Label>
        <Label indicator={80}>Maven</Label>
      </motion.div>
    </div>
  );
};

export default Details;
