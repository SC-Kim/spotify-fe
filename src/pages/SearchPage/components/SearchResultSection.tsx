// components/SearchResultSection.tsx
import React, { useEffect, useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { Track } from "../../../models/track";
import { Artist } from "../../../models/artist";
import { SimplifiedAlbum } from "../../../models/album";
import SearchResultLayout from "./SearchResultLayout";
import { Box } from "@mui/material";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import AddToPlaylistModal from "../../../common/components/AddToPlaylistModal";

interface SearchResultSectionProps {
  keyword: string;
}

const SearchResultSection = ({ keyword }: SearchResultSectionProps) => {
  if (!keyword || keyword.trim() === "") return null;

  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
  });

  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // 👉 실제 로그인 여부 판단 로직으로 바꾸기
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));

  // ✅ 선택 시 모달 열기
  const handleAddClick = (track: Track) => {
    setSelectedTrack(track);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedTrack(null);
  };

  const handlePlaylistSelect = (playlistId: string) => {
    console.log(`🎵 ${selectedTrack?.name}을(를) ${playlistId}에 추가`);
    // 👉 실제 API로 추가 로직 구현 예정
    setModalOpen(false);
  };

  // ✅ 무한스크롤 hook에서 데이터 추출
  const {
    data: playlistData,
    isLoading: playlistLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCurrentUserPlaylists({ limit: 20, offset: 0 });

  const playlists = playlistData?.pages.flatMap((page) => page.items) || [];

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
        overflowX: "hidden",
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
        onAddClick={handleAddClick} // ✅ 카드에 전달
      />

      <AddToPlaylistModal
        open={modalOpen}
        onClose={handleModalClose}
        playlists={playlists}
        track={selectedTrack} // ✅ track 전체 객체 전달
        isLoggedIn={isLoggedIn}
        fetchNextPage={fetchNextPage}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </Box>
  );
};

export default SearchResultSection;
