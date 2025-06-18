import React, { useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import {
  Grid,
  styled,
  Typography,
  Box,
  GridProps,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import DefaultImage from "../../common/components/DefaultImage";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import { TableContainer } from "@mui/material"; // 추가
import LoginButton from "../../common/components/LoginButton";
import { AxiosError } from "axios";
import ErrorMessage from "../../common/components/ErrorMessage";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";
import { useQueryClient } from "@tanstack/react-query";

const PlaylistHeader = styled(Grid)<GridProps>({
  display: "flex",
  alignItems: "center",
  background: " linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
});
const ImageGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  height: "auto",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
}));
const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));

// 내부 스크롤 컨테이너 스타일
const TableScrollContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "600px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const StickyTableContainer = styled(TableContainer)({
  maxHeight: "600px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE, Edge
  scrollbarWidth: "none", // Firefox
});

const StickyHeaderCell = styled(TableCell)(({ theme }) => ({
  position: "sticky",
  top: 0,
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  zIndex: 1,
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <Navigate to="/" />;
  const { data: playlist, error: playlistError } = useGetPlaylist({
    playlist_id: id,
  });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT });

  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (playlist?.tracks?.total === 0) {
      setIsEmpty(true);
      console.log("🎵 트랙 없음, isEmpty = true");
    } else if (playlist?.tracks?.total && playlist.tracks.total > 0) {
      setIsEmpty(false);
      console.log("🎵 트랙 있음, isEmpty = false");
    }
  }, [playlist?.tracks?.total]);
  const queryClient = useQueryClient();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    root: scrollContainerRef.current ?? undefined,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const getErrorStatus = (err: unknown): number | undefined => {
    if (err && typeof err === "object" && "response" in err) {
      return (err as AxiosError).response?.status;
    }
    return undefined;
  };

  const playlistStatus = getErrorStatus(playlistError);
  const itemsStatus = getErrorStatus(playlistItemsError);

  if (playlistError || playlistItemsError) {
    if (playlistStatus === 401 || itemsStatus === 401) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          flexDirection="column"
        >
          <Typography variant="h2" fontWeight={700} mb="20px">
            다시 로그인 하세요
          </Typography>
          <LoginButton />
        </Box>
      );
    }
    return <ErrorMessage errorMessage="Failed to load playlist" />;
  }

  return (
    <div>
      <PlaylistHeader container spacing={7}>
        <ImageGrid size={{ sm: 12, md: 2 }}>
          {playlist?.images ? (
            <AlbumImage
              src={playlist?.images[0].url}
              alt="playlist_cover.jpg"
            />
          ) : (
            <DefaultImage>
              <MusicNoteIcon fontSize="large" />
            </DefaultImage>
          )}
        </ImageGrid>
        <Grid size={{ sm: 6, md: 8 }}>
          <Box>
            <ResponsiveTypography variant="h1" color="white">
              {playlist?.name}
            </ResponsiveTypography>

            <Box display="flex" alignItems="center">
              <img
                src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
                width="20px"
              />
              <Typography
                variant="subtitle1"
                color="white"
                ml={1}
                fontWeight={700}
              >
                {playlist?.owner?.display_name
                  ? playlist?.owner.display_name
                  : "unknown"}
              </Typography>
              <Typography variant="subtitle1" color="white">
                • {playlist?.tracks?.total} songs
              </Typography>
            </Box>
          </Box>
        </Grid>
      </PlaylistHeader>
      {isEmpty ? (
        <EmptyPlaylistWithSearch
          playlistId={id}
          onTrackAdded={() => {
            if (!id) return;

            queryClient.invalidateQueries({
              queryKey: ["playlist-detail", id],
            });

            queryClient.invalidateQueries({
              predicate: (query) => {
                const key = query.queryKey;
                return (
                  key[0] === "playlist-items" &&
                  typeof key[1] === "object" &&
                  (key[1] as { playlist_id: string }).playlist_id === id
                );
              },
            });

            queryClient.invalidateQueries({
              queryKey: ["current-user-playlists"],
            });

            setIsEmpty(false);
          }}
        />
      ) : (
        <StickyTableContainer ref={scrollContainerRef}>
          <Table
            stickyHeader
            sx={{
              "& tbody .MuiTableCell-root": {
                borderBottom: "none",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <StickyHeaderCell>#</StickyHeaderCell>
                <StickyHeaderCell>Title</StickyHeaderCell>
                <StickyHeaderCell>Album</StickyHeaderCell>
                <StickyHeaderCell>Date added</StickyHeaderCell>
                <StickyHeaderCell>Duration</StickyHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlistItems?.pages.map((page, pageIndex) =>
                page.items.map((item, itemIndex) => (
                  <DesktopPlaylistItem
                    item={item}
                    key={itemIndex}
                    index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                  />
                ))
              )}
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <div ref={ref}>
                    {isFetchingNextPage && <LoadingSpinner />}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </StickyTableContainer>
      )}
    </div>
  );
};

export default PlaylistDetailPage;
