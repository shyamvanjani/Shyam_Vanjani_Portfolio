import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBriefcase,
  FaBolt,
  FaRocket,
  FaCertificate,
  FaGlobe,
  FaFileLines,
  FaPaperPlane,
  FaArrowRotateLeft,
} from "react-icons/fa6";
import { FiSun, FiMoon } from "react-icons/fi";
import { chatResponses } from "../../data/chatResponses";
import useStreamText from "../../hooks/useStreamText";

// ─── Quick-Action Button Data ──────────────────────────────
const quickActions = [
  { id: "about", label: "About Me", icon: <FaUser /> },
  { id: "experience", label: "Experience", icon: <FaBriefcase /> },
  { id: "skills", label: "Skills", icon: <FaBolt /> },
  { id: "projects", label: "Projects", icon: <FaRocket /> },
  { id: "certificates", label: "Certificates", icon: <FaCertificate /> },
];

const RESUME_LINK =
  "https://drive.google.com/file/d/1Bv8DhOc2WjZMvs9i9mZSgRTG_Jhf18Y9/view?usp=drive_link";

// ─── Intent classification ─────────────────────────────────
const topicKeywords = {
  skills: {
    words: ["skill", "skills", "tech", "technology", "technologies", "language", "framework", "toolkit", "stack"],
    phrases: ["tech stack", "programming language"],
  },
  projects: {
    words: ["project", "projects", "portfolio", "built", "app", "application", "showcase"],
    phrases: ["what have you built", "things you've made"],
  },
  experience: {
    words: ["experience", "job", "jobs", "role", "career", "company", "companies", "employer"],
    phrases: ["work experience", "worked at", "where do you work", "where have you worked"],
  },
  certificates: {
    words: ["certificate", "certificates", "certification", "certifications", "course", "courses", "achievement", "achievements"],
    phrases: [],
  },
  about: {
    words: ["yourself", "background", "bio", "intro", "introduction"],
    phrases: [
      "about you",
      "about yourself",
      "about your self",
      "about shyam",
      "who are you",
      "who is shyam",
      "tell me about shyam",
      "introduce yourself",
      "introduce your self",
    ],
  },
};

const TOPIC_ORDER = ["about", "experience", "skills", "projects", "certificates"];

const EVERYTHING_PATTERNS = [
  /\beverything\b/i,
  /\ball about (you|yourself|shyam)\b/i,
  /\btell me all\b/i,
  /\bfull (details|overview|summary)\b/i,
  /\bcomplete (details|overview|profile|summary)\b/i,
  /\bfull profile\b/i,
];

const classifyIntents = (text) => {
  if (EVERYTHING_PATTERNS.some((re) => re.test(text))) {
    return TOPIC_ORDER.map((t) => ({ topic: t, score: 1 }));
  }

  const scores = {};

  for (const [topic, { words, phrases }] of Object.entries(topicKeywords)) {
    let score = 0;

    for (const word of words) {
      const re = new RegExp(`\\b${word}\\b`, "i");
      if (re.test(text)) score += 1;
    }

    for (const phrase of phrases) {
      const re = new RegExp(`\\b${phrase}\\b`, "i");
      if (re.test(text)) score += 2;
    }

    if (score > 0) scores[topic] = score;
  }

  return TOPIC_ORDER.filter((t) => scores[t] > 0).map((t) => ({ topic: t, score: scores[t] }));
};

const buildResponse = (matchedTopics) => {
  if (matchedTopics.length === 0) return null;

  if (matchedTopics.length === 1) {
    return chatResponses[matchedTopics[0].topic].response;
  }

  const topics = matchedTopics.map((m) => m.topic);
  const intro =
    topics.length >= 4
      ? "Happy to walk you through everything — here's the full picture:"
      : "Happy to cover all of that — here's a rundown:";

  const sections = topics.map((topic) => {
    const data = chatResponses[topic];
    return `**${data.title}**\n\n${data.short}`;
  });

  return `${intro}\n\n${sections.join("\n\n")}`;
};

// ─── Markdown-lite renderer for bold and bullet points ─────
const renderFormattedText = (text) => {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={j} className="font-semibold text-amber-600 dark:text-amber-400">
            {part.slice(2, -2)}
          </span>
        );
      }
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        return (
          <span key={j} className="italic text-gray-500 dark:text-slate-400">
            {part.slice(1, -1)}
          </span>
        );
      }
      return <span key={j}>{part}</span>;
    });

    if (line.startsWith("•") || line.startsWith("📜") || line.startsWith("🏆")) {
      return (
        <div key={i} className="pl-2 py-0.5">
          {rendered}
        </div>
      );
    }
    if (line.trim() === "") {
      return <div key={i} className="h-2" />;
    }
    return (
      <div key={i} className="py-0.5">
        {rendered}
      </div>
    );
  });
};

