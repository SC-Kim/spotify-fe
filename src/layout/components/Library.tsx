import { Button, Card, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import Playlist from "./Playlist";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";
const PlaylistContainer = styled("div")({
  flex: 1, // 남은 영역 전부 사용
  minHeight: 0, // overflow 계산을 위해 필요
  overflowY: "auto",
  overflowX: "hidden",
  paddingLeft: "12px", 

  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none", // Firefox
  msOverflowStyle: "none", // IE/Edge
});
const Library = () => {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });
  const { data: user } = useGetCurrentUserProfile();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  if (!user) return <EmptyPlaylist />;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  return (
    <PlaylistContainer>
      {!data || data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <>
          {data?.pages.map((page, index) => (
            <Playlist playlists={page.items} key={index} />
          ))}
          <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
        </>
      )}
    </PlaylistContainer>
  );
};

export default Library;
