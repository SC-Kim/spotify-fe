// components/SearchResultSection.tsx
import React, { useEffect } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { Track } from "../../../models/track";
import { Artist } from "../../../models/artist";
import { SimplifiedAlbum } from "../../../models/album";
import SearchResultLayout from "./SearchResultLayout";
import { Box } from "@mui/material";

interface SearchResultSectionProps {
  keyword: string;
}

const SearchResultSection = ({ keyword }: SearchResultSectionProps) => {
  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
  });

  useEffect(() => {
    console.log("🔍 검색어:", keyword);
    console.log("📦 API 응답 데이터:", data);
    if (error) console.error("❌ 검색 오류:", error);
  }, [data, error, keyword]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage="검색 실패" />;

  const tracks: Track[] = data?.pages[0]?.tracks?.items || [];
  const albums: SimplifiedAlbum[] = data?.pages[0]?.albums?.items || [];
  const artists: Artist[] = data?.pages[0]?.artists?.items || [];
  // const topResult: Track | null = tracks.length > 0 ? tracks[0] : null;

  const topResults = tracks.slice(0, 2); // 상위 2개 트랙을 Top Result로
  const restTracks = tracks.slice(2); // 나머지는 Songs로

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        paddingRight: "4px",
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#555",
          borderRadius: "4px",
        },
      }}
    >
      <SearchResultLayout
        topResults={topResults}
        tracks={restTracks}
        artists={artists}
        albums={albums}
      />
    </Box>
  );
};

export default SearchResultSection;
