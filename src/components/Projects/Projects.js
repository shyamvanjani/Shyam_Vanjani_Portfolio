import React, { useState } from "react";
import { motion } from "framer-motion";
import Section from "../Common/Section";
import ProjectItem from "./ProjectItem";

export const projectsData = [
  // ─── Enterprise Projects (NEW — from resume_data.md) ─────────────
  {
    id: 4,
    title: "Solumina Admin Portal",
    subtitle: "Enterprise Manufacturing Administration Platform",
    description: "Developed backend microservices covering user management, audit logs, monitoring, tech support bundle and log streaming for an enterprise manufacturing platform. Implemented a Kubernetes Monitoring module spanning clusters, nodes, pods, namespaces, ConfigMaps, PV/PVCs, TLS certificates, and pod log management, plus a Log Streaming module supporting Elasticsearch, Graylog, Splunk, HTTP, TCP, and UDP destinations. Integrated Keycloak authentication, Spring Security, RBAC, and Elasticsearch-based audit search.",
    tech: ["Java 21", "Spring Boot", "PostgreSQL", "Elasticsearch", "Keycloak", "Docker", "Kubernetes"],
  },
  {
    id: 5,
    title: "Cluster-Deck",
    subtitle: "MongoDB Atlas Monitoring Platform",
    description: "Built backend services for authentication, RBAC, and tenant data segregation supporting a multi-tenant architecture, with an automated scheduler for periodic MongoDB Atlas metric synchronization. Delivered business-hours auto-scaling, cluster tier customization, daily/monthly cost analytics, and cross-organization project sharing with role-based permissions.",
    tech: ["Java", "Spring Boot", "Kotlin", "PostgreSQL", "TypeScript", "Angular", "Docker"],
  },
  {
    id: 6,
    title: "Nobilex",
    subtitle: "Digital Workflow Platform for Dutch Notarial Offices",
    description: "Hardened the tenant signup flow with backend safeguards against duplicate requests and parallel tenant creation, and enhanced the PEC popup workflow to eliminate unnecessary page refreshes after certificate updates. Integrated BRP data mapping for automatic population of Adelijke titel predikaat values, and delivered backend services and Angular UI enhancements for secure drafting, signing, submission, and archiving of legal deeds, with Kadaster SYVAS integration.",
    tech: ["Java", "Spring Boot", "Kotlin", "Angular", "MongoDB", "Docker", "Git"],
  },
  // ─── Existing MERN Projects (KEPT) ─────────────────────────────
  {
    id: 1,
    title: "Job Recruitement Portal ",
    description: "Designed and developed a job recruitment portal that connects employers with potential candidates. Developed a job recruitment platform with roles for Admin, Company, and Job Seeker. Streamlined job search and application processes for users. Enabled efficient resume management and interview scheduling.",
    code: "https://github.com/shyamvanjani/Job-Recruitment-System_Frontend",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    id: 2,
    title: "iNoteBook ",
    description:
      "INotebook is a React Application for managing personal notes on the cloud. iNotebook provides a seamless and efficient note-taking experience for everyone.",
    code: "https://github.com/shyamvanjani/iNotebook",
    tech: ["React.js", "Bootstrap", "Express.js", "MongoDB"],
  },
  {
    id: 3,
    title: "NewsMonkey",
    description:
      "Built NewsMonkey, a dynamic news website that delivers the latest headlines from around the world. The site features an intuitive layout, personalized news feeds, and real-time updates, making it easy for users to stay informed about current events.",
   
    code: "https://github.com/shyamvanjani/NewsMonkey",
    tech: ["React.js", "Bootstrap"],
  },
];

const Projects = () => {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Enterprise systems and web applications I've built."
      className="relative"
    >
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-neutral-200 dark:border-neutral-800"
        >
          {projectsData.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              isExpanded={expandedId === project.id}
              onToggle={() => handleToggle(project.id)}
              hasExpanded={expandedId !== null}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <span>
            For More Projects and Other work visit my{" "}
            <a
              href="https://github.com/shyamvanjani?tab=repositories"
              className="font-bold text-amber-500 hover:text-amber-400 transition-colors"
            >
              GitHub
            </a>
          </span>
        </motion.div>
      </div>
    </Section>
  );
};

export default Projects;
