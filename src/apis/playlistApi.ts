import { AxiosError } from "axios";
import {
  CreaetePlaylistRequest,
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistItemsResponse,
  GetPlaylistRequest,
  GetPlayRequestItemsRequest,
  Playlist,
  PlaylistPagingResponse,
} from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<PlaylistPagingResponse> => {
  try {
    const response = await api.get("/me/playlists", {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const getPlaylist = async (
  params: GetPlaylistRequest
): Promise<Playlist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const getPlaylistItems = async (
  params: GetPlayRequestItemsRequest
): Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch playlist items");
  }
};

export const createPlaylist = async (
  user_id: string,
  params: CreaetePlaylistRequest
): Promise<Playlist> => {
  try {
    const { name, playlistPublic, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to create playlist");
  }
};

export const addTrackToPlaylist = async (
  playlistId: string,
  trackId: string
): Promise<void> => {
  console.log("📦 보내는 데이터:", {
    uris: [`spotify:track:${trackId}`],
  });
  try {
    await api.post(`/playlists/${playlistId}/tracks`, {
      uris: [`spotify:track:${trackId}`], // ✅ 수정
    });
  } catch (error) {
    console.error("🚨 addTrackToPlaylist API 에러:", error);
    throw new Error("Fail to add a track to playlist");
  }
};
