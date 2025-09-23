"use client";

import { useForm } from "react-hook-form";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import { useCategoryProvider } from "@providers/data-provider/category-index";
import { useRouter } from "next/navigation";

type CategoryForm = {
  name: string;
  description?: string;
};

export default function CategoryCreate() {
  const { createWithValidation } = useCategoryProvider();
  const { register, handleSubmit } = useForm<CategoryForm>();
  const router = useRouter();

  const onSubmit = async (values: CategoryForm) => {
    await createWithValidation(values);
    router.push("/category"); 
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h6">Thêm Category</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField {...register("name")} label="Tên category" fullWidth margin="normal" />
          <TextField {...register("description")} label="Mô tả" fullWidth margin="normal" />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button type="submit" variant="contained">Tạo mới</Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
