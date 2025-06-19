import React from "react";
import { Box } from "@mui/material";
import LibraryHead from "../../layout/components/LibraryHead";
import Library from "../../layout/components/Library";

const LibraryPage = () => {
  return (
    <Box sx={{ padding: "16px" }}>
      <LibraryHead />
      <Library />
    </Box>
  );
};

export default LibraryPage;