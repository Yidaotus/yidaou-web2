import { revalidateTag } from "next/cache";
import { z } from "zod";

const TOKEN_CACHE_TAG = "spotify_access_token";

const token_schema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
});

const track_schema = z.object({
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
});

const recent_schema = z.object({
  items: z.array(z.object({ track: track_schema })),
});

const playing_schema = z.object({
  is_playing: z.boolean(),
  item: track_schema,
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
    next: { revalidate: 3600, tags: [TOKEN_CACHE_TAG] },
  });
  const res_data = await response.json();
  const token_data = token_schema.parse(res_data);

  return token_data.access_token;
};

const getRecentHitsFetcher = async (token: string, limit: number = 5) => {
  const recentOptions = {
    url: "https://api.spotify.com/v1/me/player/recently-played",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const url = new URL(recentOptions.url);
  url.searchParams.append("limit", String(limit));

  const response = await fetch(url, {
    method: "get",
    headers: recentOptions.headers,
    next: { revalidate: 3600 },
  });

  if (response.status !== 200) {
    return response.status;
  }

  let recent_data = null;
  console.debug(response.status);
  const res_data = await response.json();
  recent_data = recent_schema.parse(res_data);

  return recent_data;
};

const getCurrentlyPlayingFetcher = async (token: string) => {
  const playingOptions = {
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(playingOptions.url, {
    method: "get",
    headers: playingOptions.headers,
    next: { revalidate: 30 },
  });

  if (response.status !== 200) {
    return response.status;
  }

  let playing_data = null;
  const res_data = await response.json();
  playing_data = playing_schema.parse(res_data);

  return playing_data;
};

const callWithTokenRevalidation =
  <T, P extends any[]>(
    f: (token: string, ...rest: P) => Promise<T | number>,
    revalidateCall: boolean = false,
  ) =>
  async (...params: P): Promise<T | number> => {
    const token = await getAccessToken();
    if (!token) {
      return 404;
    }

    const status = await f(token, ...params);

    if (typeof status === "number") {
      if (status === 401) {
        revalidateTag(TOKEN_CACHE_TAG);
        if (!revalidateCall) {
          return callWithTokenRevalidation(f, true)(...params);
        }
      }
    }

    return status;
  };

const getCurrentlyPlaying = callWithTokenRevalidation(
  getCurrentlyPlayingFetcher,
);
const getRecentHits = callWithTokenRevalidation(getRecentHitsFetcher);

export { getAccessToken, getCurrentlyPlaying, getRecentHits };
