import { Navigation } from "./navigation-menu";

const Navbar = async () => {
  return (
    <div className="border-b">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Navigation className="mx-6" />
          {/* <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserButton afterSignOutUrl="/" />
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
