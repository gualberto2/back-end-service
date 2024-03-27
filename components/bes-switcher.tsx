"use client";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, Store as StoreIcon } from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Command,
  CommandList,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface BesSwitcherProps extends PopoverTriggerProps {
  items: Record<string, any>[];
}

export default function BesSwitcher({
  className,
  items = [],
}: BesSwitcherProps) {
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
    type: item.type,
  }));

  const currentBes = formattedItems.find((item) => item.value === params.besId);

  const [open, setOpen] = useState(false);

  const onBesSelect = (bes: { value: string; label: string; type: string }) => {
    setOpen(false);

    const path = `/${bes.type}/${bes.value}`;

    router.push(path);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Bes"
          className={cn("w-auto justify-between ", className)}
        >
          {currentBes?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Bes..." />
            <CommandEmpty>No bes found.</CommandEmpty>
            <CommandGroup heading="Bes">
              {formattedItems.map((bes) => (
                <CommandItem
                  key={bes.value}
                  onSelect={() => onBesSelect(bes)}
                  className="text-sm flex flex-row items-start"
                >
                  <div className="flex flex-col ">
                    <p className="whitespace-nowrap">{bes.label}</p>
                    <p className="whitespace-nowrap text-xs text-neutral-600">
                      {bes.type}
                    </p>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentBes?.value === bes.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
