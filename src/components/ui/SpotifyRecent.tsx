import Link from "next/link";
import { Skeleton } from "./skeleton";
import { getRecentHits } from "@/lib/spotify";
import { Separator } from "./separator";
import { Fragment } from "react";

const SpotifyRecentHitsPlaceholder = () => {
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

const HIT_LIMIT = 5;

const SpotifyRecentHits: React.FC = async () => {
  const tracks = await getRecentHits(HIT_LIMIT);

  if (!tracks) {
    return <SpotifyRecentHitsPlaceholder />;
  }

  if (typeof tracks === "string") {
    return <SpotifyRecentHitsPlaceholder />;
  }

  return (
    <ul className="flex flex-col gap-2">
      {tracks.items.map(({ track }, i) => (
        <Fragment key={`${track.name}-${i}`}>
          <li className="flex gap-4 w-full items-center">
            <img
              src={
                track.album.images.sort(
                  (album1, album2) => album2.width - album1.width,
                )[0].url
              }
              alt="Cover"
              className="object-cover z-0 rounded object-[50%_33%] h-[50px] w-[50px] group-hover:scale-110 transition-transform"
            />
            <Link
              href={track.uri}
              className="cursor-pointer group flex flex-col overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                {track.name}
              </div>
              <div className="opacity-70 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                {track.artists.map((a) => a.name).join(",")}
              </div>
            </Link>
          </li>
          {i < HIT_LIMIT - 1 && <Separator />}
        </Fragment>
      ))}
    </ul>
  );
};

export default SpotifyRecentHits;
export { SpotifyRecentHitsPlaceholder };
