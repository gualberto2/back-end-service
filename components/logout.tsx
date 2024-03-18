"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const Logout = () => {
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();
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
  return (
    <div>
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
export default Logout;
