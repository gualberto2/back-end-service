"use client";

import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Bes, SettingsForm } from "./components/settings-form";

const SettingsPage = ({ params }: { params: { besId: string } }) => {
  const [bes, setBes] = useState<Bes | null>(null);
  const supabase = createClient();
  const fetchData = async () => {
    try {
      let { data: besData, error } = await supabase
        .from("bes")
        .select("*")
        .eq("id", params.besId)
        .single(); // Assuming you're fetching a single record based on `besId`

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setBes(besData); // Set the fetched data directly
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.besId]); // The empty array ensures this effect runs only once after initial render

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {bes && <SettingsForm initialData={bes} />}
      </div>
    </div>
  );
};

export default SettingsPage;
