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
    router.push(`/${bes.value}/${bes.type}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Bes"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentBes?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Bes..." />
            <CommandEmpty>No bes found.</CommandEmpty>
            <CommandGroup heading="Bes">
              {formattedItems.map((bes) => (
                <CommandItem
                  key={bes.value}
                  onSelect={() => onBesSelect(bes)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {bes.label}
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
