"use client";

import React from "react";
import {
  List,
  useDataGrid,
  DeleteButton,
  EditButton,
  ShowButton,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function NewsList() {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "title", headerName: "Tiêu đề", flex: 1 },
      { field: "content", headerName: "Nội dung", flex: 1 },
      { field: "categoryId", headerName: "Loại bài viết", width: 120},
      {
        field: "status",
        headerName: "Trạng thái",
        width: 120,
        valueGetter: (params) => {
          switch (params) {
            case 1:
              return "Publish";
            case 2:
              return "Locked";
            default:
              return "Unknown";
          }
        },
      },
      {
        field: "createdAt",
        headerName: "Ngày tạo",
        width: 200,
        valueFormatter: (params) => {
          const date = new Date(params);
          return date.toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        },
      },
      {
        field: "actions",
        headerName: "Thao tác",
        width: 200,
        sortable: false,
        renderCell: ({ row }) => (
          <div style={{ display: "flex", gap: "6px" }}>
            <ShowButton hideText recordItemId={row.id} />
            <EditButton hideText recordItemId={row.id} />
            <DeleteButton hideText recordItemId={row.id} />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
}
