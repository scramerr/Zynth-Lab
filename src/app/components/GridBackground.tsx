"use client";
import { motion } from "framer-motion";

export default function GridBackground() {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ backgroundPosition: "0% 0%" }}
      animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
      transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
  );
}
