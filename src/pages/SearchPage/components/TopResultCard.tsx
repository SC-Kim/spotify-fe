import React, { useState } from "react";
import { Box, Typography, styled, IconButton } from "@mui/material";
import { Track } from "../../../models/track";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

interface TopResultCardProps {
  track: Track;
}

const Container = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "8px 16px",
  borderRadius: "8px",
  gap: "16px",
  backgroundColor: "#121212", // 기본 배경 어둡게
  height: "200px",
  //   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  position: "relative",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#1e1e1e", // hover 시 밝게
  },
});

const AlbumImage = styled("img")({
  width: "150px",
  height: "150px",
  borderRadius: "4px",
  objectFit: "cover",
});

const InfoBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  overflow: "hidden",
});

const TrackTitle = styled(Typography)({
  fontSize: "24px",
  fontWeight: 600,
  color: "#fff",
  lineHeight: 1.2,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const ArtistName = styled(Typography)({
  fontSize: "24px",
  color: "#fff",
  lineHeight: 1.2,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  marginBottom: "8px",
});

const DetailText = styled(Typography)({
  fontSize: "14px",
  color: "#aaa",
});

const PlayButton = styled(IconButton)({
  position: "absolute",
  right: "72px", // ✅ 오른쪽에서 두 번째로 이동
  bottom: "16px",
  backgroundColor: "#1db954",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#1ed760",
  },
});

const AddButton = styled(IconButton)({
  position: "absolute",
  right: "16px", // ✅ 가장 오른쪽으로 이동
  bottom: "16px",
  backgroundColor: "#404040",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#555",
  },
});

const formatDuration = (ms: number = 0): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const TopResultCard = ({
  track,
  onAddClick,
}: TopResultCardProps & { onAddClick: (track: Track) => void }) => {
  const [hovered, setHovered] = useState(false);

  const imageUrl = track.album?.images?.[0]?.url || "";
  const trackName = track.name || "Unknown Track";
  const artistName = track.artists?.[0]?.name || "Unknown Artist";
  const albumName = track.album?.name || "Unknown Album";
  const duration_ms = Number(track.duration_ms) || 0;
  const popularity = track.popularity !== undefined ? track.popularity : "N/A";

  return (
    <Container
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AlbumImage src={imageUrl} alt={trackName} />
      <InfoBox>
        <TrackTitle>{trackName}</TrackTitle>
        <ArtistName>{artistName}</ArtistName>

        <DetailText>Album: {albumName}</DetailText>
        <DetailText>Duration: {formatDuration(duration_ms)}</DetailText>
        <DetailText>Popularity: {popularity} / 100</DetailText>
      </InfoBox>

      {hovered && (
        <>
          {/* 재생 버튼 */}
          <PlayButton>
            <PlayArrowIcon />
          </PlayButton>

          {/* 추가하기 버튼 */}
          <AddButton onClick={() => onAddClick(track)}>
            <PlaylistAddIcon />
          </AddButton>
        </>
      )}
    </Container>
  );
};

export default TopResultCard;
