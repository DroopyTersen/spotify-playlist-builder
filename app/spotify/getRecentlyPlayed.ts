import { createSpotifyApi } from "./createSpotifyApi";
import { RecentlyPlayedResponse } from "./spotify.types";

export const getRecentlyPlayed = async (accessToken: string) => {
  let api = createSpotifyApi(accessToken);
  let data = await api.get<RecentlyPlayedResponse>(
    "/me/player/recently-played"
  );
  return data;
};
