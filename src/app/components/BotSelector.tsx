import { motion } from "framer-motion";
import GridBackground from "./GridBackground";

type Bot = {
  name: string;
  emoji: string;
  description: string;
};

export default function BotSelector({ onSelect }: { onSelect: (bot: Bot) => void }) {
  const bots: Bot[] = [
    {
      name: "ChadGPT",
      emoji: "💪",
      description: "No cap, I answer everything with 100% Sigma focus.",
    },
    {
      name: "GigachadAI",
      emoji: "🧠",
      description: "Only spits facts and sarcasm.",
    },
    {
      name: "PepeGPT",
      emoji: "🐸",
      description: "The most based assistant. Will troll you with truth.",
    },
  ];

  return (
    
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12 text-white">
        <div className="absolute inset-0 z-0 pointer-events-none">
        <GridBackground />
      </div>
      {/* 🔥 Animated Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-blue-400 to-teal-300 bg-clip-text text-transparent animate-gradient-x">
          Welcome to the Zynth Lab
        </h1>
        <p className="mt-2 font-extrabold text-zinc-400 text-lg">
          Choose your AI companion below 🤖
        </p>
      </motion.div>

      {/* Bot Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {bots.map((bot) => (
          <button
            key={bot.name}
            onClick={() => onSelect(bot)}
            className="bg-zinc-800 hover:bg-zinc-700 transition-colors px-8 py-6 rounded-xl text-center w-64 border border-zinc-700 shadow-md"
          >
            <div className="text-4xl mb-2">{bot.emoji}</div>
            <h2 className="text-xl font-semibold">{bot.name}</h2>
            <p className="text-sm mt-1 text-zinc-400">{bot.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
