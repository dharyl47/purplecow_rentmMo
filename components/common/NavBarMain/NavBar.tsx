import Link from "next/link";
import { useRouter } from "next/navigation";

import DropdownUser from "./DropdownUserMain";

import Image from "next/image";

import { useAuth } from "@/contexts/AuthProvider";

const NavBarMain = () => {
  const router = useRouter();

  const { user } = useAuth();
  const userData: any = user;
  const userValid = userData?.role === "host" || userData?.role === "admin";

  return (
    <header className="z-999 flex w-full bg-transparent">
      <div className="flex flex-grow items-center justify-between px-4 py-7 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:pl-20">
          <Link
            className="block flex-shrink-0 duration-300 ease-in-out hover:scale-105"
            href="/"
          >
            <Image
              width={150}
              height={150}
              src={"/assets/logo/RentMo-logo.svg"}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex flex-row items-center gap-10 ml-auto  lg:flex 2xsm:hidden md:hidden ">
          <p
            className="text-white text-lg cursor-pointer hover:text-yellow-300"
            // onClick={() => router.push("/")}
          >
            How it works
          </p>
          <p
            className="text-white text-lg cursor-pointer hover:text-yellow-300"
            onClick={() => router.push("/support")}
          >
            Support
          </p>

          {userValid ? (
            <button
              className="border text-lg border-yellow-300 border-2 text-yellow-300 font-bold py-2 px-7 rounded-full bg-transparent"
              onClick={() => router.push(`/${userData?.role}`)}
            >
              Go to dashboard
            </button>
          ) : (
            <button
              className="border text-lg border-yellow-300 border-2 text-yellow-300 font-bold py-2 px-7 rounded-full bg-transparent"
              onClick={() => router.push("/listing")}
            >
              Become a host
            </button>
          )}
        </div>
        <span className=" xl:mx-10 lg:mt-0 lg:w-[2px] lg:h-10 bg-gray-600  lg:mx-5 w-3/4 h-[1px] mt-14 2xsm:hidden lg:block md:hidden sm:hidden xl:block" />
        {userData ? (
          <div className="flex items-center gap-3 2xsm:gap-7 z-999">
            <DropdownUser />
          </div>
        ) : (
          <div className="flex items-center gap-10">
            <p
              className="text-white text-lg cursor-pointer hover:text-yellow-300"
              onClick={() => router.push("/login")}
            >
              Login
            </p>
            <p
              className="text-white text-lg cursor-pointer hover:text-yellow-300"
              onClick={() => router.push("/registration")}
            >
              Signup
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBarMain;
