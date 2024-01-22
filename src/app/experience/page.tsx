import WelcomeBanner from "@/components/ui/WelcomeBanner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MediumIcon } from "@/components/ui/icons";
import {
  ArrowLeftIcon,
  BackpackIcon,
  CodeIcon,
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  ThickArrowDownIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import experiences from "../../content/profile/experiences.json";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Fragment } from "react";
import tech from "../../content/tech.json";
import Link from "next/link";
import GridButton from "@/components/ui/GridButton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Home() {
  return (
    <main className="text-white m-auto p-2 grid gap-2 grid-cols-4 max-w-6xl overflow-hidden relative w-full sm:p-4 sm:gap-2 md:gap-3 md:p-6 lg:h-screen lg:gap-4  lg:max-h-[800px]">
      <Card className="col-span-4 row-span-2 lg:col-span-3 md:row-span-1 lg:row-span-1 relative">
        <CardHeader>
          <CardTitle>
            <WelcomeBanner />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 h-2/3 md:h-full aspect-[486/1000] z-0 overflow-hidden object-center pr-2 md:pt-2">
            <Image
              src="/mascot/char_contact.png"
              height={1000}
              width={486}
              alt="Mascot Head"
              className="select-none opacity-25 lg:opacity-50 pointer-events-none object-cover"
            />
          </div>
          <p className="text-xl pr-24 z-10 relative">
            Im <span className="font-bold">Daniel</span> 30 years old living and
            working in Düsseldorf as an independent Full Stack and Salesforce
            Software Developer.
          </p>
        </CardContent>
        <CardFooter className="flex space-x-4">
          <Button variant="outline" size="logo">
            <GitHubLogoIcon className="h-6 w-6" />
          </Button>
          <Button variant="outline" size="logo">
            <MediumIcon size={6} />
          </Button>
          <Button variant="outline" size="logo">
            <LinkedInLogoIcon className="h-6 w-6" />
          </Button>
          <Button variant="outline" size="logo">
            <EnvelopeOpenIcon className="h-6 w-6" />
          </Button>
        </CardFooter>
      </Card>

      <Card className="col-span-4 lg:col-span-1 lg:row-span-2">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CodeIcon className="w-5 h-5" /> Tech I like
          </CardTitle>
          <CardDescription>Tech I am currently using</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex gap-4 flex-wrap justify-center">
            {tech.map((t) => (
              <li key={t.techId} className="w-14 h-14 relative">
                <Link href={t.link}>
                  <Image src={t.icon} fill alt={t.name} />
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-3 row-span-2 relative h-[520px]">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BackpackIcon className="w-5 h-5" /> Experience
          </CardTitle>
          <CardDescription>My profesional working experience</CardDescription>
        </CardHeader>
        <ScrollArea className="">
          <div className="flex gap-2 pr-4">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] relative">
              {experiences.map((experience) => (
                <Fragment key={experience.title}>
                  <div className="hidden lg:block border-l-muted-foreground border-l-2 left-8 top-12 w-2 absolute h-full" />
                  <CardHeader className="col-span-2 relative">
                    <div className="sticky top-4">
                      <div className="flex">
                        <div className="hidden lg:block border-muted-foreground border-2 bg-muted-foreground rounded-full w-4 h-4 relative top-4 left-[1px]" />
                        <div className="flex flex-col">
                          <CardTitle className="text-lg lg:pl-8">
                            {experience.title}
                          </CardTitle>
                          <CardDescription className="lg:pl-8">
                            <div>{experience.company}</div>
                            <div>
                              {new Date(
                                experience.startDate,
                              ).toLocaleDateString()}{" "}
                              -{" "}
                              {experience.endDate
                                ? new Date(
                                    experience.endDate,
                                  ).toLocaleDateString()
                                : "present"}
                            </div>
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col space-y-1  md:pl-20 col-span-2 relative z-10">
                    <ul className="list-disc list-inside space-y-1">
                      {experience.activities.map((activity) => (
                        <li
                          className="list-item text-muted-foreground"
                          key={activity}
                        >
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Fragment>
              ))}
            </div>
          </div>
          <ScrollBar className="rounded-br-lg rounded-t bg-muted-foreground text-muted-foreground pr-1" />
        </ScrollArea>
      </Card>

      <div className="col-span-4 lg:col-span-1 lg:row-span-1">
        <GridButton
          title="Back"
          href="/"
          icon={<ArrowLeftIcon className="w-full h-full" />}
        />
      </div>
    </main>
  );
}
