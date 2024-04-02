"use client";

import { ColorsColumn } from "./components/columns";
import { ColorsClient } from "./components/client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ColorsPage = ({ params }: { params: { besId: string } }) => {
  const [colors, setColors] = useState<ColorsColumn[]>([]);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const getColors = async () => {
      setLoading(true);

      let { data: besData, error } = await supabase
        .from("colors")
        .select("*")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

      if (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } else {
        setColors(besData || []);
        setLoading(false);
      }
      console.log(besData);
    };

    getColors();
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
          <ColorsClient data={colors} />
        )}
      </div>
    </div>
  );
};

export default ColorsPage;
