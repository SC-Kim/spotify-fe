// NewReleaseTracks.tsx
import React from "react";
import { SimplifiedAlbum } from "../../../models/album";
import Card from "../../../common/components/Card";

interface Props {
  album: SimplifiedAlbum;
}

const NewReleaseTracks = ({ album }: Props) => {
  return (
    <Card
      name={album.name}
      artistName={album.artists.map((a) => a.name).join(", ")}
      image={album.images[0]?.url}
    />
  );
};

export default NewReleaseTracks;