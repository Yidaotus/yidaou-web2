"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type ShuffleImageProps = {
  images: Array<string>;
  shuffle: number;
  onClick?: (img: string) => void;
};

const ShuffleImage = ({ images, shuffle, onClick }: ShuffleImageProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key={images[shuffle % images.length]}
        className="absolute left-0 top-0 h-full w-full"
        initial={{ x: "100%" }}
        exit={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        onClick={() => onClick?.(images[shuffle % images.length])}
      >
        <Image
          priority
          sizes="50vh"
          src={`/photos/${images[shuffle % images.length]}`}
          fill
          alt="00"
          className="rounded-[var(--radius)] object-cover hover:scale-[1.03] transition-transform object-center"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ShuffleImage;
