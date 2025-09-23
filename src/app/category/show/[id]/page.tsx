"use client";

import { Paper, Box, Typography, Divider, Button } from "@mui/material";
import { useCategoryProvider } from "@providers/data-provider/category-index";
import { useParams, useRouter } from "next/navigation";

export default function CategoryShow() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { one } = useCategoryProvider(id);
  const { data } = one.query;

  const category = data?.data;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h6" gutterBottom>
          Chi tiết Category
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" color="text.secondary">
          Tên category
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {category?.name}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary">
          Mô tả
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {category?.description}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={() => router.push("/category")}>
            Trở về danh sách
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
