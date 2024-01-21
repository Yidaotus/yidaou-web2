"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WELCOMES = [
  "Welcome",
  "ようこそ",
  "Bienvenue",
  "어서 오세요",
  "Välkommen",
  "欢迎",
  "Wilkommen",
  "歡迎光臨",
  "Tervetuloa",
  "歡迎",
  "Velkommen",
];

const WelcomeBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setIndex((oldIndex) => {
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * WELCOMES.length);
          } while (oldIndex === newIndex);
          return newIndex;
        }),
      Math.random() * 2000 + 3000,
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className="relative overflow-hidden h-6">
      <AnimatePresence>
        <motion.div
          className="absolute"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
          key={index}
        >
          {WELCOMES[index % WELCOMES.length]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WelcomeBanner;
