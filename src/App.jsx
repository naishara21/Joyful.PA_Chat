import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-4 flex flex-col justify-center items-center">
      <form
        onSubmit={generateAnswer}
        className="w-full max-w-lg text-center rounded-lg shadow-xl bg-white py-6 px-4 transition-transform duration-500 transform hover:scale-105"
      >
        <a href="https://github.com/Vishesh-Pandey/chat-ai" target="_blank" rel="noopener noreferrer">
          <h1 className="text-5xl font-bold text-[#0B3040] mb-6 animate-bounce">Chat AI</h1>
        </a>
        <textarea
          required
          className="border border-gray-300 rounded w-full my-2 min-h-fit p-4 transition-all duration-300 focus:border-[#0B3040] focus:shadow-lg"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything"
        ></textarea>
        <button
          type="submit"
          className={`bg-[#0B3040] text-white p-4 rounded-md hover:bg-blue-600 transition-all duration-300 ${
            generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={generatingAnswer}
        >
          Generate answer
        </button>
      </form>
      <div className="w-full max-w-lg text-center rounded-lg bg-white my-6 shadow-xl transition-transform duration-500 transform hover:scale-105">
        <ReactMarkdown className="p-6 text-[#0B3040]">{answer}</ReactMarkdown>
      </div>
    </div>
  );
}

export default App;
