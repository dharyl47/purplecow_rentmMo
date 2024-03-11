"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/admin/common/Loader";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="dark:bg-admin-boxdark-2 dark:text-admin-bodydark">
      {loading ? <Loader /> : children}
    </div>
  );
};

export default RootLayout;
