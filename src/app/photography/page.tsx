"use client";

import GridButton from "@/components/ui/GridButton";
import ShuffleImage from "@/components/ui/ShuffleImage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sleep } from "@/lib/utils";
import { ArrowLeftIcon, CameraIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import BlurImg from "@/components/ui/BlurImg";
//

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const [shuffle, setShuffle] = useState(0);

  const updateKeyRandom = useCallback(async () => {
    await sleep(Math.random() * 10000 + 5000);
    setShuffle(shuffle + 1);
  }, [shuffle]);

  useEffect(() => {
    updateKeyRandom();
  }, [shuffle]);

  return (
    <main className="text-white m-auto p-2 grid gap-2 max-w-6xl overflow-hidden relative w-full sm:p-4 sm:gap-2 md:gap-3 md:p-6 lg:h-screen grid-cols-4 lg:gap-4 lg:max-h-[800px] font-light">
      <Card className="col-span-4 lg:col-span-2 lg:row-span-1 relative">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CameraIcon className="w-4 h-4" />
            photograhy
          </CardTitle>
          <CardDescription>One of my hobbies</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 w-32 z-0">
            <Image
              src="/mascot/char_photo.png"
              height={908}
              width={834}
              alt="Mascot Head"
              className="select-none opacity-25 md:opacity-100 pointer-events-none object-contain"
            />
          </div>
          <p className="text-xl pr-24 z-10 relative">
            Some photos I took I like landscape/nature and street photography.
            My equipment:
          </p>
          <ul className="list-inside list-disc pt-2">
            <li>Sony Alpha 6400</li>
            <li>Sigma 16mm f1.4</li>
            <li>Sony 18-135mm f/3.5-5.6</li>
            <li>CULLMANN - Alpha 2800</li>
            <li>Some relatively cheap ND/CPL filters</li>
          </ul>
        </CardContent>
      </Card>
      <Card className="col-span-4 lg:row-span-2 lg:col-span-1 relative overflow-hidden min-h-[100px]">
        <motion.div layoutId="00.jpg">
          <ShuffleImage
            onClick={(img) => setSelectedImage(img)}
            images={["00.jpg", "01.jpg", "03.jpg"]}
            shuffle={shuffle}
          />
        </motion.div>
      </Card>
      <Card className="col-span-4 lg:row-span-1 lg:col-span-1 relative overflow-hidden min-h-[100px]">
        <ShuffleImage
          onClick={(img) => setSelectedImage(img)}
          images={["04.jpg", "05.jpg", "08.jpg"]}
          shuffle={shuffle}
        />
      </Card>
      <Card className="col-span-4 lg:row-span-2 lg:col-span-1 relative overflow-hidden min-h-[100px]">
        <ShuffleImage
          onClick={(img) => setSelectedImage(img)}
          images={["10.jpg", "11.jpg", "13.jpg"]}
          shuffle={shuffle}
        />
      </Card>

      <div className="col-span-4 lg:col-span-1 lg:row-span-1  min-h-[100px]">
        <GridButton
          title="Back"
          href="/"
          icon={<ArrowLeftIcon className="w-full h-full" />}
        />
      </div>

      {
        // <Card className="lg:row-span-1 lg:col-span-1 relative overflow-hidden">
        //   <ShuffleImage
        //     images={["14.jpg", "_DSC0959.jpg", "_DSC1013.jpg"]}
        //     shuffle={shuffle}
        //   />
        // </Card>
      }

      <Card className="col-span-4 lg:row-span-1 lg:col-span-1 relative overflow-hidden min-h-[100px]">
        <ShuffleImage
          onClick={(img) => setSelectedImage(img)}
          images={["01.jpg", "13.jpg", "04.jpg"]}
          shuffle={shuffle}
        />
      </Card>
      <Card className="col-span-4 lg:row-span-1 lg:col-span-2 relative overflow-hidden min-h-[100px]">
        <ShuffleImage
          onClick={(img) => setSelectedImage(img)}
          images={["11.jpg", "08.jpg", "01.jpg"]}
          shuffle={shuffle}
        />
      </Card>
      <Card className="col-span-4 lg:row-span-1 lg:col-span-1 relative overflow-hidden min-h-[100px]">
        <ShuffleImage
          onClick={(img) => setSelectedImage(img)}
          images={["08.jpg", "03.jpg", "05.jpg"]}
          shuffle={shuffle}
        />
      </Card>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed h-full w-full md:h-[50vh] md:w-[50vw] top-1/2 left-1/2 z-50 rounded"
          >
            <Image
              priority
              fill
              alt={selectedImage}
              src={`/photos/${selectedImage}`}
              className="object-contain md:object-contain object-center rounded"
              sizes="50vw"
              placeholder="blur"
              blurDataURL={"data:image/jpeg;base64," + BlurImg}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed h-screen w-screen left-0 top-0 z-40 bg-opacity-50 bg-black"
          />
        )}
      </AnimatePresence>
    </main>
  );
}
