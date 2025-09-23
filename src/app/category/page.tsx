"use client";

import React from "react";
import { List, useDataGrid, DeleteButton, EditButton, ShowButton } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function CategoryList() {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Tên", flex: 1 },
      { field: "description", headerName: "Mô tả", flex: 1 },
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
