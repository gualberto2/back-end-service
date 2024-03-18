"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Skeleton } from "@/components/ui/skeleton";

import { createClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";

import { Command as CommandPrimitive } from "cmdk";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import CreateBes from "@/components/bes-create";
import { redirect } from "next/navigation";

interface Card {
  title: string;
  description: string;
  link: string;
}

interface SetupPageProps {
  params: { besId: string };
}

interface CommandInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <input
        ref={ref}
        className={`flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    </div>
  )
);

CommandInput.displayName = "CommandInput";

const SetupPage: React.FC<SetupPageProps> = ({ params }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [active, setActive] = useState<Card | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let { data: besData, error } = await supabase
        .from("bes")
        .select("name, id, type");

      if (!error && besData && besData.length > 0) {
        const formattedCards = besData.map((bes) => ({
          title: bes.name,
          link: `/${bes.id}`,
          description: bes.type,
        }));

        setCards(formattedCards);
        setActive(formattedCards[0]);
      } else {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  // Step 2: Handle search input changes with type specified for event parameter
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Step 3: Filter cards based on search query
  const filteredCards = cards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery) ||
      card.description.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto my-2 space-y-2">
      <div>
        <CreateBes />
      </div>
      <Command className="border border-neutral-200 dark:border-neutral-700">
        <CommandInput
          placeholder="Search for a project..."
          onChange={handleSearchChange}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="BES Projects">
            {!loading ? (
              filteredCards.length > 0 ? (
                <HoverEffect className="rounded-xl" items={filteredCards} />
              ) : (
                <div className="text-center my-4">
                  <p className="text-lg font-semibold">
                    {cards.length === 0
                      ? "Please create a BES Project."
                      : "Could not find any projects."}
                  </p>
                </div>
              )
            ) : (
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
            )}
            <CommandItem></CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    </div>
  );
};

export default SetupPage;
