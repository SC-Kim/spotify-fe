import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "8px",
});

const ProfileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    color: "white",
    minWidth: "160px",
  },
});

const ProfileMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#444",
  },
});

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    // 1. localStorage에 저장된 Spotify 토큰 삭제
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // 2. 필요시 다른 정보도 삭제
    localStorage.removeItem("expires_in");

    // 3. 메뉴 닫기
    handleMenuClose();

    // 4. 로그인 페이지 또는 초기 화면으로 이동
    window.location.href = "/"; // 또는 "/"로 리디렉션도 가능
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
    >
      {/* {userProfile? <img src={userProfile.images[0]?.url} />:<LoginButton />} */}
      {userProfile ? (
        // userProfile.display_name
        <ProfileContainer>
          <IconButton onClick={handleMenuOpen} size="small">
            <Avatar
              src={userProfile.images[0]?.url}
              alt={userProfile.display_name}
            />
          </IconButton>
          <ProfileMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            keepMounted
          >
            <ProfileMenuItem onClick={logout}>Log out</ProfileMenuItem>
          </ProfileMenu>
        </ProfileContainer>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;
