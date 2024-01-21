import { spawn } from "child_process";
import Fastify from "fastify";
import { Buffer } from "buffer";
import * as crypto from "crypto";
import * as querystring from "querystring";
import { URLSearchParams } from "url";
const fastify = Fastify({
  logger: false,
});

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = "http://localhost:3124/callback";
if (!client_id || !client_secret) {
  throw new Error(
    "Please set your spotify client id and secret in your environment",
  );
}
//
// Declare a route
fastify.get("/callback", async function (req, reply) {
  const code = (req.query as any).code || null;
  const state = (req.query as any).state || null;

  if (state === null) {
    reply.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        }),
    );
  } else {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };
    const response = await fetch(authOptions.url, {
      method: "post",
      body: new URLSearchParams(authOptions.form),
      headers: authOptions.headers,
    });
    const res_data = await response.json();

    console.log((res_data as any).refresh_token);
    process.exit();
  }
});

fastify.get("/login", function (_req, reply) {
  const state = crypto.randomBytes(16).toString("hex");
  const scope = "user-read-currently-playing user-read-playback-state";

  reply.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      }),
  );
});

fastify.listen({ port: 3124 }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

spawn("open", ["http://localhost:3124/login"]);
