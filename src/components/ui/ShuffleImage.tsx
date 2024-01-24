"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type ShuffleImageProps = {
  images: Array<string>;
  shuffle: number;
  onClick: (img: string) => void;
};

const ShuffleImage = ({ images, shuffle, onClick }: ShuffleImageProps) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((key + 1) % images.length);
  }, [shuffle]);

  return (
    <AnimatePresence>
      <motion.div
        key={images[key]}
        className="absolute left-0 top-0 h-full w-full"
        initial={{ x: "100%" }}
        exit={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        onClick={() => onClick(images[key])}
      >
        <Image
          priority
          sizes="50vw"
          src={`/photos/${images[key]}`}
          fill
          alt="00"
          className="rounded-[var(--radius)] object-cover hover:scale-[1.03] transition-transform object-center"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ShuffleImage;
