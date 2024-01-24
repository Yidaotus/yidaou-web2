"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import projects from "../../content/projects/projects.json";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <main className="m-auto p-2 grid gap-2 max-w-6xl relative w-full sm:p-4 sm:gap-2 md:gap-3 md:p-6 lg:h-screen md:grid-cols-4 lg:gap-4  font-light lg:max-h-[800px]">
      <Card className="lg:col-span-1 lg:row-span-1 ">Back</Card>
      <Card className="lg:col-span-3 lg:row-span-2 ">
        <CardHeader>
          <CardTitle className="text-muted-foreground">projects</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 w-32 z-0">
            <Image
              src="/mascot/char_creative.png"
              height={908}
              width={834}
              alt="Mascot Head"
              className="select-none opacity-25 md:opacity-100 pointer-events-none object-contain"
            />
          </div>
          <p className="text-xl pr-24 z-10 relative">
            Here are some recent projects Ive been working on and their
            respective source codes. I like to test out new libraries and
            technologies, but my go to tech stack is:
          </p>
          <ul className="list-inside list-disc pt-2">
            <li>Next.js</li>
            <li>Typescript / Rust</li>
            <li>React / Vue</li>
            <li>PostgreSQL / MongoDB</li>
            <li>Vercel / Netlify / Supabase</li>
            <li>tRPC / GraphQL</li>
          </ul>
        </CardContent>
      </Card>
      <Card className="lg:col-span-1 lg:row-span-1 ">Back</Card>

      <Card className="col-span-4 relative">
        <Carousel
          className="h-[400px]"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent className="h-[400px]">
            {projects.map((project) => (
              <CarouselItem key={project.title} className="basis-2/3">
                <Card
                  className="h-full w-full cursor-pointer group overflow-hidden relative"
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image
                      className="absolute h-full w-full opacity-60 top-0 left-0 z-0 object-cover group-hover:scale-[1.02] transition-transform"
                      fill
                      src={`/projects/${project.image}`}
                      alt={project.title}
                    />
                    <div className="relative z-10 px-4 py-2 flex flex-col justify-end h-full w-full">
                      <h1 className="text-xl font-bold">{project.title}</h1>
                      <p className="text-lg">{project.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Card>
    </main>
  );
}
