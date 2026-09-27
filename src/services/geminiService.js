/**
 * Gemini AI Service — frontend client.
 *
 * Sends chat requests to our own Vercel serverless function at /api/chat,
 * which proxies them to Google's Gemini API. The API key and system prompt
 * live exclusively on the server — nothing sensitive is in the browser bundle.
 */

/**
 * Sends a user question to the backend /api/chat endpoint.
 * @param {string} userMessage — the question typed by the user
 * @param {Array<{type: string, text: string}>} chatHistory — previous messages for context
 * @returns {Promise<string>} — the AI's response text
 * @throws {Error} if the API call fails for any reason
 */
export const askGemini = async (userMessage, chatHistory = []) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: userMessage,
      history: chatHistory.slice(-6),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `API error ${response.status}`);
  }

  if (!data.reply) {
    throw new Error("No reply from AI service");
  }

  return data.reply;
};
