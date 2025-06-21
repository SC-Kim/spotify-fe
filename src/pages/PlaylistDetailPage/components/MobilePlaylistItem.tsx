import React, { useState } from "react";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import { PlaylistTrack } from "../../../models/playlist";
import { Episode, Track } from "../../../models/track";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface MobilePlaylistItemProps {
  item: PlaylistTrack;
  index: number;
}

const MobilePlaylistItem = ({ item, index }: MobilePlaylistItemProps) => {
  const [hovered, setHovered] = useState(false);

  const isEpisode = (track: Track | Episode): track is Episode =>
    "description" in track;

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };

  const formatDuration = (ms: number | null | undefined): string => {
    if (!ms) return "Unknown";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const track = item.track;
  const imageUrl = !isEpisode(track)
    ? track.album?.images?.[0]?.url
    : track.images?.[0]?.url;

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: hovered ? "#2a2a2a" : "#1a1a1a",
        color: "#fff",
        mb: 2,
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Typography variant="subtitle2" color="text.secondary">
        #{index + 1}
      </Typography>

      <Box display="flex" alignItems="center" position="relative">
        <Box
          sx={{
            position: "relative",
            width: 64,
            height: 64,
            borderRadius: 1,
            overflow: "hidden",
            mr: 2,
          }}
        >
          <img
            src={imageUrl || "/fallback.jpg"}
            alt="track"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {hovered && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton sx={{ color: "white" }} size="small">
                <PlayArrowIcon fontSize="medium" />
              </IconButton>
            </Box>
          )}
        </Box>

        <Box>
          <Typography variant="h6" fontWeight="bold" noWrap>
            {track.name || "No Title"}
          </Typography>
          {!isEpisode(track) && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {track.album?.name || "No Album"}
            </Typography>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 1, borderColor: "#333" }} />

      <Box display="flex" justifyContent="space-between">
        <Typography variant="caption">
          Added: {formatDate(item.added_at)}
        </Typography>
        <Typography variant="caption">
          Duration: {formatDuration(track.duration_ms)}
        </Typography>
      </Box>
    </Box>
  );
};

export default MobilePlaylistItem;