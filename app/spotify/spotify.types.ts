// Define TypeScript types for the response
type ImageObject = {
  url: string;
  height: number;
  width: number;
};

type ExternalUrls = {
  spotify: string;
};

export type ArtistObject = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type AlbumObject = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: string;
  uri: string;
  artists: ArtistObject[];
};

export type TrackObject = {
  album: AlbumObject;
  artists: ArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean?: string;
    upc?: string;
  };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: object;
  restrictions?: {
    reason: string;
  };
  name: string;
  popularity: number;
  preview_url?: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type PlayHistoryObject = {
  track: TrackObject;
  played_at: string;
  context: {
    type: string;
    href: string;
    external_urls: ExternalUrls;
    uri: string;
  };
};

export type RecentlyPlayedResponse = {
  href: string;
  limit: number;
  next: string | null;
  cursors: {
    after?: string;
    before?: string;
  };
  total: number;
  items: PlayHistoryObject[];
};
