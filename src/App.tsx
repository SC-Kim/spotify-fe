import React, { Suspense, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router";
import SearchWithKeywordPage from "./pages/SearchWithKeywordPage/SearchWithKeywordPage";
import PlaylistDetailPage from "./pages/PlaylistDetailPage/PlaylistDetailPage";
import PlaylistPage from "./pages/PlaylistPage/PlaylistPage";
import LoadingSpinner from "./common/components/LoadingSpinner";
import useExchangeToken from "./hooks/useExchangeToken";
// import AppLayout from "./layout/AppLayout";
// import HomePage from "./pages/HomePage/HomePage";
// import SearchPage from "./pages/SearchPage/SearchPage";
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));

// 사이드바
// 홈페이지(랜딩 페이지)  /
// 서치페이지 /search
// 서치 결과 페이지 /search/:keyword
// 플레이리스트 디테일 페이지 /playlist/:id
// (모바일버전) 플레이리스트 보여주는 페이지 /playlist

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");

  const { mutate: exchangeToken } = useExchangeToken();

  const LibraryPage = React.lazy(() => import("./pages/LibraryPage/LibraryPage"));

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
  }, [code, codeVerifier, exchangeToken]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search/:keyword?" element={<SearchPage />} />
          {/* <Route path="search/:keyword" element={<SearchWithKeywordPage />} /> */}
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
          <Route path="playlist" element={<PlaylistPage />} />
          <Route path="callback" element={<HomePage />} />
          <Route path="library" element={<LibraryPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
