'use client'

import React, { useState, useEffect } from "react";

import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/dashboard/Layout/DefaultLayout";
import DataTable from "@/components/Tables/DataTables";

import { formatTimestamp } from "@/utils/utils";

const headers = [
  { title: "Owner's Name", key: "owner" },
  { title: "Renter's Name", key: "renter" },
  { title: "Start Date", key: "startDate" },
  { title: "End Date", key: "endDate" },
  { title: "Price", key: "totalPrice" },
  { title: "Car Brand", key: "brand" },
  { title: "Car Model", key: "model" },
  { title: "Status", key: "status" },
];


function Listings() {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/api/bookings");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setBookingData(data.bookings);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const revisedListing = bookingData?.map(item => {
    const revisedItem = { 
      owner: `${item.car.ownerId.firstName} ${item.car.ownerId.lastName}`,
      renter: `${item.user.firstName} ${item.user.lastName}`,
      model: item.car.model,
      brand: item.car.brand,
      status: item.status,
      startDate: formatTimestamp(item.startDate),
      endDate: formatTimestamp(item.endDate),
      totalPrice: item.totalPrice,
    };
  
    return revisedItem;
  });

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold">Listings</h1>

      {loading ? (
        <Loader positionStart />
      ) : (
          <DataTable headers={headers} data={revisedListing} itemsPerPage={10} />
      )}
    </DefaultLayout>
  );
}

export default Listings;
