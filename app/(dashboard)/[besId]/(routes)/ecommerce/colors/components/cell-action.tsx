"use client";

import { Button } from "@/components/ui/button";
import { ColorsColumn } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { AlertModal } from "@/components/modals/alert-modals";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface CellActionProps {
  data: ColorsColumn;
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const supabase = createClient();
  const router = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({ title: "Posts ID copied to clipboard." });
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from("colors")
        .delete()
        .eq("id", data.id);

      if (error) {
        console.log(error);
        throw error;
      }

      console.log(data);
      router.refresh();
      toast({ title: "Color deleted." });
    } catch (error: any) {
      toast({ title: "Color cannot be deleted right now." });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.besId}/ecommerce/colors/${data.id}`)
            }
          >
            <Edit className="mr-2 w-4 h-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 w-4 h-4" /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 w-4 h-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
