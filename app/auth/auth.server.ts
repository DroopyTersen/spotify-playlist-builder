import { Authenticator } from "remix-auth";
import { sessionStorage } from "./authSession.server";
import { SpotifyAuthStrategy } from "./SpotifyAuthStrategy";
import { redirect } from "@remix-run/node";
export type User = {
  id?: string;
  email?: string;
  name?: string;
  photo?: string;
  accessToken?: string;
  refreshToken?: string;
};
export let authenticator = new Authenticator<User>(sessionStorage);

const CLIENT_ID = process.env?.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env?.SPOTIFY_CLIENT_SECRET!;
const APP_URL = process.env?.APP_URL!;

const SPOTIFY_CONFIG = {
  scopes: [
    "user-read-recently-played",
    "playlist-modify-private",
    "playlist-modify-public",
    "playlist-read-collaborative",
    "playlist-read-private",
    "user-follow-read",
    "user-library-modify",
    "user-library-read",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-private",
    "user-top-read",
  ],
};
authenticator.use(
  new SpotifyAuthStrategy<User>(
    {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectURI: `${APP_URL}/auth/callback`,
      scopes: SPOTIFY_CONFIG.scopes,
    },
    async ({ tokens, profile, context, request }) => {
      console.log("🚀 | tokens:", tokens);
      // here you can use the params above to get the user and return it
      // what you do inside this and how you find the user is up to you
      return {
        id: profile.id,
        email: profile.emails?.[0]?.value,
        name: profile.displayName,
        photo: profile.photos?.[0]?.value,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      };
    }
  ),
  // this is optional, but if you setup more than one OAuth2 instance you will
  // need to set a custom name to each one
  "spotify"
);

export const requireAuth = async (request: Request) => {
  let currentUser = await authenticator.isAuthenticated(request);
  if (!currentUser) {
    throw redirect("/login");
  }
  return currentUser;
};
