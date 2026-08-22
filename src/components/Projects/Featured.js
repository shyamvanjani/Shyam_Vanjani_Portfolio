import React from "react";
import { BiLinkAlt } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { HiOutlineServerStack } from "react-icons/hi2";

const Featured = ({
  secondary,
  live,
  thumbnail,
  code,
  title,
  subtitle,
  description,
  tech,
}) => {
  const __renderImage = () => {
    return (
      <div className="col-span-12 sm:col-span-7 relative ">
        {thumbnail ? (
          <a href={`${live || code || '#'}`}>
            <div className="h-[350px] w-full relative rounded-xl overflow-hidden">
              <img
                src={thumbnail}
                layout="fill"
                className="w-full h-full transition-all object-cover duration-300 group-hover:scale-110 group-hover:rotate-3"
                alt={title}
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 bg-neutral-900/50 transition-all duration-300 cursor-pointer hover:opacity-0" />
            </div>
          </a>
        ) : (
          <div className="h-[350px] w-full relative rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 dark:from-cyan-500/20 dark:via-blue-600/20 dark:to-indigo-600/20 flex items-center justify-center border border-white/5">
            <div className="flex flex-col items-center gap-4">
              <HiOutlineServerStack className="w-24 h-24 text-cyan-400/40 group-hover:text-cyan-400/70 transition-colors duration-500" />
              <span className="text-sm font-mono text-cyan-400/50">Enterprise Platform</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const __renderContent = () => {
    return (
      <div
        className={`col-span-12 sm:col-span-5 text-right sm:absolute sm:left-[50%]  ${
          secondary && `!relative z-30 !left-0 !text-start sm:w-[120%]`
        }`}
      >
        <div>
          <p className="text-cyan-500 dark:text-cyan-400 font-mono text-sm"> Highlight </p>
          <h1 className="text-3xl font-medium text-neutral-700 dark:text-neutral-300">
            {" "}
            {title}{" "}
          </h1>
          {subtitle && (
            <p className="text-sm text-cyan-400/70 dark:text-cyan-400/60 font-mono mt-1">{subtitle}</p>
          )}

          <div className="my-6 p-6 bg-gray-50 dark:bg-[#111827] text-neutral-700 dark:text-neutral-300 shadow-xl shadow-gray-400/50 dark:shadow-black/30 rounded-xl hidden sm:block border border-transparent dark:border-white/5">
            <p> {description && description} </p>
          </div>

          <div
            className={`flex text-cyan-500 dark:text-cyan-400 font-bold gap-x-4 justify-end flex-wrap ${
              secondary && "!justify-start ml-0"
            }
            `}
          >
            {tech.map((e, i) => (
              <span className="text-sm" key={i}>
                {e}
              </span>
            ))}
          </div>

          <div
            className={`flex justify-end mt-5 gap-3 dark:text-neutral-300 text-neutral-700 ${
              secondary && "!justify-start"
            }`}
          >
            {live && (
              <a
                href={`${live}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-500 p-2 rounded-md dark:bg-[#1e293b] bg-neutral-300 transition-all duration-300 hover:scale-110 text-2xl border-black/10 shadow-md shadow-gray-400/50 dark:shadow-black/20"
              >
                <BiLinkAlt />
              </a>
            )}

            {code && (
              <a
                href={`${code}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-500 p-2 rounded-md dark:bg-[#1e293b] bg-neutral-300 transition-all duration-300 hover:scale-90 text-2xl border-black/10 shadow-md shadow-gray-400/50 dark:shadow-black/20"
              >
                <FaGithub />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative grid grid-cols-12 items-center gap-3 group ">
      {secondary ? (
        <>
          {__renderContent()}
          {__renderImage()}
        </>
      ) : (
        <>
          {__renderImage()}
          {__renderContent()}
        </>
      )}
    </div>
  );
};

export default Featured;
