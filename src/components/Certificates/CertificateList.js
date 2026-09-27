// src/components/Certificates/CertificateList.jsx

import React, { useRef, useEffect, useState, useCallback } from "react";
import CertificateItem from "./CertificateItem";
import nptel from '../../assets/yellow/nptel.png'
import coursera from '../../assets/yellow/coursera.png'
import ibm from '../../assets/yellow/download (1).png'
import ssip from '../../assets/yellow/ssip.png'
import cygnetBuildathon from '../../assets/yellow/cygnet_buildathon.png'
import oracleGenai from '../../assets/yellow/oracle_genai.png'
import ccaf from '../../assets/CCAF photo.jpg'
import './Certificate.css'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AUTO_SCROLL_INTERVAL = 3000;   // ms between automatic advances
const RESUME_DELAY = 5000;           // ms of inactivity before autoplay resumes
const DESKTOP_STEP = 350;            // px advance once the peek layout kicks in (md+)
const MOBILE_BREAKPOINT = 768;       // matches the md: breakpoint used below
const CARD_GAP = 24;                 // px — matches gap-6

const certificates = [
  {
    name: "Claude Certified Architect Foundations",
    link: "https://drive.google.com/file/d/1_5z3-da3GH_5B4hDm1nvt7ptdQNEVaAM/view",
    image: ccaf
  },
  {
    name: "Cygnet Build-A-Thon 2025",
    link: "https://drive.google.com/file/d/10SIk3cbqLy0g-UmeduP0A1XFfEyDkXWH/view",
    image: cygnetBuildathon
  },
  {
    name: "Oracle Cloud Infrastructure Generative AI Professional",
    link: "https://drive.google.com/file/d/1HmRbsvLPRNdXJcQccjxtgoI8A40-TDFM/view",
    image: oracleGenai
  },
  {
    name: "Database Management System",
    link: "https://drive.google.com/file/d/1ebnvjlfuwcv_dwKwK2_AppangMvqWGP_/view",
    image: nptel
  },
  {
    name: "Machine Learning",
    link: "https://drive.google.com/file/d/1jMS_nHq2_9DlFG5uhLI0d-pTtNTQ-rgq/view",
    image: coursera
  },
  {
    name: "Introduction to Cloud Development with HTML,CSS and JavaScript",
    link: "https://drive.google.com/file/d/19NyH5QdTMezlyGK6sqipbnvcippDoiyP/view",
    image: ibm
  },
  {
    name: "SSIP Hackathon Participation - 2023",
    link: "https://drive.google.com/file/d/1pfq_W3pBALaCdvIr2zM1fV0ijIvG5n_H/view",
    image: ssip
  },
];

const CertificateList = () => {
  const containerRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const prefersReducedMotion = useRef(false);

  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [progress, setProgress] = useState(0);

  // Measures the actual rendered card width (+ gap) so autoplay and arrow
  // taps always advance by exactly one card, however wide it's styled.
  const getStep = useCallback(() => {
    const el = containerRef.current;
    if (!el || !el.firstElementChild) return DESKTOP_STEP;
    if (window.innerWidth >= MOBILE_BREAKPOINT) return DESKTOP_STEP;
    return el.firstElementChild.getBoundingClientRect().width + CARD_GAP;
  }, []);

  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < maxScroll - 4);
    setProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
  }, []);

  const pauseThenResume = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  }, []);

  const scrollByAmount = useCallback((direction) => {
    containerRef.current?.scrollBy({
      left: direction * getStep(),
      behavior: prefersReducedMotion.current ? "auto" : "smooth",
    });
    pauseThenResume();
  }, [getStep, pauseThenResume]);

  // Pick up the user's reduced-motion preference and keep it live
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mq.matches;
    const handler = (e) => { prefersReducedMotion.current = e.matches; };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Keep arrow/fade/progress state in sync with actual scroll position
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // Autoplay — pauses on hover/touch/manual interaction and respects reduced motion
  useEffect(() => {
    if (isPaused || prefersReducedMotion.current) return undefined;
    const interval = setInterval(() => {
      const el = containerRef.current;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: getStep(), behavior: "smooth" });
      }
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, getStep]);

  useEffect(() => () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  }, []);

  return (
    <div
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={pauseThenResume}
    >
      {/* Edge fades hint that more cards are scrollable */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-4 sm:left-6 lg:left-8 top-2 bottom-6 w-8 md:w-10 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent z-[5] transition-opacity duration-300 ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-4 sm:right-6 lg:right-8 top-2 bottom-6 w-8 md:w-10 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent z-[5] transition-opacity duration-300 ${canScrollRight ? "opacity-100" : "opacity-0"}`}
      />

      {/* Navigation arrows — inset on mobile so they always stay inside the
          visible area (nothing to clip), and pop outside the card edge
          once there's room for the peek layout at md+ */}
      <button
        onClick={() => scrollByAmount(-1)}
        disabled={!canScrollLeft}
        className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-6 z-30 p-2.5 md:p-3 rounded-full bg-white dark:bg-neutral-800 shadow-lg border border-gray-200 dark:border-white/10 text-gray-500 hover:text-amber-500 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-gray-500"
        aria-label="Scroll to previous certificates"
      >
        <FaChevronLeft size={18} />
      </button>

      <button
        onClick={() => scrollByAmount(1)}
        disabled={!canScrollRight}
        className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-6 z-30 p-2.5 md:p-3 rounded-full bg-white dark:bg-neutral-800 shadow-lg border border-gray-200 dark:border-white/10 text-gray-500 hover:text-amber-500 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-gray-500"
        aria-label="Scroll to next certificates"
      >
        <FaChevronRight size={18} />
      </button>

      {/* Horizontal snap container — a comfortably-sized card with a small
          peek of its neighbor below md, the wider desktop peek layout at md+ */}
      <div
        ref={containerRef}
        tabIndex={0}
        role="region"
        aria-label="Certificates carousel"
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 pt-2 [overscroll-behavior-x:contain] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        {certificates.map((certificate) => (
          <div
            key={certificate.name}
            className="w-[95%] sm:w-[60%] md:w-[320px] shrink-0 snap-center"
          >
            <CertificateItem {...certificate} />
          </div>
        ))}
      </div>

      {/* Scroll progress */}
      <div className="h-1 w-24 md:max-w-xs mx-auto rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
        <div
          className="h-full bg-amber-500 rounded-full transition-[width] duration-300 ease-out"
          style={{ width: `${Math.max(progress, 8)}%` }}
        />
      </div>
    </div>
  );
};

export default CertificateList;