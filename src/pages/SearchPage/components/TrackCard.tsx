import React, { useState } from "react";
import { Box, Typography, styled, IconButton } from "@mui/material";
import { Track } from "../../../models/track";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

interface TrackCardProps {
  track: Track;
}

const Container = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 16px",
  borderRadius: "8px",
  backgroundColor: "#121212",
  height: "80px",
  position: "relative",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#1e1e1e",
  },
});

const AlbumImage = styled("img")({
  width: "60px",
  height: "60px",
  borderRadius: "4px",
  objectFit: "cover",
  marginRight: "12px",
});

const InfoBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  overflow: "hidden",
});

const TextGroup = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const TrackTitle = styled(Typography)({
  fontSize: "16px",
  fontWeight: 600,
  color: "#fff",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const ArtistName = styled(Typography)({
  fontSize: "14px",
  color: "#aaa",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const DurationText = styled(Typography)({
  fontSize: "14px",
  color: "#aaa",
});

const formatDuration = (ms: number = 0): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const TrackCard = ({
  track,
  onAddClick,
}: TrackCardProps & { onAddClick: (track: Track) => void }) => {
  const [hovered, setHovered] = useState(false);

  const trackName = track.name || "Unknown Track";
  const artistName = track.artists?.[0]?.name || "Unknown Artist";
  const duration_ms = Number(track.duration_ms) || 0;
  const imageUrl = track.album?.images?.[0]?.url || "";

  return (
    <Container
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 왼쪽: 이미지 + 텍스트 */}
      <Box display="flex" alignItems="center" flex={1} overflow="hidden">
        <AlbumImage src={imageUrl} alt={trackName} />
        <InfoBox>
          <TrackTitle>{trackName}</TrackTitle>
          <ArtistName>{artistName}</ArtistName>
        </InfoBox>
      </Box>

      {/* 오른쪽: 버튼 + duration */}
      <Box display="flex" alignItems="center" gap={1}>
        {hovered && (
          <>
            <IconButton size="small" sx={{ color: "#1db954" }}>
              <PlayArrowIcon />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: "#fff" }}
              onClick={() => onAddClick(track)}
            >
              <PlaylistAddIcon />
            </IconButton>
          </>
        )}
        <DurationText>{formatDuration(duration_ms)}</DurationText>
      </Box>
    </Container>
  );
};

export default TrackCard;
