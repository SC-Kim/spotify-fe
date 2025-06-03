import { Box, styled, Typography, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
// import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
// import useCreatePlaylist from "../../hooks/useCreatePlaylist";
// import { getSpotifyAuthUrl } from "../../utils/auth";

const Head = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "8px",

  justifyContent: "space-between",
});
const LibraryHead = () => {
  const handleCreatePlaylist = () => {
    // 나중에 추가 예정
  };

  return (
    <Head>
      <Box display="flex">
        <BookmarkIcon sx={{ marginRight: "20px" }} />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </Box>
      <Button onClick={handleCreatePlaylist}>
        <AddIcon />
      </Button>
    </Head>
  );
};

export default LibraryHead;
