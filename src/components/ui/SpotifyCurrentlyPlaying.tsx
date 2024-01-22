import { ActivityLogIcon, MoonIcon, PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import styles from "./SpotifyCurrentlyPlaying.module.css";
import Link from "next/link";
import { Skeleton } from "./skeleton";
import { getCurrentlyPlaying } from "@/lib/spotify";

const PlayerOffline = () => {
  return (
    <div className="relative overflow-hidden h-full min-h-[75px]">
      <div className="relative z-10 pl-4 flex h-full gap-2 items-start justify-center flex-col bg-[#00000050] text-muted-foreground">
        <p className="font-normal overflow-hidden text-ellipsis whitespace-nowrap w-2/3 group-hover:text-gray-200">
          Playback paused
        </p>
      </div>
      <div className="absolute right-1 -translate-y-1/2 top-1/2 h-12 text-white pr-2">
        <MoonIcon className="h-12 w-12" />
      </div>
    </div>
  );
};

const PlaceholderPlayer = () => {
  return (
    <div className="relative overflow-hidden h-full min-h-[75px]">
      <div className="relative z-10 pl-4 flex h-full gap-2 items-start justify-center flex-col bg-[#00000050] text-black">
        <Skeleton className="h-2 w-2/3" />
        <Skeleton className="h-2 w-1/3" />
      </div>
      <div className="absolute right-1 -translate-y-1/2 top-1/2 h-12 text-white pr-2">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    </div>
  );
};

const SpotifyCurrentlyPlaying: React.FC = async () => {
  const track = await getCurrentlyPlaying();

  if (!track) {
    return <PlaceholderPlayer />;
  }

  if (typeof track === "string") {
    return <PlayerOffline />;
  }

  return (
    <Link
      href={track.item.uri}
      className="cursor-pointer group h-full min-h-[100px]"
    >
      <img
        src={
          track.item.album.images.sort(
            (album1, album2) => album2.width - album1.width,
          )[0].url
        }
        alt="Cover"
        className="object-cover z-0 rounded-[var(--radius)] absolute top-0 left-0 object-[50%_33%] h-full w-full group-hover:scale-110 transition-transform"
      />
      <div className="relative z-10 pl-4 flex h-full items-start justify-end pb-4 flex-col bg-[#00000050] text-white">
        <p className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-2/3 group-hover:text-gray-200">
          {track.item.name}
        </p>
        <p className="text-sm font-normal overflow-hidden text-ellipsis whitespace-nowrap w-2/3 group-hover:text-gray-200 opacity-80">
          {track.item.artists.map((a) => a.name).join(",")}
        </p>
      </div>
      <div className="absolute bottom-4 right-4 h-6 text-white z-10 group-hover:text-gray-200">
        <PlayIcon className="h-6 w-6" />
      </div>
      {
        // <div className="absolute right-1 -translate-y-1/2 top-1/2 h-12 text-white z-10 group-hover:text-gray-200">
        //   {track.is_playing && <PauseIcon className="h-12 w-12" />}
        //   {!track.is_playing && <PlayIcon className="h-12 w-12" />}
        // </div>
      }
      {track.is_playing && (
        <div
          className={`flex gap-1 items-end z-0 absolute h-2/3 bottom-0 w-full left-0 ${styles.eqContainer}`}
        >
          <span className={`${styles.bar} ${styles.b1}`} />
          <span className={`${styles.bar} ${styles.b2}`} />
          <span className={`${styles.bar} ${styles.b3}`} />
          <span className={`${styles.bar} ${styles.b4}`} />
          <span className={`${styles.bar} ${styles.b5}`} />
          <span className={`${styles.bar} ${styles.b6}`} />
          <span className={`${styles.bar} ${styles.b7}`} />
        </div>
      )}
    </Link>
  );
};

export default SpotifyCurrentlyPlaying;
export { PlaceholderPlayer };
