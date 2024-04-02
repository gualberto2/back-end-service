"use client";

import { createClient } from "@/lib/supabase/client";
import { ColorsForm } from "./components/colors-form";
import { useEffect, useState } from "react";
import { ColorsColumn } from "../components/columns";

const BillboardPage = ({ params }: { params: { besId: string } }) => {
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState<ColorsColumn | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getColors = async () => {
      const { data, error } = await supabase
        .from("colors")
        .select("*")
        .eq("ecommerce_id", params.besId)
        .single();

      setLoading(false);
      if (error) {
        console.error("Error fetching data:", error);
      } else if (data) {
        setColors(data);
      }
    };

    getColors();
  }, [params.besId, supabase]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 w-full">
        <ColorsForm initialData={colors} />
      </div>
    </div>
  );
};

export default BillboardPage;
