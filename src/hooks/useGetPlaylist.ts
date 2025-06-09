import { useQuery } from "@tanstack/react-query"
import { GetPlaylistRequest } from "../models/playlist"
import { getPlaylist } from "../apis/playlistApi";

const useGetPlaylist = (params:GetPlaylistRequest) =>{
    return useQuery({
        queryKey:['playlist-detail', params.playlist_id],
        queryFn:()=>{
            return getPlaylist(params);
        },
        enabled:!!params.playlist_id
    })
}

export default useGetPlaylist;