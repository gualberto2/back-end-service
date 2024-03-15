"use client";

import { Tabs } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

interface Tab {
  title: string;
  value: string;
  content: string;
}

const SetupPage = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      let { data: besData, error } = await supabase
        .from("bes")
        .select("name, id");

      if (!error && besData) {
        // Assuming you want to create tabs based on the fetched data
        const formattedTabs = besData.map((bes) => ({
          title: bes.name,
          value: bes.id.toString(), // Ensure the value is a string
          content: `Content for ${bes.name}`, // This is just an example
        }));
        setTabs(formattedTabs);
      } else {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {tabs.length > 0 ? (
        <Tabs
          tabs={tabs}
          // Optionally, you can pass other props like className here
        />
      ) : (
        <div>Loading...</div> // Or any other placeholder you prefer
      )}
    </div>
  );
};

export default SetupPage;
