import React, { useEffect } from "react";
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
  scrollbarWidth: "none",  // Firefox
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
  const { data: playlist } = useGetPlaylist({ playlist_id: id });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlitItemsLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT });

  console.log("AH!!", playlistItems);
  // return <div>PlaylistDetailPage: {id} </div>;

  const { ref, inView } = useInView(); // 👈 감지용 ref

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
      {playlist?.tracks?.total === 0 ? (
        <Typography> Search </Typography>
      ) : (
        <StickyTableContainer>
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
                <TableCell colSpan={5} align="center" ref={ref}>
                  {isFetchingNextPage && <LoadingSpinner />}
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
