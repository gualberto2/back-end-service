"use client";
import Navbar from "@/components/navbar-dash";
import Sidebar from "@/components/sidebar-dash";
import { SelectedBesProvider } from "@/context/selected-bes";
import { AuthProvider } from "@/context/userContext";
import { SidebarSection } from "@/utils/types";
import { useParams, usePathname, useRouter } from "next/navigation";

import React, { useState, ReactNode, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState<SidebarSection[]>([]);
  const [baseRoute, setBaseRoute] = useState("default");

  const params = useParams();
  const besId = Array.isArray(params.besId) ? params.besId[0] : params.besId;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const determineBaseRoute = () => {
      const parts = pathname.split("/");
      const besIdIndex = parts.indexOf(besId);
      if (
        besIdIndex >= 0 &&
        parts.length > besIdIndex + 1 &&
        parts[besIdIndex + 1] !== ""
      ) {
        return parts[besIdIndex + 1];
      }
      return "default";
    };

    // Call determineBaseRoute to get the current base route based on the URL
    const newBaseRoute = determineBaseRoute();

    // Update the baseRoute state if it's different from the current baseRoute
    setBaseRoute(newBaseRoute);
  }, [pathname, besId]);

  useEffect(() => {
    const determineContent = () => {
      switch (baseRoute) {
        case "blog":
          return [
            {
              section: "Home",
              items: [{ name: "Return", link: "/" }],
            },
            {
              section: "Posts",
              items: [
                { name: "Create", link: "/posts/create" },
                { name: "Edit", link: "/posts/edit" },
                { name: "Upload Images", link: "/posts/upload" },
              ],
            },
            {
              section: "Authors",
              items: [
                { name: "Add", link: "/author/add" },
                { name: "Remove", link: "/author/remove" },
                { name: "Edit", link: "/author/edit" },
              ],
            },
            {
              section: "Settings",
              items: [
                {
                  name: "Change Name",
                  link: "/settings/change",
                },
                { name: "API", link: "/settings/api" },
                { name: "Manage", link: "/settings/manage" },
              ],
            },
          ];
        case "ecommerce":
          return [
            {
              section: "Shop",
              items: [{ name: "Products", link: "/ecommerce" }],
            },
          ];
        case "helpdesk":
          return [
            {
              section: "Support",
              items: [{ name: "Tickets", link: "/helpdesk" }],
            },
          ];
        // Add more cases as needed
        default:
          return [
            { section: "General", items: [{ name: "Dashboard", link: "/" }] },
          ];
      }
    };

    setSidebarContent(determineContent());
  }, [baseRoute]);

  return (
    <AuthProvider>
      <SelectedBesProvider>
        <div className="flex bg-popover h-screen overflow-hidden">
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            content={sidebarContent}
            besId={besId}
            baseRoute={baseRoute}
          />

          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main>
              <div className="mx-auto max-w-screen-2xl px-2 md:px-4 2xl:px-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SelectedBesProvider>
    </AuthProvider>
  );
}

// https://sites.google.com/ucsd.edu/melanie/work
