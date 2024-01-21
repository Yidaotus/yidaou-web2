import { MoonIcon, PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import styles from "./SpotifyCurrentlyPlaying.module.css";
import Image from "next/image";
import { z } from "zod";
import Link from "next/link";
import { revalidateTag } from "next/cache";
import { Skeleton } from "./skeleton";

const token_schema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
});

const playing_schema = z.object({
  is_playing: z.boolean(),
  item: z.object({
    uri: z.string(),
    name: z.string(),
    album: z.object({
      name: z.string(),
      images: z.array(
        z.object({
          url: z.string(),
          height: z.number(),
          width: z.number(),
        }),
      ),
    }),
    artists: z.array(
      z.object({
        name: z.string(),
      }),
    ),
  }),
});

const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const getAccessToken = async () => {
  if (!(refresh_token && client_secret && client_id)) {
    return null;
  }
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  const response = await fetch(authOptions.url, {
    method: "post",
    body: new URLSearchParams(authOptions.form),
    headers: authOptions.headers,
    next: { revalidate: 3600, tags: ["spotify_access_token"] },
  });
  const res_data = await response.json();
  const token_data = token_schema.parse(res_data);

  return token_data.access_token;
};

const getCurrentlyPlaying = async (token: string) => {
  //http GET https://api.spotify.com/v1/me/player Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'
  const playingOptions = {
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(playingOptions.url, {
    method: "get",
    headers: playingOptions.headers,
    next: { revalidate: 2 },
  });

  let playing_data = null;
  console.debug(response.status);
  if (response.status === 200) {
    const res_data = await response.json();
    playing_data = playing_schema.parse(res_data);
  }
  if (response.status === 204) {
    return "offline";
  }

  return playing_data;
};
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

const getSpotifySong = async () => {
  const token = await getAccessToken();
  if (!token) {
    return null;
  }

  let track;
  try {
    track = await getCurrentlyPlaying(token);
  } catch {
    revalidateTag("spotify_access_token");
    const token = await getAccessToken();
    if (token) {
      track = await getCurrentlyPlaying(token);
    }
  }
  return track;
};

const SpotifyCurrentlyPlaying: React.FC = async () => {
  const track = await getSpotifySong();

  if (!track) {
    return <PlaceholderPlayer />;
  }

  if (typeof track === "string") {
    return <PlayerOffline />;
  }

  return (
    <Link href={track.item.uri} className="cursor-pointer group h-full min-h-[120px]">
      <img
        src={
          track.item.album.images.sort(
            (album1, album2) => album2.width - album1.width,
          )[0].url
        }
        alt="Cover"
        className="object-cover z-0 rounded-[var(--radius)] absolute top-0 left-0 object-[50%_33%] h-full w-full group-hover:scale-110 transition-transform"
      />
      <div className="relative z-10 pl-4 flex h-full items-start justify-center flex-col bg-[#00000050] text-white">
        <p className="text-lg font-normal overflow-hidden text-ellipsis whitespace-nowrap w-2/3 group-hover:text-gray-200">
          {track.item.name}
        </p>
        <p className="text-sm font-normal overflow-hidden text-ellipsis whitespace-nowrap w-2/3 group-hover:text-gray-200">
          {track.item.artists.map((a) => a.name).join(",")}
        </p>
      </div>
      <div className="absolute right-1 -translate-y-1/2 top-1/2 h-12 text-white z-10 group-hover:text-gray-200">
        {track.is_playing && <PauseIcon className="h-12 w-12" />}
        {!track.is_playing && <PlayIcon className="h-12 w-12" />}
      </div>
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
