import "./SkillsMarquee.css";
import react from "../../assets/yellow/reacty.png";
import javascript from "../../assets/yellow/javascripty.png";
import nextjs from "../../assets/yellow/nexty.png";
import nodejs from "../../assets/yellow/node.png"
import Bootstrap from "../../assets/yellow/images (1).png";
import mongo from "../../assets/yellow/mongo.png"
import css3 from "../../assets/yellow/css3y.png";
import git from "../../assets/yellow/gity.png";

import { FaJava, FaDocker } from "react-icons/fa";
import { SiSpringboot, SiKubernetes, SiPostgresql, SiKotlin, SiElasticsearch } from "react-icons/si";

const imageSkillsData = [
  { id: 1, image: javascript, title: "Javascript" },
  { id: 2, image: react, title: "React.js" },
  { id: 7, image: nodejs, title: "Node.js" },
  { id: 8, image: mongo, title: "MongoDB" },
  { id: 3, image: Bootstrap, title: "Bootstrap" },
  { id: 4, image: nextjs, title: "Next.js" },
  { id: 5, image: css3, title: "CSS" },
  { id: 6, image: git, title: "Git" },
];

const iconSkillsData = [
  { id: 9, Icon: FaJava, title: "Java", color: "#f89820" },
  { id: 10, Icon: SiSpringboot, title: "Spring Boot", color: "#6DB33F" },
  { id: 11, Icon: SiKotlin, title: "Kotlin", color: "#7F52FF" },
  { id: 12, Icon: SiPostgresql, title: "PostgreSQL", color: "#336791" },
  { id: 13, Icon: SiElasticsearch, title: "Elasticsearch", color: "#FEC514" },
  { id: 14, Icon: FaDocker, title: "Docker", color: "#2496ED" },
  { id: 15, Icon: SiKubernetes, title: "Kubernetes", color: "#326CE5" },
];

function SkillsMarquee() {
  return (
    <div className="relative flex overflow-x-hidden">
      <div className="py-5 flex animate-marquee whitespace-nowrap">
        {imageSkillsData.map(({ id, image, title }) => (
          <div
            key={id}
            className="skill--box flex justify-center items-center p-3 shadow-lg shadow-gray-400/50 dark:shadow-black/30 rounded-xl object-cover w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 dark:bg-[#111827] bg-gray-100 border border-transparent dark:border-white/5"
          >
            <img
              src={image}
              alt={title}
              className="w-36 h-36 md:h-44 md:w-44 object-contain group-hover:grayscale"
            />
          </div>
        ))}
        {iconSkillsData.map(({ id, Icon, title, color }) => (
          <div
            key={id}
            className="skill--box flex flex-col justify-center items-center p-3 shadow-lg shadow-gray-400/50 dark:shadow-black/30 rounded-xl w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 dark:bg-[#111827] bg-gray-100 border border-transparent dark:border-white/5"
            title={title}
          >
            <Icon className="w-10 h-10 md:w-12 md:h-12" style={{ color }} />
          </div>
        ))}
      </div>

      <div className="absolute flex top-0 py-5 animate-marquee2 whitespace-nowrap">
        {imageSkillsData.map(({ id, image, title }) => (
          <div
            key={id}
            className="skill--box flex justify-center items-center p-3 shadow-lg shadow-gray-400/50 dark:shadow-black/30 rounded-xl object-cover w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 dark:bg-[#111827] bg-gray-100 border border-transparent dark:border-white/5"
          >
            <img
              src={image}
              alt={title}
              className="w-36 h-36 md:h-44 md:w-44 object-contain group-hover:grayscale"
            />
          </div>
        ))}
        {iconSkillsData.map(({ id, Icon, title, color }) => (
          <div
            key={id}
            className="skill--box flex flex-col justify-center items-center p-3 shadow-lg shadow-gray-400/50 dark:shadow-black/30 rounded-xl w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 dark:bg-[#111827] bg-gray-100 border border-transparent dark:border-white/5"
            title={title}
          >
            <Icon className="w-10 h-10 md:w-12 md:h-12" style={{ color }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsMarquee;
