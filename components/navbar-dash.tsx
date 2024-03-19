"use client";

import { AlignLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Navigation } from "./navigation-menu";
import { ThemeToggle } from "./theme-toggle";
import { Profile } from "./ui/user-profile";
import BesSwitcher from "./bes-switcher";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const Navbar = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [besData, setBesData] = useState<Record<string, any>[]>([]);

  const supabase = createClient();

  const fetchData = async () => {
    try {
      let { data: bes, error } = await supabase.from("bes").select("*");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        // If 'bes' is null or undefined, default to an empty array
        setBesData(bes || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <header className="sticky border-b py-2 h-14 top-0 z-40 flex flex-row items-center w-full bg-popover drop-shadow-1">
      {/* Conditional rendering based on screen size */}

      {/* Button visible for sizes smaller than lg */}
      <div className="lg:hidden flex flex-grow items-center justify-between px-4  shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            variant="ghost"
            className="block rounded-sm shadow-sm text-white"
          >
            <AlignLeft />
          </Button>
        </div>
      </div>
      <div>
        <BesSwitcher items={besData} />
      </div>
      {/* Content always visible, but button is excluded for lg and up */}
      <div className="w-full">
        <div className="">
          <div className="hidden lg:flex items-center  px-4  flex-row justify-between">
            <Navigation className="" />
            <div className="hidden md:flex items-center space-x-4">
              <Profile />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
