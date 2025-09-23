"use client";

import { Controller, useForm } from "react-hook-form";
import { TextField, Button, Paper, Box, Typography, MenuItem } from "@mui/material";
import { useNewsProvider } from "@providers/data-provider/new-index";
import { useCategoryProvider } from "@providers/data-provider/category-index";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

type NewsForm = {
  title: string;
  content?: string;
  categoryId?: number;
  status?: number;
};

export default function NewsEdit() {
  const params = useParams();
  const id = Number(params.id);
  const router = useRouter();

  const { one, updateWithValidation } = useNewsProvider(id);
  const { data } = one.query;
  const { list } = useCategoryProvider();

  const { register, handleSubmit, setValue, control } = useForm<NewsForm>();

  useEffect(() => {
    if (data?.data) {
      setValue("title", data.data.title);
      setValue("content", data.data.content);
      setValue("categoryId", data.data.categoryId);
      setValue("status", data.data.status);
    }
  }, [data, setValue]);


  const onSubmit = async (values: NewsForm) => {
    await updateWithValidation(id, values);
    router.push("/news");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper sx={{ p: 4, width: 500 }}>
        <Typography variant="h6">Sửa News</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField {...register("title")} label="Tiêu đề" fullWidth margin="normal" />
          <TextField {...register("content")} label="Nội dung" fullWidth margin="normal" multiline rows={4} />

          <Controller
            name="categoryId"
            control={control}
            rules={{ required: "Vui lòng chọn category" }}
            render={({ field }) => (
              <TextField
                select
                label="Chọn Category"
                fullWidth
                margin="normal"
                {...field}
                value={field.value ?? ""} 
                onChange={(e) => field.onChange(Number(e.target.value))}  
              >
                {list?.result?.data?.map((cat: any) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="status"
            control={control}
            defaultValue={1}
            render={({ field }) => (
              <TextField
                select
                label="Trạng thái"
                fullWidth
                margin="normal"
                {...field}
              >
                <MenuItem value={1}>Publish</MenuItem>
                <MenuItem value={2}>Locked</MenuItem>
              </TextField>
            )}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button type="submit" variant="contained">Cập nhật</Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
