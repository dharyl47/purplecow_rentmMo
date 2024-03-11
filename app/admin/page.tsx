"use client";

// React
import { Suspense, useState, useEffect } from "react";
import DefaultLayout from "@/components/admin/Layout/DefaultLayout";
import DashboardCard from "@/components/admin/common/Cards/DashboardCards";
import ProtectedRoleRoutes from "@/utils/hoc/ProtectedRoleRoutes";

async function fetchData() {
  try {
    const usersRes = await fetch("/api/admin/users/count");
    if (!usersRes.ok) throw new Error("Failed to fetch users count");
    const usersData = await usersRes.json();

    const listingsRes = await fetch("/api/admin/listing/count");
    if (!listingsRes.ok) throw new Error("Failed to fetch listings count");
    const listingsData = await listingsRes.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const Home = () => {
  const [usersCount, setUsersCount] = useState(null);
  const [listingsCount, setListingsCount] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <DefaultLayout>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-18">
          <DashboardCard title="Users" sales={usersCount} />
          <DashboardCard title="Listings" sales={listingsCount} />
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardCard title="Hosting Requests" sales={5} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardCard title="Rented Listings" sales={500} />
          </Suspense>
        </div>
      </DefaultLayout>
    </>
  );
};

export default ProtectedRoleRoutes(Home, ["admin"]);
