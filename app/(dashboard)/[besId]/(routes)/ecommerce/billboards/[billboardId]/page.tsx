"use client";

import { createClient } from "@/lib/supabase/client";
import { BillboardsForm } from "./components/billboards-form";
import { useEffect, useState } from "react";
import { BillboardColumn } from "../components/columns";

const BillboardPage = ({ params }: { params: { besId: string } }) => {
  const [loading, setLoading] = useState(false);
  const [billboards, setBillboards] = useState<BillboardColumn | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getAuthor = async () => {
      const { data, error } = await supabase
        .from("billboard")
        .select("*")
        .eq("ecommerce_id", params.besId)
        .single();

      setLoading(false);
      if (error) {
        console.error("Error fetching data:", error);
      } else if (data) {
        setBillboards(data);
      }
    };

    getAuthor();
  }, [params.besId, supabase]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 w-full">
        <BillboardsForm initialData={billboards} />
      </div>
    </div>
  );
};

export default BillboardPage;
