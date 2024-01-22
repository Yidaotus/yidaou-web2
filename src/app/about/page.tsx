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
import { ArrowLeftIcon, PlayIcon } from "@radix-ui/react-icons";
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
          <CardTitle className="text-lg">Hi Im Daniel</CardTitle>
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
            FullStack and Salesforce Software Developer. I've been immersed in
            programming and tinkering for as long as I can remember,
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
        <CardContent className="flex flex-col space-y-2">
          <p className="">
            Software development isn't just a job for me; it's my greatest
            passion. I absolutely love creating things, and in the world of
            software development, there are no fixed boundaries to confine my
            creativity. That's what I find most exciting about this field, and
            the fact that there's always something new to learn makes it even
            more fulfilling.
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-1 lg:row-span-2">
        <CardHeader>
          <CardTitle className="text-lg">💬 Language Enthusiast</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          <p className="">
            Language has opened doors for me into realms of entertainment,
            friendships, and cultures I didn't even know existed. Experiencing
            how even a modest grasp of a language can broaden my horizons has
            left me hooked.
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-2 lg:row-span-2">
        <CardHeader>
          <CardTitle className="text-lg">🎸 Musician</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          <p className="">
            I play the guitar, particularly favoring fingerstyle, and have
            proficiency in piano. I aim to incorporate saxophone into my musical
            repertoire. Presently, my musical preferences include modern Jazz,
            foreign rock/pop, and rock/metal.
          </p>
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
