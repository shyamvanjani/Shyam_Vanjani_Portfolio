import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const CertificateItem = ({ name, link, image }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View certificate: ${name}`}
      className="certificate-item group flex flex-col items-center h-full p-4 rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-neutral-900 shadow-md cursor-pointer motion-safe:transition-all motion-safe:duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-500/50 dark:hover:border-amber-500/50 motion-safe:hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
    >
      {/* Fixed height container with padding and unified background */}
      <div className="w-full h-48 overflow-hidden rounded-lg bg-gray-50 dark:bg-white/5 p-4 flex items-center justify-center shrink-0">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          // object-contain prevents cropping
          className="w-full h-full object-contain motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="text-xl font-semibold mt-4 mb-2 text-center line-clamp-2">
        {name}
      </h3>

      <span className="mt-auto inline-flex items-center gap-1.5 text-amber-500 group-hover:text-amber-400 font-medium transition-colors duration-200">
        View Certificate
        <FaExternalLinkAlt
          size={12}
          className="motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </a>
  );
};

export default CertificateItem;