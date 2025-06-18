// SearchResultLayout.tsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Track } from "../../../models/track";
import { SimplifiedAlbum } from "../../../models/album";
import { Artist } from "../../../models/artist";
import TopResultCard from "./TopResultCard";
import TrackCard from "./TrackCard";
import ArtistCard from "./ArtistCard";
import AlbumCard from "./AlbumCard";

interface Props {
  topResults: Track[];
  tracks: Track[];
  albums: SimplifiedAlbum[];
  artists: Artist[];
  onAddClick: (track: Track) => void;
}

const SearchResultLayout = ({ topResults, tracks, albums, artists, onAddClick }: Props) => {
  return (
    <Box>
      {/* 1행: Top Result & Songs */}
      {(topResults.length > 0 || tracks.length > 0) && (
        <Grid container spacing={2} mb={4}>
          {topResults.length > 0 && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h1" mb={2}>
                Top Results
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                {topResults.map((track) => (
                  <TopResultCard key={track.id} track={track} onAddClick={onAddClick} />
                ))}
              </Box>
            </Grid>
          )}

          {tracks.length > 0 && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h1" mb={2}>
                Tracks
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {tracks.slice(0, 5).map((track) => (
                  <TrackCard key={track.id} track={track} onAddClick={onAddClick} />
                ))}
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* 2행: Artists */}
      {artists.length > 0 && (
        <Box mb={4}>
          <Typography variant="h1" mb={2}>
            Artists
          </Typography>
          <Grid container spacing={2}>
            {artists.slice(0, 4).map((artist) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 3 }}
                sx={{ display: "flex", justifyContent: "center" }}
                key={artist.id}
              >
                <ArtistCard artist={artist} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* 3행: Albums */}
      {albums.length > 0 && (
        <Box>
          <Typography variant="h1" mb={2}>
            Albums
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {albums.slice(0, 4).map((album) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={album.id}>
                <AlbumCard album={album} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default SearchResultLayout;
