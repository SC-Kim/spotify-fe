import React, { useState } from "react";
import { Box, Typography, styled, IconButton } from "@mui/material";
import { Artist } from "../../../models/artist";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface Props {
  artist: Artist;
}

const Card = styled(Box)({
  width: "240px",
  minWidth: "240px",
  marginRight: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  borderRadius: "8px",
  padding: "16px 8px",
  backgroundColor: "#121212",
  position: "relative",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#1e1e1e",
  },
});

const ArtistImage = styled("img")({
  width: "180px", // ✅ 더 크게 (원하는 크기로 조정 가능)
  height: "180px",
  objectFit: "cover",
  borderRadius: "50%", // 원형
});

const ArtistName = styled(Typography)({
  fontSize: "14px",
  color: "#fff",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const PlayButton = styled(IconButton)({
  position: "absolute",
  bottom: "12px",
  right: "12px",
  backgroundColor: "#1db954",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#1ed760",
  },
});

const ArtistCard = ({ artist }: Props) => {
  const [hovered, setHovered] = useState(false);
  const imageUrl = artist.images?.[0]?.url || "";

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box textAlign="center">
        <ArtistImage src={artist.images?.[0]?.url || ""} alt={artist.name} />
        <Typography variant="h6" mt={1} fontWeight={600}>
          {artist.name}
        </Typography>
      </Box>

      {hovered && (
        <PlayButton>
          <PlayArrowIcon />
        </PlayButton>
      )}
    </Card>
  );
};

export default ArtistCard;
