import { useMutation, useQueryClient } from "@tanstack/react-query"
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { CreaetePlaylistRequest } from "../models/playlist";
import { createPlaylist } from "../apis/playlistApi";

const useCreatePlaylist=()=>{
    const queryClient = useQueryClient();
    const {data:user} = useGetCurrentUserProfile();

    return useMutation({
        mutationFn:(params: CreaetePlaylistRequest) => {
            if (user){
                return createPlaylist(user.id, params);
            }
            return Promise.reject(new Error("user is not defined."))
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
            console.log("Success!!")
        }
    });
    
}

export default useCreatePlaylist;