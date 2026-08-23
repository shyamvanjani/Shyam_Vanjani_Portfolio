import { useState, useRef, useCallback, useEffect } from "react";

/**
 * Custom hook to simulate AI-style word-by-word text streaming.
 * @param {number} speed - Delay in ms between each word (default 40ms)
 * @returns {{ displayedText: string, isStreaming: boolean, startStreaming: (text: string) => void, reset: () => void }}
 */
const useStreamText = (speed = 40) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const intervalRef = useRef(null);
  const wordsRef = useRef([]);
  const indexRef = useRef(0);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    cleanup();
    setDisplayedText("");
    setIsStreaming(false);
    wordsRef.current = [];
    indexRef.current = 0;
  }, [cleanup]);

  const startStreaming = useCallback(
    (fullText) => {
      cleanup();
      setDisplayedText("");
      setIsStreaming(true);

      const words = fullText.split(" ");
      wordsRef.current = words;
      indexRef.current = 0;

      intervalRef.current = setInterval(() => {
        const idx = indexRef.current;
        const words = wordsRef.current;
        if (idx < words.length) {
          const word = words[idx];
          setDisplayedText((prev) => {
            if (idx === 0) return word;
            return prev + " " + word;
          });
          indexRef.current = idx + 1;
        } else {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsStreaming(false);
        }
      }, speed);
    },
    [speed, cleanup]
  );

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { displayedText, isStreaming, startStreaming, reset };
};

export default useStreamText;
