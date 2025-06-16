import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Track } from "../models/track";
import { addTrackToPlaylist } from "../apis/playlistApi";

const useAddTrackToPlaylist = () => {
  const mutation = useMutation({
    mutationFn: async ({
      playlistId,
      track,
    }: {
      playlistId: string | undefined;
      track: Track;
    }) => {
      if (!playlistId || !track.id) {
        throw new Error("playlistId is undefined");
      }
      return addTrackToPlaylist(playlistId, track.id);
    },
    onSuccess: () => {
      console.log("트랙 추가 성공!!");
    //   toast.success("트랙이 성공적으로 추가되었습니다!");
    },
    onError: (error: any) => {
      console.error("트랙 추가 중 에러:", error);
    //   toast.error("트랙 추가에 실패했습니다.");
    },
  });

  return {
    addTrack: mutation.mutateAsync, // ✅ 여기 핵심
    ...mutation,
  };
};

export default useAddTrackToPlaylist;
