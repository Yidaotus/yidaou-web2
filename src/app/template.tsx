"use client";

import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  //const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  const cardsOut = async () => {
    const animateFrom =
      document.documentElement.clientWidth > 500 ? "center" : "first";
    animate(
      ".card",
      { x: -200, opacity: 1 },
      {
        delay: stagger(0.2, { from: animateFrom, ease: (p) => Math.sin(p) }),
        duration: 0.6,
        ease: "easeOut",
      },
    );
  };

  const cardsIn = async () => {
    const animateFrom =
      document.documentElement.clientWidth > 500 ? "center" : "first";
    await animate(".card", { x: 200, opacity: 0 }, { duration: 0 });
    animate(
      ".card",
      { x: 0, opacity: 1 },
      {
        delay: stagger(0.2, { from: animateFrom, ease: (p) => Math.sin(p) }),
        duration: 0.6,
        ease: "easeOut",
      },
    );
  };

  // useEffect(() => {
  //   if (isPresent) {
  //     cardsIn();
  //   } else {
  //     cardsOut();
  //   }
  // }, [isPresent]);

  // useEffect(() => {
  //   cardsIn();
  // }, [cardsIn]);

  return <div>{children}</div>
  // return <motion.div ref={scope}>{children}</motion.div>;
}
