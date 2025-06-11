import React from "react";
import { PlaylistTrack } from "../../../models/playlist";
import { TableCell, TableRow } from "@mui/material";
import { Episode, Track } from "../../../models/track";

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}
const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // yyyy-MM-dd
  };

  const formatDuration = (ms: number | null | undefined): string => {
    if (!ms) return "Unknown";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  return (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: (theme) => theme.palette.action.hover,
          cursor: "pointer",
        },
        borderBottom: "none",
      }}
    >
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || "no name"}</TableCell>
      <TableCell>
        {isEpisode(item.track) ? "N/A" : item.track.album?.name}
      </TableCell>
      {/* <TableCell>{item.track.album?.name}</TableCell>  */}
      <TableCell>{formatDate(item.added_at)}</TableCell>
      <TableCell>{formatDuration(item.track.duration_ms)}</TableCell>
    </TableRow>
  );
};

export default DesktopPlaylistItem;
