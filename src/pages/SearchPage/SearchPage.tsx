// SearchPage.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import SearchInput from "./components/SearchInput";
import CategoryCardList from "./components/CategoryCardList";
import SearchResultSection from "./components/SearchResultSection";

const SearchPage = () => {
  const { keyword } = useParams<{ keyword: string }>();

  return (
    <Box
      sx={{
        flex: 1, // 공간 채움
        minHeight: 0, // ✅ overflow 흐름 계산
        padding: "16px",
      }}
    >
      <Box mb={3}>
        <SearchInput />
      </Box>
      {keyword ? (
        <SearchResultSection keyword={keyword} />
      ) : (
        <CategoryCardList />
      )}
    </Box>
  );
};

export default SearchPage;
