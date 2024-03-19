"use client";
import Navbar from "@/components/navbar-dash";
import Sidebar from "@/components/sidebar-dash";
import { SelectedBesProvider } from "@/context/selected-bes";
import { AuthProvider } from "@/context/userContext";

import React, { useState, ReactNode, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <SelectedBesProvider>
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex bg-popover h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}

          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
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
