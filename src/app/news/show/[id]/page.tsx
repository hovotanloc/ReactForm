"use client";

import { Paper, Box, Typography, Divider, Button } from "@mui/material";
import { useNewsProvider } from "@providers/data-provider/new-index";
import { useParams, useRouter } from "next/navigation";

export default function NewsShow() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { one } = useNewsProvider(id);
  const { data } = one.query;

  const news = data?.data;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper sx={{ p: 4, width: 500 }}>
        <Typography variant="h6" gutterBottom>
          Chi tiết News
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" color="text.secondary">
          Tiêu đề
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {news?.title}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary">
          Nội dung
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {news?.content}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary">
          Trạng thái
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {news?.status === 1 ? "Publish" : "Locked"}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary">
          Loại bài viết
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {news?.category?.name ?? `ID: ${news?.categoryId}`}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outlined" onClick={() => router.push("/news")}>
            Trở về danh sách
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
