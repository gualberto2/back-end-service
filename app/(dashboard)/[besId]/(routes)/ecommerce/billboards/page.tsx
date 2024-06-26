"use client";

import { BillboardColumn } from "./components/columns";
import { BillboardsClient } from "./components/client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PostsPage = ({ params }: { params: { besId: string } }) => {
  const [billboards, setBillboards] = useState<BillboardColumn[]>([]);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);

      let { data: besData, error } = await supabase
        .from("billboard")
        .select("*")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

      if (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } else {
        setBillboards(besData || []);
        setLoading(false);
      }
      console.log(besData);
    };

    getPosts();
  }, [supabase, params.besId]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-2 md:p-5 pt-10">
        {loading ? (
          <div className="flex flex-col md:flex-row gap-4 p-2 justify-around">
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        ) : (
          <BillboardsClient data={billboards} />
        )}
      </div>
    </div>
  );
};

export default PostsPage;
