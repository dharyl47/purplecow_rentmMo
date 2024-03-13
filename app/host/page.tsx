"use client";

// React
import axios from "axios";
import { useState, useEffect } from "react";

import Loader from "@/components/common/Loader";

import DefaultLayout from "@/components/dashboard/Layout/DefaultLayout";
import DashboardCard from "@/components/cards/DashboardCard";

const Home = () => {
  const [counts, setCounts]: any = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response: any = await axios.get(`/api/admin/counts`);

      setCounts(response.data);
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
          <Loader positionStart />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-18">
            <DashboardCard title="Listings" sales={counts.listingCount} />
            <DashboardCard title="Rented Cars" sales={counts.bookingCount} />
          </div>
        )}
      </DefaultLayout>
    </>
  );
};

export default Home;
