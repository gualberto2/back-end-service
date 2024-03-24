"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { SettingsForm } from "./components/settings-form";
import { Settings } from "@/utils/types";

const SettingsPage = ({ params }: { params: { besId: string } }) => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getAuthor = async () => {
      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .eq("id", params.besId)
        .single();

      console.log(data);

      setLoading(false);
      if (error) {
        console.error("Error fetching data:", error);
      } else if (data) {
        setSettings(data);
      }
    };

    getAuthor();
  }, [params.besId, supabase]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
};

export default SettingsPage;
