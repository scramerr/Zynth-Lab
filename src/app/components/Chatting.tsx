// app/components/Chat.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import GridBackground from "./GridBackground";

type Bot = {
  name: string;
  emoji: string;
};

const greetingMap: Record<string, string> = {
  ChadGPT: "Yo yo yo, what’s the question, human?",
  GigachadAI: "RAWR. I answer questions. Fear me.",
  PepeGPT: "Oh great, another user. Let's do this...",
};

const suggestions = [
  "What are your business hours?",
  "How do I contact support?",
  "What is your return policy?",
];

export default function Chatting({ bot }: { bot: Bot }) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState([
    { sender: "ai", text: greetingMap[bot.name] ?? "Ask me something!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // auto‑scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ question: input }),
    });

    const { answer } = await res.json();
    let typedText = "";

    typeWriterEffect(
      answer,
      (char) => {
        // on each character
        typedText += char;
        setMessages([...newMessages, { sender: "ai", text: typedText }]);
      },
      () => {
        setIsTyping(false);
      }
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white px-2">
      {/* techy grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GridBackground />
      </div>

      {/* chat container */}
      <div className="relative z-10 w-full max-w-xl mx-auto bg-zinc-900/60 backdrop-blur-md border border-zinc-700 p-4 sm:p-6 rounded-2xl shadow-2xl flex flex-col gap-4">
        {/* title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl text-center font-extrabold tracking-wider text-transparent bg-gradient-to-r from-zinc-400 via-blue-500 to-purple-600 bg-clip-text animate-gradient-x"
        >
          Zynth Bot 🤖
        </motion.h1>

        {/* messages */}
        <div className="flex-1 h-[60vh] sm:h-96 overflow-y-auto space-y-3 px-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "ai" ? "justify-start" : "justify-end"
                }`}
            >
              {msg.sender === "ai" && (
                <div className="mr-2 text-2xl">{bot.emoji}</div>
              )}

              <div
                className={`px-3 py-2 rounded-lg max-w-[75%] sm:max-w-[70%] text-sm sm:text-base text-white ${msg.sender === "ai"
                  ? "bg-zinc-800"
                  : "bg-blue-600"
                  }`}
              >
                {msg.text}
              </div>

              {msg.sender === "user" && (
                <div className="ml-2 text-2xl">🧑</div>
              )}
            </div>
          ))}

          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-zinc-800 text-zinc-400 px-3 py-2 rounded-xl w-fit text-sm sm:text-base"
            >
              <TypingDots />
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* input & send */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask something..."
            className="flex-1 px-3 py-2 rounded-xl bg-zinc-800 text-white placeholder-zinc-400 outline-none border border-zinc-700 focus:ring-2 ring-blue-500 text-sm sm:text-base"
          />
          <button
            onClick={sendMessage}
            disabled={isTyping}
            className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition ${isTyping
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              } text-sm sm:text-base`}
          >
            {isTyping ? (
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            ) : (
              "Send"
            )}
          </button>
        </div>

        {/* suggestions */}
        <div className="flex flex-wrap justify-center gap-2 mt-3 px-1">
          {suggestions.map((q, i) => (
            <button
              key={i}
              onClick={() => setInput(q)}
              className="relative text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-zinc-700 text-white overflow-hidden transition-all duration-300 group max-w-[90vw] whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x opacity-30 blur-sm group-hover:opacity-70 transition-all duration-500" />
              <span className="relative z-10">{q}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// typing dots
const TypingDots = () => (
  <div className="flex space-x-1">
    {[...Array(3)].map((_, i) => (
      <motion.span
        key={i}
        className="block w-2 h-2 bg-zinc-400 rounded-full"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}
  </div>
);

// typewriter effect
function typeWriterEffect(
  text: string,
  onChar: (char: string) => void,
  onDone: () => void
) {
  let index = 0;
  const typeNext = () => {
    if (index < text.length) {
      onChar(text[index]);
      index++;
      setTimeout(typeNext, 18);
    } else {
      onDone();
    }
  };
  typeNext();
}
