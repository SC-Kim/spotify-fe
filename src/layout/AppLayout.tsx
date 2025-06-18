import { Box, styled, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import React from "react";
import { NavLink, Outlet } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryHead from "./components/LibraryHead";
import Library from "./components/Library";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  minHeight: 0,
  padding: "8px",
  overflow: "hidden",
});

const Sidebar = styled("div")(({ theme }) => ({
  width: "240px",
  height: "100vh",
  minHeight: 0,
  display: "flex",
  flexDirection: "column", // ✅ 위아래로 정렬
  marginRight: "8px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "2px",
  marginBottom: "8px",
  marginRight: "8px",
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  paddingLeft: "9px",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}));

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox sx={{ flexShrink: 0 }}>
          <NavList>
            <StyledNavLink to="/">
              <HomeIcon />
              <Typography variant="h2" fontWeight={700}>
                Home
              </Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <SearchIcon />
              <Typography variant="h2" fontWeight={700}>
                Search
              </Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>

        {/* 고정된 LibraryHead + 스크롤 가능한 Library */}
        <ContentBox
          sx={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flexShrink: 0 }}>
            <LibraryHead />
          </Box>

          {/* ✅ 이 Box가 scroll container가 되어야 함 */}
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              overflowX: "hidden",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <Library />
          </Box>
        </ContentBox>
      </Sidebar>
      <ContentBox
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1, // ✅ 부모 Layout 기준으로 채움
          minHeight: 0, // ✅ overflow 계산을 위해 필요
          overflowY: "auto", // ✅ 스크롤은 허용
          overflowX: "hidden", // ✅ 가로 스크롤 제거
          "&::-webkit-scrollbar": {
            display: "none", // ✅ Chrome, Safari 등에서 스크롤바 숨김
          },
          scrollbarWidth: "none", // ✅ Firefox에서 스크롤바 숨김
          msOverflowStyle: "none", // ✅ IE, Edge에서 스크롤바 숨김
        }}
      >
        <Navbar />
        <Outlet />
      </ContentBox>

      <ToastContainer position="top-right" autoClose={3000} />
    </Layout>
  );
};

export default AppLayout;