// ─── Main Component ────────────────────────────────────────
const AIChatLanding = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);
  const { displayedText, isStreaming, startStreaming, reset } = useStreamText(35);
  const [activeStreamIndex, setActiveStreamIndex] = useState(-1);

  const [isProcessing, setIsProcessing] = useState(false);
  const prevIsStreaming = useRef(false);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, displayedText]);

  useEffect(() => {
    if (activeStreamIndex >= 0 && displayedText) {
      setMessages((prev) => {
        const updated = [...prev];
        if (updated[activeStreamIndex]) {
          updated[activeStreamIndex] = {
            ...updated[activeStreamIndex],
            text: displayedText,
          };
        }
        return updated;
      });
    }
  }, [displayedText, activeStreamIndex]);

  useEffect(() => {
    if (prevIsStreaming.current === true && isStreaming === false) {
      setIsProcessing(false);
    }
    prevIsStreaming.current = isStreaming;
  }, [isStreaming]);

  const handleQuickAction = useCallback(
    (actionId) => {
      if (isProcessing) return;
      const data = chatResponses[actionId];
      if (!data) return;

      if (!chatActive) setChatActive(true);
      reset();
      setIsProcessing(true);

      const userMsg = { type: "user", text: data.question };
      const aiMsg = { type: "ai", text: "" };

      setMessages((prev) => {
        const newMessages = [...prev, userMsg, aiMsg];
        setActiveStreamIndex(newMessages.length - 1);
        return newMessages;
      });

      setTimeout(() => {
        startStreaming(data.response);
      }, 600);
    },
    [chatActive, reset, startStreaming, isProcessing]
  );

  const handleInputSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (isProcessing) return;
      const trimmed = inputValue.trim().toLowerCase();
      if (!trimmed) return;

      const matchedTopics = classifyIntents(trimmed);
      const responseText = buildResponse(matchedTopics);

      if (responseText) {
        setInputValue("");
        if (!chatActive) setChatActive(true);
        reset();
        setIsProcessing(true);

        const userMsg = { type: "user", text: inputValue.trim() };
        const aiMsg = { type: "ai", text: "" };
        setMessages((prev) => {
          const newMessages = [...prev, userMsg, aiMsg];
          setActiveStreamIndex(newMessages.length - 1);
          return newMessages;
        });
        setTimeout(() => {
          startStreaming(responseText);
        }, 600);
      } else {
        if (!chatActive) setChatActive(true);
        const userMsg = { type: "user", text: inputValue.trim() };
        const aiMsg = {
          type: "ai",
          text: "Hey! I can tell you about my background, experience, skills, projects, or certifications — feel free to ask about more than one at once. Try one of the buttons below, or just ask naturally.",
        };
        setMessages((prev) => [...prev, userMsg, aiMsg]);
        setInputValue("");
      }
    },
    [inputValue, chatActive, reset, startStreaming, isProcessing]
  );

  const handleReset = () => {
    reset();
    setChatActive(false);
    setMessages([]);
    setActiveStreamIndex(-1);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0c0e] text-gray-900 dark:text-white flex flex-col relative overflow-hidden transition-colors duration-500">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 dark:bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-amber-500/3 dark:bg-amber-600/3 rounded-full blur-[100px]" />
      </div>

      {/* ─── THEME TOGGLE — fixed top-right ─── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed z-50 p-2.5 sm:p-3 rounded-xl shadow-sm transition-colors duration-300 group ${
          chatActive
            ? "top-3 right-16 sm:top-5 sm:right-40"
            : "top-4 right-4 sm:top-6 sm:right-6"
        } bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-neutral-800`}
        id="theme-toggle"
        aria-label="Toggle theme"
      >
        {darkMode ? (
          <FiSun className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-amber-400 transition-colors duration-150" />
        ) : (
          <FiMoon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-amber-500 transition-colors duration-150" />
        )}
      </motion.button>

      {/* ─── FLOATING RESET BUTTON ─── */}
      <AnimatePresence>
        {chatActive && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={handleReset}
            className="fixed top-3 right-3 sm:top-5 sm:right-5 z-50 flex items-center justify-center gap-2 w-10 h-10 sm:w-auto sm:h-auto sm:pl-3 sm:pr-4 sm:py-2 rounded-full bg-white/80 dark:bg-[#1a1810]/90 border border-gray-200 dark:border-amber-500/30 backdrop-blur-xl text-xs sm:text-sm text-gray-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 hover:border-amber-500/50 shadow-lg shadow-gray-300/50 dark:shadow-black/50 transition-colors duration-200"
            id="reset-chat"
            aria-label="Start a new chat"
          >
            <FaArrowRotateLeft className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">New Chat</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── HERO GROUP ─── */}
      <div className={`flex-1 flex flex-col z-10 ${chatActive ? "overflow-hidden" : "justify-center"}`}>
        {/* ─── HEADER ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            layout
            className={`flex flex-col items-center ${
              chatActive
                ? "pt-4 pb-3 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#0d0c0e]/90 backdrop-blur-xl sticky top-0"
                : "pb-6 sm:pb-8"
            }`}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              layout="position"
              className={`text-gray-500 dark:text-slate-400 font-light ${
                chatActive ? "text-xs sm:text-sm" : "text-sm sm:text-base md:text-lg mb-3 sm:mb-4"
              }`}
              transition={{ duration: 0.5 }}
            >
              Hey, I'm Shyam 👋
            </motion.p>

            {!chatActive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 sm:mb-6 leading-tight px-4"
              >
                <TypeAnimation
                  sequence={[
                    "Full Stack Software Engineer",
                    2500,
                    "Java Backend Developer",
                    2500,
                    "Spring Boot Architect",
                    2500,
                    "React.js Developer",
                    2500,
                  ]}
                  speed={40}
                  wrapper="span"
                  repeat={Infinity}
                  className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 dark:from-amber-400 dark:via-amber-500 dark:to-amber-600 bg-clip-text text-transparent"
                />
              </motion.div>
            )}

            <motion.div
              layout="position"
              className={`relative ${
                chatActive ? "w-8 h-8 sm:w-10 sm:h-10" : "w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mb-6 sm:mb-8"
              }`}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={`w-full h-full rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center font-bold text-[#0d0c0e] ${
                  chatActive ? "text-xs sm:text-sm" : "text-2xl sm:text-4xl md:text-5xl"
                }`}
              >
                SV
              </div>
              {!chatActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-amber-400/40"
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(245,158,11,0.2), 0 0 30px rgba(245,158,11,0.1)",
                      "0 0 25px rgba(245,158,11,0.4), 0 0 50px rgba(245,158,11,0.2)",
                      "0 0 15px rgba(245,158,11,0.2), 0 0 30px rgba(245,158,11,0.1)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ─── CHAT MESSAGES ─── */}
        {chatActive && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pt-14 sm:pt-4 pb-4 space-y-4 chat-scroll-area"
          >
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.type === "ai" && (
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[10px] font-bold text-[#0d0c0e]">
                        SV
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 text-sm leading-relaxed ${
                      msg.type === "user"
                        ? "chat-bubble-user text-amber-900 dark:text-amber-100"
                        : "chat-bubble-ai text-gray-700 dark:text-slate-200"
                    }`}
                  >
                    {msg.type === "ai" ? (
                      <div className="whitespace-pre-wrap">
                        {renderFormattedText(msg.text)}
                        {isStreaming && i === activeStreamIndex && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-block w-2 h-4 bg-amber-500 dark:bg-amber-400 ml-0.5 rounded-sm align-middle"
                          />
                        )}
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </motion.div>
        )}

        {/* ─── INPUT & ACTIONS ─── */}
        <div
          className={
            chatActive
              ? "z-10 px-4 sm:px-6 md:px-8 pb-4 pt-3 border-t border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#0d0c0e]/90 backdrop-blur-xl"
              : "z-10 px-4 sm:px-6 md:px-8 flex flex-col items-center"
          }
        >
          <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleInputSubmit}>
              <div className={`chat-input-glass flex items-center px-4 py-3 sm:py-3.5 gap-3 ${isProcessing ? "opacity-70" : ""}`}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isProcessing ? "Typing response..." : "Ask me anything about Shyam..."}
                  className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 font-light disabled:cursor-not-allowed"
                  id="chat-input"
                  disabled={isProcessing}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isProcessing}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#0d0c0e] hover:from-amber-500 hover:to-amber-700 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                  id="chat-submit"
                >
                  <FaPaperPlane className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mt-4 mb-4">
              {quickActions.map((action) => (
                <motion.button
                  key={action.id}
                  whileHover={!isProcessing ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!isProcessing ? { scale: 0.97 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  onClick={() => handleQuickAction(action.id)}
                  disabled={isProcessing}
                  className={`quick-action-pill flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-gray-600 dark:text-slate-300 ${
                    !isProcessing ? "hover:text-amber-600 dark:hover:text-amber-300" : "opacity-50 cursor-not-allowed"
                  }`}
                  id={`action-${action.id}`}
                >
                  <span className="text-amber-500">{action.icon}</span>
                  {action.label}
                </motion.button>
              ))}

              <motion.a
                href={RESUME_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="quick-action-pill flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-gray-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300"
                id="action-resume"
              >
                <span className="text-amber-500">
                  <FaFileLines />
                </span>
                Resume
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onClick={() => navigate("/portfolio")}
                className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-[#0d0c0e] hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/20"
                id="action-portfolio"
              >
                <FaGlobe />
                View Classic Portfolio
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {!chatActive && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-[10px] sm:text-xs text-gray-400 dark:text-slate-600 pb-4 z-10"
        >
          © {new Date().getFullYear()} Shyam Vanjani
        </motion.p>
      )}
    </div>
  );
};

export default AIChatLanding;