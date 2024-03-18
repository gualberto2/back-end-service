import { Separator } from "./ui/separator";
import Link from "next/link";

interface SidebarNavigationProps {
  section: string;
  items: {
    name: string;
    link: string;
  }[];
}

const SidebarNavigation = ({ section, items }: SidebarNavigationProps) => {
  return (
    <div>
      <div className="flex flex-col px-8 gap-2 py-6 cursor-default text-sm font-light tracking-normal">
        <h3 className="text-neutral-500">{section}</h3>
        {items.map((item, index) => (
          <Link href={item.link || "#"} key={index}>
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
