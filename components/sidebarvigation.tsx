import { Separator } from "./ui/separator";
import Link from "next/link";

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
      <div className="flex flex-col px-8 gap-2 py-6 cursor-default text-sm font-light tracking-normal">
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

export default SidebarNavigation;
