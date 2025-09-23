"use client";

import React from "react";
import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000, orders: 240, users: 800 },
  { name: "Feb", revenue: 3000, orders: 198, users: 967 },
  { name: "Mar", revenue: 2000, orders: 280, users: 1098 },
  { name: "Apr", revenue: 2780, orders: 308, users: 1200 },
  { name: "May", revenue: 1890, orders: 350, users: 1108 },
  { name: "Jun", revenue: 2390, orders: 430, users: 1268 },
];

const MetricCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: -10,
            top: -10,
            opacity: 0.1,
            transform: "rotate(30deg)",
          }}
        >
          {icon}
        </Box>
        <CardContent sx={{ width: "100%", p: 3 }}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ color }}>
            {value}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function DashboardPage() {
  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Welcome to your Refine Dashboard 🎉
          </Typography>
        </Grid>

        {/* Metric Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Revenue"
            value="$15,350"
            icon={<MonetizationOnIcon sx={{ fontSize: 100 }} />}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Orders"
            value="450"
            icon={<ShoppingCartIcon sx={{ fontSize: 100 }} />}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard title="Active Users" value="1,250" icon={<PeopleIcon sx={{ fontSize: 100 }} />} color="#FF9800" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Growth Rate"
            value="24%"
            icon={<TrendingUpIcon sx={{ fontSize: 100 }} />}
            color="#9C27B0"
          />
        </Grid>

        {/* Revenue Trend */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Revenue Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid>

        {/* Monthly Orders */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Monthly Orders
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#2196F3" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid>

        {/* User Growth */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                User Growth
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#FF9800" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
