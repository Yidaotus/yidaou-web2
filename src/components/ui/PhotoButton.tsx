"use client";

import ShuffleImage from "./ShuffleImage";
import { useCallback, useEffect, useState } from "react";
import { sleep } from "@/lib/utils";
import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const PhotoButton = () => {
  const [shuffle, setShuffle] = useState(0);

  const updateKeyRandom = useCallback(async () => {
    await sleep(Math.random() * 10000 + 5000);
    setShuffle(shuffle + 1);
  }, [shuffle]);

  useEffect(() => {
    updateKeyRandom();
  }, [updateKeyRandom]);

  return (
    <Link
      className="w-full h-full relative overflow-hidden group flex items-center justify-center cursor-pointer min-h-[100px] hover:scale-[1.05] transition-transform"
      href="/photography"
    >
      <ShuffleImage
        onClick={() => {}}
        images={["14.jpg", "00.jpg", "08.jpg", "15.jpg"]}
        shuffle={shuffle}
      />
      <ArrowTopRightIcon className="w-12 h-12 absolute top-1/2 right-4 -translate-y-1/2 hover:scale-[1.05]" />
      <div className="bg-black bg-opacity-20 absolute w-full h-full top-0 left-0" />
    </Link>
  );
};

export default PhotoButton;
