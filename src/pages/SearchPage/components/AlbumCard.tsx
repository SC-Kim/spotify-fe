import React, { useState } from "react";
import { Box, Typography, styled, IconButton } from "@mui/material";
import { SimplifiedAlbum } from "../../../models/album";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface Props {
  album: SimplifiedAlbum;
}

const Card = styled(Box)({
  width: "240px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  borderRadius: "8px",
  padding: "12px 8px",
  backgroundColor: "#121212",
  position: "relative",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#1e1e1e",
  },
});

const AlbumImageWrapper = styled(Box)({
  position: "relative",
  width: "180px",
  height: "180px",
});

const AlbumImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
});

const PlayButton = styled(IconButton)({
  position: "absolute",
  bottom: "8px",
  right: "8px",
  backgroundColor: "#1db954",
  color: "#fff",
  zIndex: 2,
  "&:hover": {
    backgroundColor: "#1ed760",
  },
});

const AlbumCard = ({ album }: Props) => {
  const [hovered, setHovered] = useState(false);
  const imageUrl = album.images?.[0]?.url || "";
  const artistName = album.artists?.[0]?.name || "Unknown Artist";
  const releaseYear = album.release_date?.slice(0, 4) || "----";
  const totalTracks = album.total_tracks;

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AlbumImageWrapper>
        <AlbumImage src={imageUrl} alt={album.name} />
        {hovered && (
          <PlayButton>
            <PlayArrowIcon />
          </PlayButton>
        )}
      </AlbumImageWrapper>

      <Typography variant="h6" mt={1} fontWeight={600}>
        {album.name}
      </Typography>

      <Typography variant="subtitle2" color="gray">
        {artistName} ・ {releaseYear} ・ {totalTracks}곡
      </Typography>
    </Card>
  );
};

export default AlbumCard;