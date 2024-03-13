'use client'

import React, { useState, useEffect } from "react";

import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/admin/Layout/DefaultLayout";
import DataTable from "@/components/Tables/DataTables";
import StatusChip from "@/components/common/StatusChip";

import { formatTimestamp } from "@/utils/utils";
import Image from "next/image";

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

  const headers = [
    { title: "Owner's Name", key: "owner" },
    { title: "Renter's Name", key: "renter" },
    { title: "Status", key: "status" },
    { title: "Price", key: "totalPrice" },
    { title: "Car Brand", key: "brand" },
    { title: "Car Model", key: "model" },
    { title: "Start Date", key: "startDate" },
    { title: "End Date", key: "endDate" },
    { title: "Actions", key: "actions" },
  ];


  const revisedListing = bookingData?.map(item => {
    const revisedItem = { 
      owner: <div className="flex flex-row items-center gap-2 capitalize">
         <Image src="/assets/logo/avatar-logo.png" alt="Owner's Profile" width="35" height="35" />
         {item.car.ownerId.firstName} {item.car.ownerId.lastName}
      </div>,
      renter: <div className="flex flex-row items-center gap-2 capitalize">
        <Image src="/assets/logo/avatar-logo.png" alt="Owner's Profile" width="35" height="35" />
        {item.user.firstName} {item.user.lastName}
    </div>,
      model: item.car.model,
      brand: item.car.brand,
      status: <StatusChip type={item.status}>{item.status}</StatusChip>,
      startDate: formatTimestamp(item.startDate),
      endDate: formatTimestamp(item.endDate),
      totalPrice: item.totalPrice,
    };
  
    return revisedItem;
  });

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold">Bookings</h1>

      {loading ? (
        <Loader />
      ) : (
          <DataTable headers={headers} data={revisedListing} itemsPerPage={10} />
      )}
    </DefaultLayout>
  );
}

export default Listings;
