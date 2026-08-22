import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { BiLinkAlt } from "react-icons/bi";
import {
  HiOutlineServerStack,
  HiOutlineGlobeAlt,
  HiOutlineCommandLine,
  HiOutlineDocumentText,
  HiOutlineCpuChip,
  HiOutlineNewspaper,
} from "react-icons/hi2";

const ProjectItem = ({ project, index, isExpanded, onToggle, hasExpanded }) => {
  const indexStr = String(index + 1).padStart(2, "0");

  // Pick an icon based on the project to give each a unique visual identity
  const iconMap = {
    "Solumina Admin Portal": HiOutlineServerStack,
    "Cluster-Deck": HiOutlineCpuChip,
    "Nobilex": HiOutlineDocumentText,
    "Job Recruitement Portal ": HiOutlineGlobeAlt,
    "iNoteBook ": HiOutlineCommandLine,
    "NewsMonkey": HiOutlineNewspaper,
  };

  const Icon = iconMap[project.title] || HiOutlineServerStack;

  return (
    <motion.div
      layout
      className={`border-b border-neutral-200 dark:border-neutral-800 transition-opacity duration-500 ${
        hasExpanded && !isExpanded ? "opacity-40" : "opacity-100"
      }`}
    >
      {/* Collapsed Row — Always Visible */}
      <motion.button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 md:py-7 px-2 md:px-4 group cursor-pointer text-left"
        whileHover={{ x: 6 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Left: Index + Title */}
        <div className="flex items-center gap-4 md:gap-8 min-w-0">
          <span
            className={`text-2xl md:text-4xl font-mono font-bold tracking-tight transition-colors duration-300 ${
              isExpanded
                ? "text-amber-500"
                : "text-neutral-300 dark:text-neutral-600 group-hover:text-amber-400"
            }`}
          >
            {indexStr}
          </span>
          <h3
            className={`text-lg md:text-2xl lg:text-3xl font-bold tracking-tight transition-colors duration-300 truncate ${
              isExpanded
                ? "text-amber-500 dark:text-amber-400"
                : "text-neutral-800 dark:text-neutral-200 group-hover:text-amber-500 dark:group-hover:text-amber-400"
            }`}
          >
            {project.title}
          </h3>
        </div>

        {/* Right: Icon + Chevron */}
        <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
          <Icon
            className={`w-5 h-5 md:w-7 md:h-7 transition-colors duration-300 ${
              isExpanded
                ? "text-amber-500"
                : "text-neutral-400 dark:text-neutral-500 group-hover:text-amber-400"
            }`}
          />
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className={`text-xl md:text-2xl font-light transition-colors duration-300 ${
              isExpanded
                ? "text-amber-500"
                : "text-neutral-400 group-hover:text-amber-400"
            }`}
          >
            +
          </motion.div>
        </div>
      </motion.button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 px-2 md:px-4 md:pl-16 lg:pl-20">
              {/* Subtitle */}
              {project.subtitle && (
                <p className="text-sm font-mono text-amber-500/70 dark:text-amber-400/60 mb-4">
                  {project.subtitle}
                </p>
              )}

              {/* Description */}
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl mb-6">
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-transparent dark:border-white/5 hover:border-amber-500/30 transition-colors duration-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors duration-200 group/link"
                  >
                    <BiLinkAlt className="text-lg group-hover/link:scale-110 transition-transform duration-200" />
                    Live Demo
                  </a>
                )}
                {project.code && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 group/link"
                  >
                    <FaGithub className="text-lg group-hover/link:scale-110 transition-transform duration-200" />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectItem;
