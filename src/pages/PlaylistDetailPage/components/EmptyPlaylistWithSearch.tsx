import {
  Box,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { Track } from "../../../models/track";

const SearchContainer = styled(Box)({
  // 스크롤 디자인
  // padding: "16px",
  // width: "100%",
  // height: "100vh",
  // overflowY: "auto",

  "&::-webkit-scrollbar": {
    display: "none",
  },
  // msOverflowStyle: "none", // IE and Edge
  // scrollbarWidth: "none", // Firefox

  display: "flex",           // ✅ 중요: 세로 배치
  flexDirection: "column",   // ✅ 세로로 정렬
  width: "100%",
  height: "100vh",
  overflow: "hidden",        // ✅ 전체 스크롤 막고 내부 ScrollArea만 스크롤되게
});


const ScrollArea = styled(Box)({
  flexGrow: 1,
  overflowY: "auto",
  padding: "16px",

   /* 스크롤바 숨기기 */
   "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE, Edge
  scrollbarWidth: "none", // Firefox
});

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

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });
  const tracks: Track[] =
    data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];
  const hasResults = tracks.length > 0;
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <SearchContainer>
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
      <ScrollArea id="scrollable-container">
        <div>
          {isLoading ? (
            <LoadingSpinner /> // 로딩 중일 때 스피너 표시
          ) : hasResults ? (
            <SearchResultList // nextpage관련 속성 추가
              list={tracks}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          ) : keyword === "" ? (
            <></> // 검색어가 없을 때는 아무것도 표시하지 않음
          ) : (
            <div>{`No Result for "${keyword}"`}</div> // 검색 결과가 없을 때만 표시
          )}
        </div>
      </ScrollArea>
    </SearchContainer>
  );
};

export default EmptyPlaylistWithSearch;
