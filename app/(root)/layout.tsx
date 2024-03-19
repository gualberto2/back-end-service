"use client";

import Navbar from "@/components/root-nav";
import Sidebar from "@/components/root-sidenav";
import { AuthProvider } from "@/context/userContext";
import React, { useState, ReactNode } from "react";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

// https://sites.google.com/ucsd.edu/melanie/work
// lorenaacarrillo_
