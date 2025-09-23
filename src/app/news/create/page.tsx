"use client";

import { useForm } from "react-hook-form";
import { TextField, Button, Paper, Box, Typography, MenuItem } from "@mui/material";
import { useNewsProvider } from "@providers/data-provider/new-index";
import { useCategoryProvider } from "@providers/data-provider/category-index";
import { useRouter } from "next/navigation";

type NewsForm = {
    title: string;
    content?: string;
    categoryId?: number;
    status?: number;
};

export default function NewsCreate() {
    const { createWithValidation } = useNewsProvider();
    const { register, handleSubmit, setValue } = useForm<NewsForm>({
        defaultValues: {
            status: 1,
        },
    });
    const { list } = useCategoryProvider();
    const router = useRouter();

    const onSubmit = async (values: NewsForm) => {
        await createWithValidation(values);
        router.push("/news");
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Paper sx={{ p: 4, width: 500 }}>
                <Typography variant="h6">Thêm News</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField {...register("title")} label="Tiêu đề" fullWidth margin="normal" />
                    <TextField {...register("content")} label="Nội dung" fullWidth margin="normal" multiline rows={4} />

                    <TextField
                        select
                        {...register("categoryId", { valueAsNumber: true })}
                        label="Chọn Category"
                        fullWidth
                        margin="normal"
                    >
                        {list?.result?.data?.map((cat: any) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        {...register("status")}
                        label="Trạng thái"
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value={1}>Publish</MenuItem>
                        <MenuItem value={2}>Locked</MenuItem>
                    </TextField>

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <Button type="submit" variant="contained">Tạo mới</Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}
