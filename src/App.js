import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import PreLoader from "./components/Loader/Loader";
import AIChatLanding from "./components/AIChatLanding/AIChatLanding";
import ClassicPortfolio from "./components/ClassicPortfolio/ClassicPortfolio";

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      {loading ? (
        <PreLoader loading={loading} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <AIChatLanding
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              }
            />
            <Route
              path="/portfolio"
              element={
                <ClassicPortfolio
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              }
            />
          </Routes>
        </motion.div>
      )}
    </div>
  );
}

export default App;
