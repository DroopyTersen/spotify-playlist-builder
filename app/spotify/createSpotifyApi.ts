import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { jsonRequest } from "~/toolkit/utils/fetch.utils";

export const createSpotifyApi = (accessToken: string) => {
  let baseUrl = "https://api.spotify.com/v1";
  return {
    get: async <T>(path: string) => {
      let url = `${baseUrl}${path}`;
      return jsonRequest<T>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    post: async <T>(path: string, body: any) => {
      let url = `${baseUrl}${path}`;
      return jsonRequest<T>(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    },
  };
};
