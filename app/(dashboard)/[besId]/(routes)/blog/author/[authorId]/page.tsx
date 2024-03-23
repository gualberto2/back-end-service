"use client";

import { createClient } from "@/lib/supabase/client";
import { AuthorForm } from "./components/author-form";
import { useEffect, useState } from "react";
import { AuthorColumn } from "../components/columns";

const AuthorPage = ({ params }: { params: { besId: string } }) => {
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState<AuthorColumn | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getAuthor = async () => {
      const { data, error } = await supabase
        .from("author")
        .select("*")
        .eq("blog_id", params.besId) // Assuming besId is the id of the author you want to edit
        .single(); // Using .single() since we expect only one record

      console.log(data);

      setLoading(false);
      if (error) {
        console.error("Error fetching data:", error);
      } else if (data) {
        setAuthor(data);
      }
    };

    getAuthor();
  }, [params.besId, supabase]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 w-full">
        <AuthorForm initialData={author} />
      </div>
    </div>
  );
};

export default AuthorPage;
