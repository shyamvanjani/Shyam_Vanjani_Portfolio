import React from "react";
import Section from "../Common/Section";
import { motion } from "framer-motion";
import { HiOutlineBuildingOffice } from "react-icons/hi2";


const experienceData = [
  {
    id: 1,
    company: "Cygnet.One",
    role: "Associate Software Engineer (Java Backend Developer)",
    period: "July 2025 – Present",
    bullets: [
      "Architect and maintain enterprise-grade backend microservices for the Nobilex platform using Spring Boot, Kotlin, and MongoDB, integrating multiple third-party services within a microservices architecture.",
      "Engineer backend microservices for the Solumina Admin Portal using Java 21, Spring Boot, PostgreSQL, Docker, and Kubernetes, delivering scalable, secure REST APIs for user management, audit logging, monitoring, and log streaming.",
      "Built a Kubernetes Monitoring module using the Fabric8 Kubernetes Client, and a multi-destination Log Streaming module supporting Elasticsearch, Graylog, and Splunk with Elasticsearch-powered audit log search.",
      "Integrated Keycloak-based authentication with JWT authorization and RBAC, and drove CI/CD pipelines and production deployments using Docker, Kubernetes, Gradle, and GitHub Actions.",
      "Partnered cross-functionally with frontend, QA, and DevOps teams to ship enterprise-grade backend features on schedule.",
    ],
  },
  {
    id: 2,
    company: "Cygnet.One",
    role: "Software Engineer Trainee",
    period: "January 2025 – June 2025",
    bullets: [
      "Contributed to the Cluster-Deck platform by integrating MongoDB Atlas APIs, implementing RBAC, and supporting a multi-tenancy architecture.",
      "Built production-ready backend services using Java, Spring Boot, Kotlin, and PostgreSQL with secure authentication and authorization mechanisms.",
      "Engineered scheduler-based synchronization of MongoDB Atlas metrics, along with auto-scaling, project sharing, and cost analytics capabilities.",
    ],
  },
  {
    id: 3,
    company: "OCTANET SERVICES PVT LTD",
    role: "Web Development Intern (Virtual)",
    period: "June 2024",
    bullets: [
      "Completed a virtual web development internship focused on building responsive web applications and enhancing frontend development skills.",
    ],
  },
  {
    id: 4,
    company: "INFOLABZ IT SERVICES PVT LTD",
    role: "Data Analytics & Machine Learning Intern (Virtual)",
    period: "August 2023",
    bullets: [
      "Completed a virtual internship covering data analytics and machine learning fundamentals with hands-on project work.",
    ],
  },
];

const Experience = () => {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="My professional journey and career progression."
      className="relative"
    >
      <div className="max-w-4xl mx-auto px-5 md:px-10">
        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-500 via-amber-600 to-transparent" />

          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative pl-12 md:pl-20 pb-12 last:pb-0"
            >
              {/* Timeline dot */}
              <div
                className="absolute left-2.5 md:left-6 top-1 w-4 h-4 rounded-full border-2 border-amber-400 bg-amber-400/20 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
              >
                <div
                  className="absolute inset-1 rounded-full bg-amber-400"
                />
              </div>

              {/* Experience card */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg shadow-gray-400/30 dark:shadow-black/30 border border-gray-200 dark:border-white/5 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg p-2 bg-amber-500/10 text-amber-500">
                      <HiOutlineBuildingOffice className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                        {exp.company}
                      </h3>
                      <p className="text-sm font-semibold text-amber-500 dark:text-amber-400">
                        {exp.role}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-neutral-800 px-3 py-1 rounded-full whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 mt-4">
                  {exp.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 text-left"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-amber-400"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Experience;
