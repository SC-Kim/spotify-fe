import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import React from "react";

// 랜덤 색상 생성 함수
const getRandomColor = () => {
    const colors = [
      "#1F1B24", "#2C2A4A", "#3E2C41", "#4A148C", "#512DA8", "#311B92",
      "#1A237E", "#0D47A1", "#1565C0", "#1E88E5", "#1976D2", "#283593",
      "#37474F", "#263238", "#004D40", "#00695C", "#00796B", "#00897B",
      "#388E3C", "#2E7D32", "#1B5E20", "#33691E", "#827717", "#F57F17",
      "#E65100", "#BF360C", "#3E2723", "#4E342E", "#5D4037", "#6D4C41",
      "#880E4F", "#AD1457", "#C2185B", "#D81B60", "#E91E63", "#F06292"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

const categories = [
  "Pop",
  "Hip Hop",
  "Rock",
  "Jazz",
  "Classical",
  "K-Pop",
  "Electronic",
  "Indie",
];

const CategoryCardList = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",   // 모바일: 1열
          sm: "repeat(2, 1fr)",   // 태블릿: 2열
          md: "repeat(4, 1fr)",   // 데스크탑 이상: 4열
        },
        gap: 2,
        mt: 4,
      }}
    >
      {categories.map((category) => (
        <Card
          key={category}
          sx={{
            backgroundColor: getRandomColor(),
            color: "white",
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
          }}
        >
          <CardContent>
            <Typography variant="h6" align="center">
              {category}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CategoryCardList;