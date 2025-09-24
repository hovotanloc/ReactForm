// "use client";
// import { Sort } from "@mui/icons-material";
// import { DataProvider } from "@refinedev/core";
// import Cookies from "js-cookie";

// const API_URL = "http://192.168.1.12:3000";

// const getToken = () => {
//     return Cookies.get("token");
// };

// export const dataProvider: DataProvider = {
//     getApiUrl: () => API_URL,

//     getList: async ({ resource, pagination }) => {
//         const { currentPage = 1, pageSize = 10 } = pagination ?? {};
//         const response = await fetch(
//             `${API_URL}/${resource}/list?page=${currentPage}&items_per_page=${pageSize}`,
//             {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${getToken()}`,                   
//                 },
//             }
//         );
//         const data = await response.json();
//         console.log(data);
//         return {
//             data: data.data,
//             total: data.total,
//             pageSize: data.items_per_page,
//             currentPage: data.page,
//         };
//     },

//     getOne: async ({ resource, id }) => {
//         const response = await fetch(`${API_URL}/${resource}/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${getToken()}`,
//             },
//         });
//         const data = await response.json();
//         return { data };
//     },


//     create: async ({ resource, variables }) => {
//         const response = await fetch(`${API_URL}/${resource}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${getToken()}`,
//             },
//             body: JSON.stringify(variables),
//         });
//         const data = await response.json();
//         return { data };
//     },

//     update: async ({ resource, id, variables }) => {
//         const response = await fetch(`${API_URL}/${resource}/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${getToken()}`,
//             },
//             body: JSON.stringify(variables),
//         });
//         const data = await response.json();
//         return { data };
//     },

//     deleteOne: async ({ resource, id }) => {
//         const response = await fetch(`${API_URL}/${resource}/${id}`, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${getToken()}`,
//             },
//         });
//         const data = await response.json();
//         return { data };
//     },
// };
"use client";

import { DataProvider } from "@refinedev/core";
import Cookies from "js-cookie";

const API_URL = "http://192.168.1.12:3000"; // không dùng khi mock
const USE_MOCK = true; // bật mock

/* --- seed sample --- */
const SAMPLE = {
  categories: [
    { id: 1, name: "Đồ uống", description: "Các loại nước giải khát" },
    { id: 2, name: "Đồ ăn nhanh", description: "Burger, pizza, gà rán" },
    { id: 3, name: "Tráng miệng", description: "Bánh ngọt, kem" },
  ],
  news: [
    {
      id: 1,
      title: "Khai trương quán mới",
      content: "Nội dung bài viết 1",
      status: 1,
      ownerId: 1,
      categoryId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Giảm giá hôm nay",
      content: "Nội dung bài viết 2",
      status: 1,
      ownerId: 1,
      categoryId: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  user: [
    {
      id: 1,
      name: "Win nè",
      phone: "0362154987",
      password: "hashed",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

/* helper: storage key */
const STORAGE_KEY = "mock_db_v1";

/* init if empty */
function initMock() {
  if (typeof window === "undefined") return;
  const exist = localStorage.getItem(STORAGE_KEY);
  if (!exist) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE));
  }
}

function readDB(): Record<string, any[]> {
  if (typeof window === "undefined") return SAMPLE as any;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE));
    return SAMPLE as any;
  }
  return JSON.parse(raw);
}

function writeDB(db: Record<string, any[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function getNextId(items: any[]) {
  if (!items || items.length === 0) return 1;
  return Math.max(...items.map((i) => Number(i.id))) + 1;
}

/* token helper (fake) */
const getToken = () => Cookies.get("token");

export const dataProvider: DataProvider = {
  getApiUrl: () => API_URL,

  getList: async ({ resource, pagination }) => {
    if (USE_MOCK) {
      initMock();
      const db = readDB();
      const items = db[resource] ?? [];
      const { currentPage = 1, pageSize = 10 } = pagination ?? {};
      const start = (currentPage - 1) * pageSize;
      const pageItems = items.slice(start, start + pageSize);
      return {
        data: pageItems,
        total: items.length,
        pageSize,
        currentPage: currentPage,
      };
    }

    // fallback to real API
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
    return {
      data: data.data,
      total: data.total, 
      pageSize: data.items_per_page,
      currentPage: data.page,
    };
  },

  getOne: async ({ resource, id }) => {
    if (USE_MOCK) {
      initMock();
      const db = readDB();
      const items = db[resource] ?? [];
      const found = items.find((i) => String(i.id) === String(id));
      return { data: found ?? {} };
    }

    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await response.json();
    return { data };
  },

  create: async ({ resource, variables }) => {
    if (USE_MOCK) {
      initMock();
      const db = readDB();
      const items = db[resource] ?? [];
      const nextId = getNextId(items);
      const newItem = {
        id: nextId,
        ...variables,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      items.push(newItem);
      db[resource] = items;
      writeDB(db);
      return { data: newItem };
    }

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
    if (USE_MOCK) {
      initMock();
      const db = readDB();
      const items = db[resource] ?? [];
      const idx = items.findIndex((i) => String(i.id) === String(id));
      if (idx === -1) {
        return { data: {} };
      }
      const updated = {
        ...items[idx],
        ...variables,
        updatedAt: new Date().toISOString(),
      };
      items[idx] = updated;
      db[resource] = items;
      writeDB(db);
      return { data: updated };
    }

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
    if (USE_MOCK) {
      initMock();
      const db = readDB();
      const items = db[resource] ?? [];
      const idx = items.findIndex((i) => String(i.id) === String(id));
      if (idx !== -1) {
        const deleted = items.splice(idx, 1)[0];
        db[resource] = items;
        writeDB(db);
        return { data: deleted };
      }
      return { data: {} };
    }

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
