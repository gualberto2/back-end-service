"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type AuthorColumn = {
  id: string;
  name: string;
  authorName: string;
  createdAt: string;
};

export const columns: ColumnDef<AuthorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "Authors",
    header: "Authors",
    cell: ({ row }) => row.original.authorName,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
