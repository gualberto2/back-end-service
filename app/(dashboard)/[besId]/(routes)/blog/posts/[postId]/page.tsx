"use client";

import { createClient } from "@/lib/supabase/client";
import { PostsForm } from "./components/post-form";
import { useEffect, useState } from "react";
import { PostsColumn } from "../components/columns";

const AuthorPage = ({ params }: { params: { besId: string } }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostsColumn | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getAuthor = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("blog_id", params.besId)
        .single();

      setLoading(false);
      if (error) {
        console.error("Error fetching data:", error);
      } else if (data) {
        setPosts(data);
      }
    };

    getAuthor();
  }, [params.besId, supabase]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 w-full">
        <PostsForm initialData={posts} />
      </div>
    </div>
  );
};

export default AuthorPage;
