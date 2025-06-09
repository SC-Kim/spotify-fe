import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalUrls, Followers, Image, Owner } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: "playlist";
  uri?: string;
}

export interface SimplifiedPlaylist extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface IPlaylist {
  id: string;
  name: string;
  images: { url: string }[];
  owner: { display_name: string };
  tracks: { total: number };
  description: string;
  public: boolean;
}

export interface PlaylistPagingResponse {
  items: IPlaylist[];
  total: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  field?: string;
  additional_types?: string;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets?: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  total_tracks: number;
  type: "album";
  uri: string;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids?: { [key: string]: string };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable?: boolean;
  linked_from?: Track;
  name: string;
  popularity: number;
  preview_url?: string;
  track_number: number;
  type: "track";
  uri: string;
  is_local?: boolean;
}

export interface Episode {
  audio_preview_url: string | null;
  description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  html_description?: string;
  id: string;
  images: Image[];
  is_externally_hosted?: boolean;
  is_playable?: boolean;
  language?: string;
  languages?: string[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  resume_point?: {
    fully_played: boolean;
    resume_position_ms: number;
  };
  show?: {
    id: string;
    name: string;
    publisher: string;
    external_urls: ExternalUrls;
    href: string;
    type: "show";
    uri: string;
    images: Image[];
  };
  type: "episode";
  uri: string;
}

export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local?: boolean;
  track: Track | Episode;
}

export interface Playlist extends BasePlaylist {
  tracks: ApiResponse<PlaylistTrack>;
  followers: Followers;
}
