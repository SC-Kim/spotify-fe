import { useInView } from "react-intersection-observer";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { Track } from "../../../models/track";
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

import { useEffect } from "react";
import LoadingSpinner from "../../../common/components/LoadingSpinner";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: "100%",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

const AlbumImage = styled("img")({
  borderRadius: "4px",
  marginRight: "12px",
});

interface SearchResultListProps {
  // props 추가
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: SearchResultListProps) => {
  // const [ref, inView] = useInView(); // 무한스크롤 옵저버 추가
  const [ref, inView] = useInView({
    root:
      typeof window !== "undefined"
        ? document.querySelector("#scrollable-container")
        : null,
    threshold: 0.3,
  });

  useEffect(() => {
    // fetchNextPage 호출 추가

    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <StyledTableContainer>
      <Table>
        <TableBody sx={{ width: "100%" }}>
          {list.map((track) => (
            <StyledTableRow key={track.id}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Box>
                    <AlbumImage src={track.album?.images[0].url} width="40px" />
                  </Box>
                  <Box>
                    <Typography fontWeight={700}>{track.name}</Typography>
                    <Typography color="text.secondary">
                      {track.artists ? track.artists[0].name : "Unknown Artist"}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>{track.album?.name}</TableCell>
              <TableCell>
                <Button>Add</Button>
              </TableCell>
            </StyledTableRow>
          ))}

          <StyledTableRow ref={ref}>
            <TableCell colSpan={3} align="center" sx={{ height: 200 }}>
              <Typography>더 불러오는 중…</Typography>
            </TableCell>
          </StyledTableRow>

        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default SearchResultList;
