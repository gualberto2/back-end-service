import { Navigation } from "./navigation-menu";
import { ThemeToggle } from "./theme-toggle";
import { Profile } from "./ui/user-profile";

const Navbar = async () => {
  return (
    <div className="border-b">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Navigation className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Profile /> <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
