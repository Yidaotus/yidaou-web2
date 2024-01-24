"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import projects from "../../content/projects/projects.json";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeftIcon,
  DrawingPinFilledIcon,
  GitHubLogoIcon,
  Link2Icon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import GridButton from "@/components/ui/GridButton";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[number] | null
  >(null);

  return (
    <main className="text-white m-auto p-2 grid gap-2 max-w-6xl relative w-full sm:p-4 sm:gap-2 md:gap-3 md:p-6 lg:h-screen grid-cols-4 lg:gap-4  font-light lg:max-h-[800px]">
      <div className="col-span-4 lg:col-span-1 lg:row-span-2">
        <GridButton
          title="Back"
          href="/"
          icon={<ArrowLeftIcon className="w-full h-full" />}
        />
      </div>
      <Card className="col-span-4 lg:col-span-2 lg:row-span-2 ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DrawingPinFilledIcon className="w-4 h-4" />
            projects
          </CardTitle>
          <CardDescription>Recent or favorite projects of mine</CardDescription>
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

      {projects.map((project, i) => (
        <motion.div
          key={project.title}
          layoutId={project.title}
          className={`col-span-2 z-10 min-h-[100px]`}
        >
          <Card
            onClick={() => setSelectedProject(project)}
            className="h-full w-full cursor-pointer group overflow-hidden relative"
          >
            <Image
              className="absolute h-full w-full opacity-60 top-0 left-0 z-0 rounded-lg object-cover group-hover:scale-[1.02] transition-transform"
              fill
              src={`/projects/${project.image}`}
              alt={project.title}
            />
            <div className="z-10 px-4 py-2 flex flex-col justify-end h-full w-full">
              <h1 className="text-xl font-bold">{project.title}</h1>
            </div>
          </Card>
        </motion.div>
      ))}
      <AnimatePresence>
        <div
          key="viewcontainer"
          className={`fixed h-[90vh] w-screen py-4 px-4 top-1/2 left-0 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 md:w-[900px] md:h-[500px] z-40 ${
            selectedProject ? "block" : "hidden"
          }`}
        >
          {selectedProject && (
            <motion.div
              layoutId={selectedProject.title}
              className="w-full h-full z-50"
            >
              <Card className="h-full w-full opacity-100">
                <div
                  className="bg-cover bg-center bg-opacity-10 bg-no-repeat h-2/3 w-full rounded-t-lg opacity-80"
                  style={{
                    backgroundImage: `url(/projects/${selectedProject.image})`,
                  }}
                />
                <Tabs
                  defaultValue="about"
                  className="w-full h-1/3 overflow-hidden"
                >
                  <TabsList className="bg-secondary w-full rounded-none">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="technologies">Technologies</TabsTrigger>
                    <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="about"
                    className="px-8 py-4 grid items-center"
                  >
                    <div className="flex items-center">
                      <div className="relative flex flex-col justify-end w-full">
                        <h1 className="text-xl font-bold">
                          {selectedProject.title}
                        </h1>
                        <p className="text-lg">{selectedProject.description}</p>
                      </div>
                      <div className="flex justify-center h-full items-center gap-2">
                        <Button variant="ghost">
                          <Link href={selectedProject.repo}>
                            <GitHubLogoIcon className="w-8 h-8" />
                          </Link>
                        </Button>
                        {selectedProject.link && (
                          <Button variant="ghost">
                            <Link href={selectedProject.link}>
                              <Link2Icon className="w-8 h-8" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="technologies" className="px-8 py-4">
                    <div className="flex gap-2 items-center">
                      {selectedProject.technologies.map((tech) => (
                        <div key={tech}>{tech}</div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="challenges">
                    Change your password here.
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            onClick={() => setSelectedProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full bg-black z-30 cursor-pointer"
          />
        )}
      </AnimatePresence>
    </main>
  );
}
