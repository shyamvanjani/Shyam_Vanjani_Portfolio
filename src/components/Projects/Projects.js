import React from "react";
import { motion } from "framer-motion";
import { fadeTop, motionStep } from "./Motion";
import Featured from "./Featured";
import Section from "../Common/Section";
import ProjectCard from "./ProjectCard";
import RightSvg from "../../assets/svg/right-pattern.svg";
import iNotebook from '../../assets/iNotebook.png'
import job from '../../assets/job.jpg'
import news from "../../assets/news.png"

export const projectsData = [
  {
    id: 1,
    thumbnail: job,
    title: "Job Recruitement Portal ",
    description: "Designed and developed a job recruitment portal that connects employers with potential candidates.Developed a job recruitment platform with roles for Admin, Company, and Job Seeker.Streamlined job search and application processes for users. Enabled efficient resume management and interview scheduling.",
    code: "https://github.com/shyamvanjani/Job-Recruitment-System_Frontend",
    tech: ["React.js,Node.js,Express.js,MongoDB"],
    featured: false,
  },
  {
    id: 2,
    thumbnail: iNotebook,
    title: "iNoteBook ",
    description:
      "INotebook is a React Application for managing personal notes on the cloud.iNotebook provides a seamless and efficient note-taking experience for everyone.",
    code: "https://github.com/shyamvanjani/iNotebook",
    tech: ["React.js,Bootstrap,Express.js,MongoDB"],
    featured: false,
  },
  {
    id: 3,
    thumbnail:
      news,
    title: "NewsMonkey",
    description:
      "Built NewsMonkey, a dynamic news website that delivers the latest headlines from around the world. The site features an intuitive layout, personalized news feeds, and real-time updates, making it easy for users to stay informed about current events.",
   
    code: "https://github.com/shyamvanjani/NewsMonkey",
    tech: ["React.js,Bootstrap"],
    featured: false,
  },
];

const Projects = () => {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Projects upon which I have worked on."
      className="relative"
    >
      <div className="space-y-5 lg:space-y-10 px-5 md:px-10 lg:px-20 2xl:px-40">
        {/* Right SVG */}
        <img
          src={RightSvg}
          alt=""
          className="absolute hidden right-0 bottom-2/4 w-2/12 max-w-xs md:block"
          loading="lazy"
          height={700}
          width={320}
        />
        {projectsData
          .filter((e) => e.featured === true)
          .map((e, i) => (
            <motion.div key={i} variants={fadeTop} {...motionStep}>
              <Featured
                live={e.live}
                thumbnail={e.thumbnail}
                code={e.code}
                title={e.title}
                description={e.description}
                tech={e.tech}
                secondary={i % 2 === 0 ? false : true}
              />
            </motion.div>
          ))}
      </div>
      <div className="grid grid-cols-8 2xl:grid-cols-12 gap-6 gap-y-8 my-10 px-5 md:px-10 lg:px-20 2xl:px-40">
        {projectsData
          .filter((e) => e.featured !== true)
          .map((e, i) => (
            <ProjectCard
              live={e.live}
              thumbnail={e.thumbnail}
              code={e.code}
              title={e.title}
              description={e.description}
              tech={e.tech}
              key={i}
            />
          ))}
      </div>
      <span>
        For More Projects and Other work visit my{" "}
        <a
          href="https://github.com/shyamvanjani?tab=repositories"
          style={{ fontWeight: "bold", color: "red" }}
        >
          GitHub
        </a>
      </span>
    </Section>
  );
};

export default Projects;
