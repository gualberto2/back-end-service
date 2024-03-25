"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";

import { SidebarSection } from "@/utils/types";
import { Separator } from "./ui/separator";
import Link from "next/link";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  content: SidebarSection[]; // Use the SidebarSection type here
}

interface SidebarNavigationProps {
  besId: string;
  baseRoute: string;
  section: string;
  items: {
    name: string;
    endpoint: string;
  }[];
}

const SidebarNavigation = ({
  besId,
  baseRoute,
  section,
  items,
}: SidebarNavigationProps) => {
  const createSidebarLink = (endpoint?: string): string => {
    // If endpoint is undefined, return the root path
    if (!endpoint) {
      return `/${besId}`;
    }

    const basePath = `/${besId}/${baseRoute}`;
    // If endpoint is defined but empty, return basePath
    if (endpoint === "") {
      return basePath;
    }

    const formattedEndpoint = endpoint.startsWith("/")
      ? endpoint.slice(1)
      : endpoint;
    return `${basePath}/${formattedEndpoint}`;
  };

  return (
    <div>
      <div className="flex flex-col px-8 gap-2 py-6 cursor-default shadow-sm md:shadow-none text-sm font-light tracking-normal">
        <h3 className="text-neutral-500">{section}</h3>
        {items.map((item, index) => (
          <Link href={createSidebarLink(item.endpoint)} key={index}>
            <p className="text-neutral-400 cursor-pointer hover:text-neutral-300 transition duration-150 ease-in-out">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
      <Separator />
    </div>
  );
};

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  content,
  besId,
  baseRoute,
}: SidebarProps & { besId: string; baseRoute: string }) => {
  const pathname = usePathname();
  const route = useRouter();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen lg:w-60 flex-col overflow-y-hidden bg-popover duration-150 ease-in-out border-r  lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-center gap-2 px-6 h-14 py-4 border-b  transition duration-150 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-700">
        <h1
          className="font-OCOMNI cursor-pointer text-green-500 tracking-tight"
          onClick={() => {
            route.push("/");
          }}
        >
          OCOMNI - BES
        </h1>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <X />
        </button>
      </div>
      <div className="flex flex-col ">
        <div className="flex flex-col ">
          {content.map((section, index) => (
            <SidebarNavigation
              key={index}
              besId={besId}
              baseRoute={baseRoute}
              section={section.section}
              items={section.items.map((item) => ({
                name: item.name,
                endpoint: item.link, // This assumes your items will have 'link' as just the endpoint part
              }))}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
