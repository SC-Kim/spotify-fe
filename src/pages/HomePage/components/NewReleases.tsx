// NewReleases.tsx
import React from "react";
import { Typography, Grid } from "@mui/material";
import Card from "../../../common/components/Card";
import { SimplifiedAlbum } from "../../../models/album";

interface Props {
  albums: SimplifiedAlbum[];
}

const NewReleases: React.FC<Props> = ({ albums }) => {
  return (
    <div>
      {albums.length > 0 ? (
        <Grid container spacing={2}>
          {albums.map((album) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <Card
                name={album.name}
                artistName={album.artists
                  .map((artist) => artist.name)
                  .join(", ")}
                image={album.images[0].url}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">No data</Typography>
      )}
    </div>
  );
};

export default NewReleases;