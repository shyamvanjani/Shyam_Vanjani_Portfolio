import { useState, useRef, useCallback, useEffect } from "react";

/**
 * Custom hook to simulate AI-style text streaming.
 * Uses robust token-based chunking to preserve formatting and maximize performance.
 * @param {number} speed - Delay in ms between each tick (default 15ms)
 * @returns {{ displayedText: string, isStreaming: boolean, startStreaming: (text: string) => void, reset: () => void }}
 */
const useStreamText = (speed = 15) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  
  const intervalRef = useRef(null);
  const tokensRef = useRef([]);
  const currentIndex = useRef(0);

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
    tokensRef.current = [];
    currentIndex.current = 0;
  }, [cleanup]);

  const startStreaming = useCallback(
    (fullText) => {
      cleanup();
      setDisplayedText("");
      setIsStreaming(true);

      // Precisely split into tokens: alternating blocks of non-whitespace and whitespace
      const tokens = fullText.match(/(\S+|\s+)/g) || [];
      tokensRef.current = tokens;
      currentIndex.current = 0;

      intervalRef.current = setInterval(() => {
        const idx = currentIndex.current;
        const currentTokens = tokensRef.current;
        
        if (idx < currentTokens.length) {
          // ── Grab 3 tokens at once to triple the speed ──
          const nextIdx = Math.min(idx + 3, currentTokens.length);
          const chunk = currentTokens.slice(idx, nextIdx).join("");
          
          // Functional update guarantees React processes every single token
          setDisplayedText((prev) => prev + chunk);
          currentIndex.current = nextIdx;
        } else {
          // Strictly clears only when all tokens are fully processed
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
