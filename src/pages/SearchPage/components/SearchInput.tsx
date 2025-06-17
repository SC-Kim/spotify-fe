import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

let debounceTimer: ReturnType<typeof setTimeout>;

const SearchInput = () => {
  const { keyword: initialKeyword } = useParams<{ keyword: string }>();
  const [keyword, setKeyword] = useState(initialKeyword || "");
  const navigate = useNavigate();

  useEffect(() => {
    setKeyword(initialKeyword || "");
  }, [initialKeyword]);

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      const trimmed = keyword.trim();
      if (trimmed) {
        navigate(`/search/${encodeURIComponent(trimmed)}`);
      } else {
        navigate("/search");
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [keyword, navigate]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search for songs, artists, or albums"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
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