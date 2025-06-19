import React from "react";
import NewReleases from "./components/NewReleases";
import { Typography, Box, Grid } from "@mui/material";
import useGetNewReleases from "../../hooks/useGetNewReleases";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import NewReleaseTracks from "./components/NewReleaseTracks";
import NewReleaseAlbums from "./components/NewReleaseAlbums";

const HomePage = () => {
  const { data, isLoading, error } = useGetNewReleases();

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorMessage errorMessage="신규 발매 정보를 불러오지 못했습니다." />
    );

  const allAlbums = data?.albums.items || [];

  const top6Albums = allAlbums.slice(0, 6); // New Releases
  const trackAlbums = allAlbums.slice(6, 18); // Tracks (12개)
  const albumAlbums = allAlbums.slice(18, 30); // Albums (12개)

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        New Releases
      </Typography>
      <NewReleases albums={top6Albums} />

      <Typography variant="h5" fontWeight="bold" mt={4} mb={2}>
        Tracks
      </Typography>
      <Grid container spacing={2}>
        {trackAlbums.map((album) => (
          <Grid
            key={album.id}
            sx={{ width: { xs: "50%", sm: "33.33%", md: "25%", lg: "16.66%" } }}
          >
            <NewReleaseTracks album={album} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" fontWeight="bold" mt={4} mb={2}>
        Albums
      </Typography>
      <Grid container spacing={2}>
        {albumAlbums.map((album) => (
          <Grid
            key={album.id}
            sx={{ width: { xs: "50%", sm: "33.33%", md: "25%", lg: "16.66%" } }}
          >
            <NewReleaseAlbums album={album} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;