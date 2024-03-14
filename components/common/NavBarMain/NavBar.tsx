import Link from "next/link";
import DropdownUser from "./DropdownUserMain";
import Image from "next/image";

const NavBarMain = () => {
  return (
    <header className="z-999 flex w-full bg-transparent">
      <div className="flex flex-grow items-center justify-between px-4 py-7 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:pl-20">
          <Link className="block flex-shrink-0" href="/">
            <Image
              width={150}
              height={150}
              src={"/assets/logo/RentMo-logo.svg"}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex flex-row gap-10 ml-auto mr-20 lg:flex xsm:hidden md:hidden">
          <p className="text-white">How it works</p>
          <p className="text-white">How it works</p>
          <p className="text-white">How it works</p>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default NavBarMain;
