import { navConfig } from "@/data/navigation";
import HeaderAuthorization from "./HeaderAuthorization";
import HeaderMain from "./HeaderMain";
import HeaderNavigation from "./HeaderNavigation";
import { Separator } from "../ui/separator";

export default function Header() {
  return (
    <header className="">
      <HeaderAuthorization />
      <div className="container px-4 md:px-6 lg:px-8 mx-auto">
        <Separator />
      </div>
      <HeaderMain items={navConfig} />
      <div className="container px-4 md:px-6 lg:px-8 mx-auto">
        <Separator />
      </div>
      <HeaderNavigation items={navConfig} />
    </header>
  );
}
