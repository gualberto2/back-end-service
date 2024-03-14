"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "./use-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import auth from "@/context/get-user";

export function Profile() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const supabase = createClient();
  const user = auth();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (!error) {
        router.push("/");
      }

      toast({ title: "Successfully logged out" });

      router.refresh();
      setLoading(false);
    } 