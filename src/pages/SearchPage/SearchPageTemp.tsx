import {
  Box,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiInputBase-root": {
    borderRadius: "4px", // 입력 필드의 둥근 모서리
    backgroundColor: theme.palette.action.active, // 입력 필드의 배경 색상
    color: "white", // 텍스트 색상
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent", // 테두리 색상 제거
    },
    "&:hover fieldset": {
      borderColor: "gray", // 마우스 호버 시 테두리 색상
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray", // 포커스 시 테두리 색상
    },
  },
}));

const SearchPageTemp = () => {
  
  const [keyword, setKeyword] = useState<string>("");
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <Box display="inline-block" sx={{ maxWidth: 600, width: "100%", px: 2 }}>
      <Typography variant="h1" my="10px">
        Let's find something for your playlist
      </Typography>

      <StyledTextField
        value={keyword}
        autoComplete="off"
        variant="outlined"
        placeholder="Search for songs or episodes"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "white" }} />
              </InputAdornment>
            ),
          },
        }}
        onChange={handleSearchKeyword}
      />
    </Box>
  );
};

export default SearchPageTemp;
