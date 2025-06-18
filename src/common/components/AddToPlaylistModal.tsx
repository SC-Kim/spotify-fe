import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  Avatar,
  List,
  ListItem,
  Checkbox,
  Snackbar,
} from "@mui/material";
import { IPlaylist } from "../../models/playlist";
import { useQueryClient } from "@tanstack/react-query";
import { addTrackToPlaylist } from "../../apis/playlistApi";
import { Track } from "../../models/track";
import { toast } from "react-toastify";

interface AddToPlaylistModalProps {
  open: boolean;
  onClose: () => void;
  playlists: IPlaylist[];
  track: Track | null;
  isLoggedIn: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const AddToPlaylistModal = ({
  open,
  onClose,
  playlists,
  track,
  isLoggedIn,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: AddToPlaylistModalProps) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const queryClient = useQueryClient();

  // 🔁 무한스크롤 설정
  useEffect(() => {
    if (!open || !hasNextPage || isFetchingNextPage) return;

    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        {
          root: listRef.current,
          threshold: 1.0,
        }
      );

      if (bottomRef.current) observer.observe(bottomRef.current);

      return () => {
        if (bottomRef.current) observer.unobserve(bottomRef.current);
      };
    }, 100);

    return () => clearTimeout(timeout);
  }, [open, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // ✅ 선택 토글
  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  // ✅ 확인 처리
  const handleConfirm = async () => {
    if (!track) return;

    try {
      await Promise.all(
        Array.from(selectedIds).map((playlistId) =>
          addTrackToPlaylist(playlistId, track.id!)
        )
      );

      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
      selectedIds.forEach((id) =>
        queryClient.invalidateQueries({ queryKey: ["playlist-detail", id] })
      );

      setSnackbarOpen(true);
      setSelectedIds(new Set());
      onClose();
    } catch (error) {
      toast.error("트랙 추가에 실패했습니다");
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  if (!isLoggedIn) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>로그인 필요</DialogTitle>
        <DialogContent>
          <Typography>노래를 추가하려면 로그인해야 합니다.</Typography>
          <Box mt={2}>
            <Button variant="contained" onClick={onClose}>
              확인
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: "60%",
            maxHeight: "80vh",
            backgroundColor: "#121212",
            color: "#fff",
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            backgroundColor: "#181818",
            borderBottom: "1px solid #333",
          }}
        >
          “{track?.name}”을(를) 추가할 플레이리스트
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor: "#121212",
            maxHeight: "calc(80vh - 140px)",
            overflowY: "auto",
            p: 2,
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <List ref={listRef}>
            {playlists.map((playlist) => {
              const isSelected = selectedIds.has(playlist.id);
              return (
                <ListItem
                  key={playlist.id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={() => handleToggle(playlist.id)}
                      checked={isSelected}
                      sx={{ color: "#1db954" }}
                    />
                  }
                  sx={{
                    borderRadius: "8px",
                    mb: 1,
                    px: 2,
                    py: 1.5,
                    backgroundColor: isSelected ? "#1e1e1e" : "#121212",
                    "&:hover": {
                      backgroundColor: "#2a2a2a",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={playlist.images?.[0]?.url}
                      variant="rounded"
                      sx={{ width: 60, height: 60 }}
                    >
                      N/A
                    </Avatar>

                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontSize="1.1rem"
                        fontWeight="bold"
                      >
                        {playlist.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontSize="0.95rem"
                        color="#aaa"
                      >
                        Tracks: {playlist.tracks?.total || 0}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
              );
            })}
            <div ref={bottomRef} />
            {isFetchingNextPage && (
              <Box mt={2} textAlign="center">
                <Typography variant="body2" sx={{ color: "#aaa" }}>
                  불러오는 중...
                </Typography>
              </Box>
            )}
          </List>
        </DialogContent>

        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            borderTop: "1px solid #333",
            backgroundColor: "#181818",
          }}
        >
          <Button onClick={onClose} color="inherit">
            취소
          </Button>
          <Button
            onClick={handleConfirm}
            color="success"
            variant="contained"
            disabled={selectedIds.size === 0}
          >
            완료
          </Button>
        </Box>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="🎵 음악이 플레이리스트에 추가되었습니다!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default AddToPlaylistModal;