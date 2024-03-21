"use client";

import { format } from "date-fns";
import { AuthorColumn } from "./components/columns";
import { AuthorsClient } from "./components/client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AuthorPage = ({ params }: { params: { besId: string } }) => {
  const [authors, setAuthors] = useState<AuthorColumn[]>([]);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const getAuthors = async () => {
      setLoading(true); // Move setLoading here to indicate loading started

      let { data: besData, error } = await supabase.from("author").select("*");

      if (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } else {
        setAuthors(besData || []); // Update the authors state with fetched data
        setLoading(false);
      }
      console.log(besData); // Add this to log the data fetched
    };

    getAuthors();
  }, [supabase, params.besId]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
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
          <AuthorsClient data={authors} />
        )}
      </div>
    </div>
  );
};

export default AuthorPage;
