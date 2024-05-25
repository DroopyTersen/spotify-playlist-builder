import { StrategyVerifyCallback } from "remix-auth";
import {
  OAuth2Strategy,
  OAuth2StrategyVerifyParams,
  OAuth2Profile,
  OAuth2StrategyOptions,
  TokenResponseBody,
} from "remix-auth-oauth2";

// Define the specific Spotify options by extending the OAuth2Strategy options
interface SpotifyStrategyOptions
  extends Omit<
    OAuth2StrategyOptions,
    "authorizationEndpoint" | "tokenEndpoint"
  > {
  // Spotify specific options can be added here
}

// Define the profile structure returned by Spotify
interface SpotifyProfile extends OAuth2Profile {
  id: string;
  displayName: string;
  emails: Array<{ value: string }>;
  photos: Array<{ value: string }>;
}

// Define any extra parameters Spotify might return
interface SpotifyExtraParams extends Record<string, unknown> {
  id_token: string;
}

// Create the SpotifyStrategy by extending OAuth2Strategy
export class SpotifyAuthStrategy<User> extends OAuth2Strategy<
  User,
  SpotifyProfile,
  SpotifyExtraParams
> {
  name = "spotify";

  constructor(
    options: SpotifyStrategyOptions,
    verify: StrategyVerifyCallback<
      User,
      OAuth2StrategyVerifyParams<SpotifyProfile, SpotifyExtraParams>
    >
  ) {
    super(
      {
        authorizationEndpoint: `https://accounts.spotify.com/authorize`,
        tokenEndpoint: `https://accounts.spotify.com/api/token`,
        authenticateWith: "request_body",
        ...options,
      },
      verify
    );
  }

  // Override the userProfile method to parse the Spotify user profile
  protected async userProfile(
    tokens: TokenResponseBody & SpotifyExtraParams
  ): Promise<SpotifyProfile> {
    let response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    let data = await response.json();
    console.log("🚀 | data:", data);

    let profile: SpotifyProfile = {
      provider: "spotify",
      id: data.id,
      displayName: data.display_name,
      emails: [{ value: data.email }],
      photos: [{ value: data.images[0]?.url }],
    };

    return profile;
  }
}
