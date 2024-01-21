import GridButton from "@/components/ui/GridButton";
import SpotifyCurrentlyPlaying from "@/components/ui/SpotifyCurrentlyPlaying";
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
  CameraIcon,
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  IdCardIcon,
  LinkedInLogoIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

const tags = ["javascript", "typescript", "generics", "validations", "yup"];

export default function Home() {
  return (
    <main className="text-white m-auto p-2 grid gap-2 max-w-6xl overflow-hidden relative w-full sm:p-4 sm:gap-2 md:gap-3 md:p-6 lg:h-screen md:grid-cols-4 lg:gap-4 lg:max-h-[800px] font-light">
      <Card className="lg:col-span-2 lg:row-span-1 relative">
        <CardHeader>
          <CardTitle className="text-muted-foreground">photograhy</CardTitle>
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
      <Card className="lg:row-span-2 lg:col-span-1 relative">
        <Image
          src="/photos/01.jpg"
          fill
          alt="00"
          className="rounded-[var(--radius)] object-cover"
        />
      </Card>
      <Card className="lg:row-span-1 lg:col-span-1 relative h-full">
        <Image
          src="/photos/13.jpg"
          fill
          alt="00"
          className="rounded-[var(--radius)] object-cover"
        />
      </Card>
      <Card className="lg:row-span-2 relative">
        <Image
          src="/photos/08.jpg"
          fill
          alt="00"
          className="rounded-[var(--radius)] object-cover"
        />
      </Card>
      <Card className="lg:row-span-1 lg:col-span-1 relative">
        <Image
          src="/photos/03.jpg"
          fill
          alt="00"
          className="rounded-[var(--radius)] object-cover"
        />
      </Card>
      <Card className="lg:row-span-1 lg:col-span-1 relative">
        <Image
          src="/photos/14.jpg"
          fill
          alt="00"
          className="rounded-[var(--radius)] object-cover"
        />
      </Card>
      <Card className="lg:row-span-1 lg:col-span-2 relative">
        <Image
          src="/photos/00.jpg"
          fill
          alt="00"
          className="rounded-[var(--radius)] object-cover"
        />
      </Card>
      <Card className="lg:row-span-1 lg:col-span-1 relative">
        <Image
          src="/photos/_DSC1035.jpg"
          fill
          alt="00"
          className="rounded-[var(--radius)] object-cover"
        />
      </Card>
    </main>
  );
}