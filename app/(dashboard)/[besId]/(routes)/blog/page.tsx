"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BentoGridThirdDemo } from "@/components/bento-test";

type BesItem = {
  id: string;
  name: string;
  created_at: string;
  type: string;
};
interface DashboardPageProps {
  params: { besId: string };
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",

    hour12: true, // Example to force 24-hour time format
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const DashboardPage: React.FC<DashboardPageProps> = ({ params }) => {
  const [besData, setBesData] = useState<BesItem[] | null>(null);

  const supabase = createClient();

  const fetchData = async () => {
    try {
      let { data: blog, error } = await supabase
        .from("blog")
        .select("name, id, created_at, type")
        .eq("id", params.besId);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setBesData(blog || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="p-2 md:p-5 pt-10">
      {/* {besData?.map((bes) => (
        <div key={bes.id}>
          <h1>{bes.name}</h1>
          <p>Date Created: {formatDate(bes.created_at)}</p>
          <p>{bes.type}</p>
        </div>
      ))} */}
      <BentoGridThirdDemo />
    </section>
  );
};

export default DashboardPage;
