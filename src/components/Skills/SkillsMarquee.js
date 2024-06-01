import "./SkillsMarquee.css";
import react from "../../assets/yellow/reacty.png";
import javascript from "../../assets/yellow/javascripty.png";
import nextjs from "../../assets/yellow/nexty.png";
import nodejs from "../../assets/yellow/node.png"
import Bootstrap from "../../assets/yellow/images (1).png";
import mongo from "../../assets/yellow/mongo.png"
import css3 from "../../assets/yellow/css3y.png";

import git from "../../assets/yellow/gity.png";

const skillsData = [
  {
    id: 1,
    image: javascript,
    title: "Javascript",
  },
  {
    id: 2,
    image: react,
    title: "React.js",
  },
  {
    id: 7,
    image: nodejs,
    title: "Node.js",
  },
  {
  id: 8,
  image: mongo,
  title: "MongoDB",
},
  {
    id: 3,
    image: Bootstrap,
    title: "Bootstrap",
  },
  {
    id: 4,
    image: nextjs,
    title: "Next.js",
  },

  {
    id: 5,
    image: css3,
    title: "CSS",
  },

  {
    id: 6,
    image: git,
    title: "Git",
  },
];

function SkillsMarquee() {
  return (
    <div className="relative flex overflow-x-hidden">
      <div className="py-5 flex animate-marquee whitespace-nowrap">
        {skillsData.map(({ id, image, title }) => (
          <div
            key={id}
            className="skill--box flex justify-start p-3 shadow-lg shadow-gray-400/50 dark:shadow-black/30 rounded-xl object-cover w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 dark:bg-neutral-900 bg-gray-100"
          >
            <img
              src={image}
              alt={title}
              className="w-36 h-36 md:h-44 md:w-44 object-contain group-hover:grayscale"
            />
          </div>
        ))}
      </div>

      <div className="absolute flex top-0 py-5 animate-marquee2 whitespace-nowrap">
        {skillsData.map(({ id, image, title }) => (
          <div
            key={id}
            className="skill--box flex justify-start p-3 shadow-lg shadow-gray-400/50 dark:shadow-black/30 rounded-xl object-cover w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 dark:bg-neutral-900 bg-gray-100"
          >
            <img
              src={image}
              alt={title}
              className="w-36 h-36 md:h-44 md:w-44 object-contain group-hover:grayscale"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsMarquee;
