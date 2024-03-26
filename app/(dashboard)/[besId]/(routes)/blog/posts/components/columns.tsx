"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatDate } from "date-fns";

export type PostsColumn = {
  id: string;
  title: string;
  is_featured: boolean;
  is_archived: boolean;
  created_at: string;
};

export const columns: ColumnDef<PostsColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "is_featured",
    header: "Featured",
  },
  {
    accessorKey: "is_archived",
    header: "Archived",
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
