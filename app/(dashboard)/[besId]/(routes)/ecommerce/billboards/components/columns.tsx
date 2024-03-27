"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatDate } from "date-fns";

export type BillboardColumn = {
  id: string;
  label: string;
  created_at: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) =>
      formatDate(new Date(row.original.created_at), "MM/dd/yyyy"),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
