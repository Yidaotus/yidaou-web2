import GridButton from "@/components/ui/GridButton";
import { BlockPostsPlaceHolder } from "@/components/ui/RecentBlogPostsCard";
import ShuffleImage from "@/components/ui/ShuffleImage";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeftIcon,
  CameraIcon,
  CodeIcon,
  GlobeIcon,
  PersonIcon,
  PlayIcon,
  ResumeIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="m-auto p-2 grid gap-2 grid-cols-4 max-w-6xl overflow-hidden relative w-full sm:p-4 sm:gap-2 md:gap-3 md:p-6 lg:h-screen lg:gap-4 lg:max-h-[800px]">
      <Card className="col-span-4 relative overflow-hidden md:row-span-1 md:col-span-1">
        <Suspense fallback={<PlaceholderPlayer />}>
          <SpotifyCurrentlyPlaying />
        </Suspense>
      </Card>

      <Card className="col-span-4 md:col-span-3 md:row-span-2 relative">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <PersonIcon className="w-4 h-4" />
            about
          </CardTitle>
          <CardDescription>About me personally</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="absolute -right-8 md:right-0 top-0 h-full aspect-[842/998] z-0 overflow-hidden md:pr-2 md:pt-2">
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

      <Card className="col-span-4 md:col-span-1 md:row-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayIcon className="w-5 h-5" /> hits
          </CardTitle>
          <CardDescription>Hits I recently listened to</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<BlockPostsPlaceHolder />}>
            <SpotifyRecentHits />
          </Suspense>
        </CardContent>
      </Card>

      <Card className="col-span-4 md:col-span-3 md:row-span-2 lg:row-span-3 relative">
        <Tabs defaultValue="dev" className="w-full">
          <TabsList className="flex justify-center w-full bg-secondary">
            <TabsTrigger value="dev" className="flex gap-2 items-center">
              <CodeIcon className="w-4 h-4" />
              Developer
            </TabsTrigger>
            <TabsTrigger value="music" className="flex gap-2 items-center">
              <ResumeIcon className="w-4 h-4" />
              Musician
            </TabsTrigger>
            <TabsTrigger value="lang" className="flex gap-2 items-center">
              <GlobeIcon className="w-4 h-4" />
              Polyglot
            </TabsTrigger>
            <TabsTrigger value="photo" className="flex gap-2 items-center">
              <CameraIcon className="w-4 h-4" />
              Photographer
            </TabsTrigger>
          </TabsList>
          <TabsContent value="dev">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <CodeIcon className="w-4 h-4" />
                developer
              </CardTitle>
              <CardDescription>Developing things</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <ul className="list-disc list-inside">
                <li>Software development is my passion, not just a job.</li>
                <li>
                  I love the limitless creativity in creating things through
                  code.
                </li>
                <li>The ever-changing nature of the field excites me.</li>
                <li>
                  Constant learning makes software development incredibly
                  fulfilling for me.
                </li>
              </ul>
            </CardContent>
            <Image
              className="absolute bottom-4 right-4 h-full w-auto pt-14 opacity-20 z-0 pointer-events-none select-none"
              src="/mascot/char_work.png"
              alt="Mascot Working"
              width={852}
              height={981}
            />
          </TabsContent>
          <TabsContent value="music">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <ResumeIcon className="w-4 h-4" />
                musician
              </CardTitle>
              <CardDescription>Making music</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <ul className="list-inside list-disc">
                <li>I like to play fingerstyle Guitar and Piano.</li>
                <li>Aiming to add saxophone to my musical repertoire.</li>
                <li>Modern Jazz, foreign rock/pop and rock/metal.</li>
                <li>
                  Constantly expanding my musical skills, exploring diverse
                  genres.
                </li>
              </ul>
            </CardContent>
            <Image
              className="absolute bottom-4 right-4 h-full w-auto pt-14 opacity-20 z-0 pointer-events-none select-none"
              src="/mascot/char_guitar.png"
              alt="Mascot Working"
              width={852}
              height={981}
            />
          </TabsContent>
          <TabsContent value="lang">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <GlobeIcon className="w-4 h-4" />
                polyglot
              </CardTitle>
              <CardDescription>Learning languages</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <ul className="list-inside list-disc pr-4">
                <li>
                  Language enthusiast exploring diverse cultures through various
                  languages.
                </li>
                <li>
                  Basic language proficiency significantly broadens my horizons.
                </li>
                <li>
                  Language learning opens gateways to unexpected friendships.
                </li>
                <li>
                  Immense joy in discovering life's unknown facets through
                  exploring languages.
                </li>
              </ul>
            </CardContent>
            <Image
              className="absolute bottom-4 right-4 h-full w-auto pt-14 opacity-10 z-0 pointer-events-none select-none"
              src="/mascot/char_nihao.png"
              alt="Mascot Working"
              width={852}
              height={981}
            />
          </TabsContent>
          <TabsContent value="photo">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <CameraIcon className="w-4 h-4" />
                photographer
              </CardTitle>
              <CardDescription>Taking pictures</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <ul className="list-disc list-inside">
                <li>I like street and landscape photography</li>
                <Link href="/photography">
                  <li>Check out my photos here</li>
                </Link>
              </ul>
            </CardContent>
            <Image
              className="absolute bottom-4 right-4 h-full w-auto pt-14 opacity-20 z-0 pointer-events-none select-none"
              src="/mascot/char_photo.png"
              alt="Mascot Working"
              width={852}
              height={981}
            />
          </TabsContent>
        </Tabs>
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
