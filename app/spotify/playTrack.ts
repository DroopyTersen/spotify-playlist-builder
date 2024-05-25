import { createSpotifyApi } from "./createSpotifyApi";

export const playTrack = async (
  accessToken: string,
  trackId: string,
  deviceId?: string
) => {
  const api = createSpotifyApi(accessToken);
  const body: any = {
    uris: [`spotify:track:${trackId}`],
  };

  if (deviceId) {
    body["device_id"] = deviceId;
  }

  const response = await api.put("/me/player/play", body);
  return response;
};
