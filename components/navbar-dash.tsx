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
  const [items, setItems] = useState<Record<string, any>[]>([]);

  const supabase = createClient();

  const fetchData = async () => {
    try {
      const { data: blogs, error: blogError } = await supabase
        .from("blog")
        .select("name, id");
      const { data: ecommerces, error: ecommerceError } = await supabase
        .from("ecommerce")
        .select("name, id");
      const { data: helpdesks, error: helpdeskError } = await supabase
        .from("helpdesk")
        .select("name, id");
      if (blogError || ecommerceError || helpdeskError) {
        console.error(
          "Error fetching data:",
          blogError || ecommerceError || helpdeskError
        );
      } else {
        // Combine the results into a single array
        const combinedItems = [
          ...(blogs || []).map((item) => ({ ...item, type: "blog" })),
          ...(ecommerces || []).map((item) => ({ ...item, type: "ecommerce" })),
          ...(helpdesks || []).map((item) => ({ ...item, type: "helpdesk" })),
        ];

        setItems(combinedItems);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

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
            className="block rounded-sm  text-black dark:text-white"
          >
            <AlignLeft />
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between items-center">
        {/* <div className="md:ml-2">
          <BesSwitcher className="bg-popover popup-z z-50" items={items} />
        </div> */}
        <div className="ml-3">Switcher</div>
        <div className="flex flex-row-reverse gap-2 pr-3">
          <div className="hidden md:flex md:flex-row">
            <Navigation className="" />
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
