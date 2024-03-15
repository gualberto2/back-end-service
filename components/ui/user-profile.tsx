"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "./use-toast";

export function Profile() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

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
    } catch (error: any) {
      console.error("Logout error:", error.message);
      toast({ title: "No work" });
      setLoading(false);
    }
  };
  const handleUpdate = () => {};

  return (
    <div>
      <div>hello</div>
    </div>
  );
}
