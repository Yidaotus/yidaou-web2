import GridButton from "@/components/ui/GridButton";
import { BlockPostsPlaceHolder } from "@/components/ui/RecentBlogPostsCard";
import SpotifyCurrentlyPlaying, {
  PlaceholderPlayer,
} from "@/components/ui/SpotifyCurrentlyPlaying";
import SpotifyRecentHits from "@/components/ui/SpotifyRecent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeftIcon, PersonIcon, PlayIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="text-white m-auto p-2 grid gap-2 grid-cols-4 max-w-6xl overflow-hidden relative w-full sm:p-4 sm:gap-2 md:gap-3 md:p-6 lg:h-screen lg:gap-4 lg:max-h-[800px]">
      <Card className="col-span-4 relative overflow-hidden lg:row-span-1 lg:col-span-1">
        <Suspense fallback={<PlaceholderPlayer />}>
          <SpotifyCurrentlyPlaying />
        </Suspense>
      </Card>

      <Card className="col-span-4 lg:col-span-3 lg:row-span-2 relative">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <PersonIcon className="w-4 h-4" />
            about
          </CardTitle>
          <CardDescription>About me personally</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="absolute -right-16 md:right-0 top-0 h-full aspect-[842/998] z-0 overflow-hidden md:pr-2 md:pt-2">
            <Image
              src="/mascot/char_wave.png"
              height={998}
              width={842}
              alt="Mascot Head"
              className="select-none opacity-25 lg:opacity-50 pointer-events-none object-cover"
            />
          </div>
          <p className="w-[90%] md:w-2/3 z-10 relative">
            A 30-year-old residing and working independently in Düsseldorf as a
            FullStack and Salesforce Software Developer. I&apos;ve been immersed
            in programming and tinkering for as long as I can remember,
            consistently seeking to acquire new skills. A devoted Rust
            enthusiast, music lover, and polyglot.
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-1 lg:row-span-3">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <PlayIcon className="w-5 h-5" /> Recent Hits
          </CardTitle>
          <CardDescription>Hits I recently listened to</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<BlockPostsPlaceHolder />}>
            <SpotifyRecentHits />
          </Suspense>
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-2 lg:row-span-1">
        <CardHeader>
          <CardTitle className="text-lg">👨‍💻 Software Developer</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2 text-muted-foreground">
          <ul className="list-disc list-inside">
            <li>Software development is my passion, not just a job.</li>
            <li>
              I love the limitless creativity in creating things through code.
            </li>
            <li>The ever-changing nature of the field excites me.</li>
            <li>
              Constant learning makes software development incredibly fulfilling
              for me.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-1 lg:row-span-2">
        <CardHeader>
          <CardTitle className="text-lg">💬 Language Enthusiast</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2 text-muted-foreground">
          <ul className="list-inside list-disc">
            <li>
              Language enthusiast exploring diverse cultures through various
              languages.
            </li>
            <li>
              Basic language proficiency significantly broadens my horizons.
            </li>
            <li>Language learning opens gateways to unexpected friendships.</li>
            <li>
              Immense joy in discovering life's unknown facets through exploring
              languages.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-2 lg:row-span-2">
        <CardHeader>
          <CardTitle className="text-lg">🎸 Musician</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2 text-muted-foreground">
          <ul className="list-inside list-disc">
            <li>I like to play fingerstyle Guitar and Piano.</li>
            <li>Aiming to add saxophone to my musical repertoire.</li>
            <li>Modern Jazz, foreign rock/pop and rock/metal.</li>
            <li>
              Constantly expanding my musical skills, exploring diverse genres.
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="col-span-4 lg:col-span-1 lg:row-span-1">
        <GridButton
          title="Back"
          href="/"
          icon={<ArrowLeftIcon className="w-full h-full" />}
        />
      </div>

      <Card className="col-span-4 lg:col-span-1 lg:row-span-1">
        <CardHeader>
          <CardTitle className="text-lg">lol</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          <p className="">lol</p>
        </CardContent>
      </Card>
    </main>
  );
}
