"use client";
import { Sort } from "@mui/icons-material";
import { DataProvider } from "@refinedev/core";
import Cookies from "js-cookie";

const API_URL = "https://prisma-demo-vow3.onrender.com";

const getToken = () => {
    return Cookies.get("token");
};

export const dataProvider: DataProvider = {
    getApiUrl: () => API_URL,

    getList: async ({ resource, pagination }) => {
        const { currentPage = 1, pageSize = 10 } = pagination ?? {};
        const response = await fetch(
            `${API_URL}/${resource}/list?page=${currentPage}&items_per_page=${pageSize}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,                   
                },
            }
        );
        const data = await response.json();
        console.log(data);
        return {
            data: data.data,
            total: data.total,
            pageSize: data.items_per_page,
            currentPage: data.page,
        };
    },

    getOne: async ({ resource, id }) => {
        const response = await fetch(`${API_URL}/${resource}/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        const data = await response.json();
        return { data };
    },


    create: async ({ resource, variables }) => {
        const response = await fetch(`${API_URL}/${resource}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(variables),
        });
        const data = await response.json();
        return { data };
    },

    update: async ({ resource, id, variables }) => {
        const response = await fetch(`${API_URL}/${resource}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(variables),
        });
        const data = await response.json();
        return { data };
    },

    deleteOne: async ({ resource, id }) => {
        const response = await fetch(`${API_URL}/${resource}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
        });
        const data = await response.json();
        return { data };
    },
};