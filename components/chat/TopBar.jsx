"use client";

import { Logout } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useAuth } from "../../contexts/AuthProvider"

import Image from "next/image";
import logo from "@/public/assets/logo/RentMo-logo.svg";

const TopBar = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    signOut({ callbackUrl: "/" });
  };

    const { user, logout } = useAuth();
  const currentUser = user;

  return (
    <div className="topbar">
      <Link href="/chats">
          <Image
              className="w-24 lg:w-36 sm:w-32 xl:w-48  hover:scale-105 hover:drop-shadow-md transition-all"
              src={logo}
              alt="logo"
            />
      </Link>

      <div className="menu">
        <Link
          href="/chats"
          className={`${
            pathname === "/chats" ? "text-white" : ""
          } text-heading4-bold text-white`}
        >
          Chats
        </Link>
        <Link
          href="/contacts"
          className={`${
            pathname === "/contacts" ? "text-white" : ""
          } text-heading4-bold text-white`}
        >
          Contacts
        </Link>

        <Logout
          sx={{ color: "#737373", cursor: "pointer" }}
          onClick={handleLogout}
        />

        <Link href="/profile">
          <img
            src={'https://cdn-icons-png.flaticon.com/128/1326/1326405.png' || "/assets/person.jpg"}
            alt="profile photo"
                className="profilePhoto"
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
