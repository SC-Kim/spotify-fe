import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const SearchInput = () => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search for songs, artists, or albums"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;