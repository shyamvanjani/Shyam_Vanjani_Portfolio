import { motion } from "framer-motion";
import { FaJava, FaDocker } from "react-icons/fa";
import { SiSpringboot, SiKubernetes } from "react-icons/si";
import { ReactIcon, VSCodeIcon } from "./Icons";

const animation = {
  hide: { x: -8, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
  },
};

function HeaderTechStack() {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.p
        className="mb-2.5 text-sm md:text-xl font-semibold text-amber-400 dark:text-amber-400"
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.6 }}
      >
        Current favorite tech stack/tools:
      </motion.p>
      <motion.ul
        className="flex items-center gap-3.5 text-slate-600 dark:text-slate-300"
        initial="hide"
        animate="show"
        transition={{ delayChildren: 0.6, staggerChildren: 0.025 }}
      >
        <motion.li variants={animation}>
          <div className="transition duration-200 hover:text-[#f89820]" title="Java">
            <FaJava className="h-6 w-6 md:h-8 md:w-8" />
          </div>
        </motion.li>

        <motion.li variants={animation}>
          <div className="transition duration-200 hover:text-[#6DB33F]" title="Spring Boot">
            <SiSpringboot className="h-6 w-6 md:h-8 md:w-8" />
          </div>
        </motion.li>

        <motion.li variants={animation}>
          <div className="transition duration-200 hover:text-[#61DAFB]" title="React">
            <ReactIcon className="h-6 w-6 md:h-8 md:w-8" />
          </div>
        </motion.li>

        <motion.li variants={animation}>
          <div className="h-3 md:h-5 w-[1px] bg-slate-400 dark:bg-neutral-700" />
        </motion.li>

        <motion.li variants={animation}>
          <div className="transition duration-200 hover:text-[#2496ED]" title="Docker">
            <FaDocker className="h-6 w-6 md:h-8 md:w-8" />
          </div>
        </motion.li>

        <motion.li variants={animation}>
          <div className="transition duration-200 hover:text-[#326CE5]" title="Kubernetes">
            <SiKubernetes className="h-6 w-6 md:h-8 md:w-8" />
          </div>
        </motion.li>

        <motion.li variants={animation}>
          <div className="h-3 md:h-5 w-[1px] bg-slate-400 dark:bg-neutral-700" />
        </motion.li>

        <motion.li variants={animation}>
          <div className="transition duration-200 hover:text-[#007ACC]" title="VS Code">
            <VSCodeIcon className="h-6 w-6 md:h-8 md:w-8" />
          </div>
        </motion.li>
      </motion.ul>
    </div>
  );
}

export default HeaderTechStack;
