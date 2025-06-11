import { useInfiniteQuery } from "@tanstack/react-query";
import { GetPlayRequestItemsRequest } from "../models/playlist";
import { getPlaylistItems } from "../apis/playlistApi";

const useGetPlaylistItems = (params: GetPlayRequestItemsRequest) => {
  return useInfiniteQuery({
    queryKey: ["playlist-items", params],
    queryFn: ({ pageParam }) => {
      return getPlaylistItems({ offset: pageParam, ...params });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
        if (lastPage.next) {
            const url = new URL(lastPage.next);
            const nextOffset = url.searchParams.get("offset");
            return nextOffset ? parseInt(nextOffset) : undefined;
        }
        return undefined;
    },
  });
};

export default useGetPlaylistItems;
