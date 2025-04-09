"use client";

import { useState } from "react";
import Chatting from "./components/Chatting";
import BotSelector from "./components/BotSelector";
import MatrixBackground from "./components/MatrixBackground";

type Bot = {
  name: string;
  emoji: string;
};


export default function HomePage() {
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

  if (!selectedBot) {
    return <BotSelector onSelect={(bot) => setSelectedBot(bot)} />;
  }

  return (
    <>
      <Chatting bot={selectedBot}/>
    </>


  )
}
