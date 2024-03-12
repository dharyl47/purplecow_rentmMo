"use client";

// React
import { useState, useEffect } from "react";

import Loader from "@/components/common/Loader";

import DefaultLayout from "@/components/admin/Layout/DefaultLayout";
import DashboardCard from "@/components/admin/common/Cards/DashboardCards";

const Home = () => {
  const [usersCount, setUsersCount] = useState(null);
  const [listingsCount, setListingsCount] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [usersRes, listingsRes] = await Promise.all([
        fetch("/api/admin/users/count"),
        fetch("/api/admin/listing/count")
      ]);

      if (!usersRes.ok) throw new Error("Failed to fetch users count");
      const usersData = await usersRes.json();
      setUsersCount(usersData.count); // Assuming the count is nested under 'count' key

      if (!listingsRes.ok) throw new Error("Failed to fetch listings count");
      const listingsData = await listingsRes.json();
      setListingsCount(listingsData.count); // Assuming the count is nested under 'count' key

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <DefaultLayout>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-18">
            <DashboardCard title="Users" sales={usersCount} />
            <DashboardCard title="Listings" sales={listingsCount} />
            <DashboardCard title="Hosting Requests" sales={5} />
            <DashboardCard title="Rented Cars" sales={500} />
          </div>
        )}
      </DefaultLayout>
    </>
  );
};

export default Home;
