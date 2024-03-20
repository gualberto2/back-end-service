"use client";

import Navbar from "@/components/root-nav";
import Sidebar from "@/components/root-sidenav";
import { AuthProvider } from "@/context/userContext";
import { SidebarSection } from "@/utils/types";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState, ReactNode, useEffect } from "react";

export default function SetupLayout({
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
        default:
          return [
            {
              section: "Projects",
              items: [{ name: "All Projects", link: "/" }],
            },
            {
              section: "Settings",
              items: [
                { name: "Preferences", link: "/" },
                { name: "Access Tokens", link: "/" },
                { name: "Security", link: "/" },
              ],
            },
            {
              section: "Account",
              items: [
                { name: "Edit Profile", link: "/" },
                { name: "User log", link: "/" },
                { name: "User log", link: "/" },
              ],
            },
            {
              section: "Billing",
              items: [
                { name: "Subscription", link: "/" },
                { name: "Usage", link: "/" },
              ],
            },
            {
              section: "Documentation",
              items: [
                { name: "Guides", link: "/" },
                { name: "API Reference", link: "/" },
              ],
            },
          ];
      }
    };

    setSidebarContent(determineContent());
  }, [baseRoute]);

  return (
    <AuthProvider>
      <div className="flex bg-popover h-screen overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          content={sidebarContent}
          besId={besId}
          baseRoute={baseRoute}
        />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl px-2 md:px-4 2xl:px-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}

// https://sites.google.com/ucsd.edu/melanie/work
// lorenaacarrillo_
