import React from "react";
import { useParams } from "react-router";

const PlaylistDetailPage = () => {
  const { id } = useParams();
  return <div>PlaylistDetailPage: {id} </div>;
};

export default PlaylistDetailPage;
