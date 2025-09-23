"use client";

import { useForm } from "react-hook-form";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import { useCategoryProvider } from "@providers/data-provider/category-index";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type CategoryForm = {
  name: string;
  description?: string;
};

export default function CategoryEdit() {
  const params = useParams();
  const id = Number(params.id);

  const { one, updateWithValidation } = useCategoryProvider(id);
  const { data } = one.query;

  const { register, handleSubmit, setValue } = useForm<CategoryForm>();

  useEffect(() => {
    if (data?.data) {
      setValue("name", data.data.name);
      setValue("description", data.data.description);
    }
  }, [data, setValue]);

  const onSubmit = (values: CategoryForm) => {
    updateWithValidation(id, values);
  };


  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h6">Sửa Category</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField {...register("name")} label="Tên category" fullWidth margin="normal" />
          <TextField {...register("description")} label="Mô tả" fullWidth margin="normal" />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button type="submit" variant="contained">Cập nhật</Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
