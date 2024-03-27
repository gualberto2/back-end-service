"use client";

import { createClient } from "@/lib/supabase/client";
import { CategoriesForm } from "./components/categories-form";
import { useEffect, useState } from "react";
import { CategoryColumn } from "../components/columns";

const BillboardPage = ({ params }: { params: { besId: string } }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryColumn | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getAuthor = async () => {
      const { data, error } = await supabase
        .from("category")
        .select("*")
        .eq("ecommerce_id", params.besId)
        .single();

      setLoading(false);
      if (error) {
        console.error("Error fetching data:", error);
      } else if (data) {
        setCategories(data);
      }
    };

    getAuthor();
  }, [params.besId, supabase]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 w-full">
        <CategoriesForm initialData={categories} />
      </div>
    </div>
  );
};

export default BillboardPage;
