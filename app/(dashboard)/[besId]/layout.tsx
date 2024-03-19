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

  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Function to determine the sidebar content based on the page type
    const determineContent = () => {
      // You'll need to adjust this based on how you've structured your routes
      // For example, if your route is "/dashboard/blog", then you might split the path
      // and take the second part as the type, or adjust accordingly.
      const pathParts = pathname.split(`/${params.besId}/`);
      const type = pathParts[1]; // Assuming type is the second segment of the path

      switch (type) {
        case "blog":
          return [
            {
              section: "Blog",
              items: [{ name: "Latest Posts", link: "/blog" }],
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
  }, [router]);
  return (
    <AuthProvider>
      <SelectedBesProvider>
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex bg-popover h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}

          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            content={sidebarContent}
          />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl px-2 md:px-4 2xl:px-6">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </SelectedBesProvider>
    </AuthProvider>
  );
}

// https://sites.google.com/ucsd.edu/melanie/work
// lorenaacarrillo_
