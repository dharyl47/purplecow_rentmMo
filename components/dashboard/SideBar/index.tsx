import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthProvider";

interface MenuItem {
  label: string;
  route: string;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { user } = useAuth();
  const userData: any = user;

  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    // Define menu items based on user's role
    if (userData.role === "admin") {
      setMenuItems([
        { label: "Dashboard", route: "/admin" },
        { label: "Inbox", route: "/admin/inbox" },
        { label: "Rents", route: "/admin/bookings" },
        { label: "Listings", route: "/admin/listings" },
        { label: "Hosting Requests", route: "/admin/hostingRequests" },
        { label: "Users", route: "/admin/users" },
        { label: "Settings", route: "/admin/settings" }
      ]);
    } else if (userData.role === "host") {
      setMenuItems([
        { label: "Dashboard", route: "/host" },
        { label: "Inbox", route: "/host/inbox" },
        { label: "Bookings", route: "/host/bookings" },
        { label: "Listings", route: "/host/listings" },
        { label: "Settings", route: "/host/settings" }
      ]);
    }
  }, [userData]);

  useEffect(() => {
    // Your existing useEffect logic
  }, []);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-admin-black duration-300 ease-linear dark:bg-admin-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/assets/logo/RentMo-logo.svg"}
            alt="Logo"
            priority
          />
        </Link>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          {/* Your existing button SVG */}
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-admin-bodydark2">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.route}
                    className={`hover:text-yellow-300 group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-admin-bodydark1 duration-300 ease-in-out  ${
                      pathname === item.route && "text-yellow-300"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
