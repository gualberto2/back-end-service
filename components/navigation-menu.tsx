"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useBesModal } from "@/hooks/use-bes-modal";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CreateBes from "./bes-create";
import { Profile } from "./ui/user-profile";

export function Navigation({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpen = useBesModal((state) => state.onOpen);
  const isOpen = useBesModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

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
