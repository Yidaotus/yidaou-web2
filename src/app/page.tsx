import DarkModeToggle from "@/components/ui/DarkModeToggle";
import GridButton from "@/components/ui/GridButton";
import PhotoButton from "@/components/ui/PhotoButton";
import RecentBlockPostsCard, {
  BlockPostsPlaceHolder,
} from "@/components/ui/RecentBlogPostsCard";
import ShuffleImage from "@/components/ui/ShuffleImage";
import SpotifyCurrentlyPlaying, {
  PlaceholderPlayer,
} from "@/components/ui/SpotifyCurrentlyPlaying";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CameraIcon,
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  IdCardIcon,
  LinkedInLogoIcon,
  PersonIcon,
  RocketIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="text-white m-auto p-2 grid gap-2 grid-cols-2 max-w-6xl overflow-hidden relative w-full sm:p-4 sm:gap-2 md:gap-3 md:p-6 lg:h-screen md:grid-cols-4 lg:gap-4 lg:max-h-[800px]">
      <Card className="col-span-2 row-span-2 md:col-span-4 lg:col-span-3 md:row-span-1 lg:row-span-1 relative">
        <CardHeader>
          <CardTitle>
            <WelcomeBanner />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2/3 md:h-full aspect-[834/908] z-0 overflow-hidden object-center pr-2 md:pt-2">
            <Image
              src="/mascot/char_head.png"
              height={908}
              width={834}
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

          <Button variant="outline" size="logo" aria-label="Download CV" title="Download my CV">
            <IdCardIcon className="h-6 w-6" />
          </Button>
        </CardFooter>
      </Card>

      <Card className="col-span-2 row-span-1 md:row-span-2 md:col-span-2 lg:row-span-3 lg:col-span-1 relative">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <PersonIcon className="h-4 w-4" />
            about
          </CardTitle>
          <CardDescription>A few words about myself</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          <p className="">
            Music enthusiast, polyglot and developer. I build applications with
            my favorite tech:
          </p>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>React / Vue</li>
            <li>Rust</li>
            <li>PostgreSQL / MongoDB</li>
            <li>Vercel / Netlify / Supabase</li>
            <li>tRPC / GraphQL</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="col-span-2 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-3 relative">
        <Suspense fallback={<BlockPostsPlaceHolder />}>
          <RecentBlockPostsCard />
        </Suspense>
      </Card>

      <GridButton
        title="Projects"
        href="/projects"
        icon={<RocketIcon className="w-full h-full" />}
      />
      <GridButton
        invert
        title="About"
        href="/about"
        icon={<PersonIcon className="w-full h-full" />}
      />
      <GridButton
        title="Experience"
        href="/experience"
        icon={<IdCardIcon className="w-full h-full" />}
      />

      <div className="grid grid-cols-2 grid-rows-1 gap-2">
        <GridButton
          invert
          title=""
          href="/about"
          icon={<PersonIcon className="w-full h-full" />}
        />

        <DarkModeToggle />
      </div>

      <Card className="text-muted-foreground col-span-2 md:col-span-1 row-span-1 grid w-full content-center justify-center h-full">
        © Daniel Voigt 2024
      </Card>
      <Card className="col-span-2 row-span-1 md:row-span-2 lg:col-span-2 lg:row-span-2 overflow-hidden">
        <PhotoButton />
      </Card>
      <Card className="row-span-2 col-span-1 md:row-span-2">lol</Card>
      <div className="row-span-1 col-span-2 md:col-span-1">
        <Card className="relative overflow-hidden h-full">
          <Suspense fallback={<PlaceholderPlayer />}>
            <SpotifyCurrentlyPlaying />
          </Suspense>
        </Card>
      </div>
    </main>
  );
}
