import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import gmailLogo from "@/public/assets/logo/icons8-gmail.svg";
// ... (interface definitions and other components remain unchanged)

interface ButtonProps {
  text: string;
}

interface ButtonLinkProps {
  text: string;
  to: string;
}

export const ButtonFillRoundedSearch = ({ text }: any) => {
  // const router = useRouter();
  // const handleFindRide = () => {
  //   router.push("/search");
  // };

  return (
    <button
      className="text-black rounded-full w-44 h-16 bg-yellow-300 font-bold text-xl shadow-md hover:shadow-buttonbox transition"
      // onClick={handleFindRide}
    >
      {text}
    </button>
  );
};

export const ButtonFillRounded = ({ text }: ButtonProps) => {
  return (
    <button className="text-black rounded-full w-44 h-16 bg-yellow-300 font-bold text-xl shadow-md hover:shadow-buttonbox transition">
      {text}
    </button>
  );
};

export const ButtonFillRoundedFull = ({ text, to }: ButtonLinkProps) => {
  return (
    <Link href={to} prefetch>
      <span className="text-black rounded-full w-full py-2 bg-yellow-300 font-bold text-md hover:shadow-md transition">
        {text}
      </span>
    </Link>
  );
};

export const ButtonFill = ({ text }: ButtonProps) => {
  return (
    <button
      type="submit"
      role="button"
      className="focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 text-sm font-semibold leading-none text-black focus:outline-none bg-yellow-300 rounded hover:opacity-70 py-4 w-full transition"
    >
      {text}
    </button>
  );
};

export const ButtonNoFillRounded = ({ text }: ButtonProps) => {
  return (
    <a
      href="#report-listings"
      className="rounded-full px-4 py-2 ring-1 ring-yellow-300 text-yellow-300 hover:text-yellow-300 hover:ring-yellow-300 font-bold drop-shadow-sm transition-colors"
    >
      {text}
    </a>
  );
};

export const ButtonLink = ({ text, to }: ButtonLinkProps) => {
  return (
    <Link href={to} prefetch>
      <span className="hover:text-yellow-300 transition">{text}</span>
    </Link>
  );
};

export const ButtonLinkFill = ({ text, to }: ButtonLinkProps) => {
  return (
    <a
      href={to}
      className="text-center focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 text-sm font-semibold leading-none text-white focus:outline-none bg-gray-700 rounded hover:opacity-70 py-4 w-full transition"
    >
      {text}
    </a>
  );
};

export const ButtonLinkNoFillRounded = ({ text, to }: ButtonLinkProps) => {
  return (
    <Link href={to} prefetch>
      <span className="hover:text-white hover:ring-white transition ring-yellow-300 ring-2 rounded-full py-4 px-8">
        {text}
      </span>
    </Link>
  );
};

export const GoogleButton = () => {
  return (
    <a
      onClick={() => signIn("google")}
      aria-label="Continue with google"
      role="button"
      className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
    >
      {/* <svg
        width={19}
        height={20}
        viewBox="0 0 19 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      ></svg> */}
      <Image
        className="inline self-center no-select"
        src={gmailLogo}
        alt="logo"
        width={19}
        height={10}
      />
      <p className="text-base font-medium ml-4 text-gray-700">
        Continue with Google
      </p>
    </a>
  );
};
