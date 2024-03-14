"use client";

import { Skeleton } from "@/components/ui/skeleton";
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
  const [active, setActive] = useState<Tab | undefined>(undefined);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      let { data: besData, error } = await supabase
        .from("bes")
        .select("name, id");

      if (!error && besData && besData.length > 0) {
        const formattedTabs = besData.map((bes) => ({
          title: bes.name,
          value: bes.id.toString(),
          content: `Content for ${bes.name}`,
        }));
        setTabs(formattedTabs);
        setActive(formattedTabs[0]); // Set the first tab as active by default
      } else {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className=" max-w-7xl mx-auto my-8">
      {tabs.length > 0 && active ? (
        <Tabs tabs={tabs} />
      ) : (
        <div>
          <div className="flex flex-col space-y-3">
        