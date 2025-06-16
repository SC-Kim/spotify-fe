// SearchPage.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import SearchInput from "./components/SearchInput";
import CategoryCardList from "./components/CategoryCardList";


const SearchPage = () => {
  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h1" mb={2}>
        Search
      </Typography>
      <SearchInput />
      <CategoryCardList />
    </Box>
  );
};

export default SearchPage;