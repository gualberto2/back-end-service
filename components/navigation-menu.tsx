"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { useParams, usePathname } from "next/navigation";

import CreateBes from "./bes-create";
import { Profile } from "./ui/user-profile";

export function Navigation({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.besId}`,
      label: "Overview",
      active: pathname === `/${params.besId}`,
    },
  ];

  return (
    <nav
      className={cn(
        "flex items-center justify-between space-x-4 lg:space-x-6",
        className
      )}
    >
      <div>
        <CreateBes />
      </div>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black, dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
