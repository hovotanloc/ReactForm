"use client";

import { useLogin } from "@refinedev/core";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";

type LoginValues = {
  phone: string;
  password: string;
};

export const AuthPage = () => {
  const { mutate: login, isPending } = useLogin<LoginValues>();
  const { register, handleSubmit } = useForm<LoginValues>();

  const onSubmit = (values: LoginValues) => {
    login(values);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "white",
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Đăng nhập
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("phone")}
            label="Số điện thoại"
            fullWidth
            margin="normal"
          />
          <TextField
            {...register("password")}
            label="Mật khẩu"
            type="password"
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isPending}
            sx={{ mt: 2 }}
          >
            {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
