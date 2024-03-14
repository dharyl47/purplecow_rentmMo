'use client'

import React, { useState, useEffect } from "react";

import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/dashboard/Layout/DefaultLayout";
import DataTable from "@/components/tables1/DataTables";

import { formatCurrency, formatTimestamp } from "@/utils/utils";
import axios from "axios";
import StatusChip from "@/components/common/StatusChip";

const headers = [
  { title: "Owner's Name", key: "owner" },
  { title: "Renter's Name", key: "renter" },
  { title: "Status", key: "status" },
  { title: "Pickup Location", key: "location" },
  { title: "Trip Start", key: "startDate" },
  { title: "Trip End", key: "endDate" },
  { title: "Total Price", key: "totalPrice" },
  { title: "Car Brand", key: "brand" },
  { title: "Car Model", key: "model" },
];


function Listings() {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/bookings");
        const data = response.data;
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
      status:  <StatusChip type={item.status}>{item.status}</StatusChip>,
      startDate: formatTimestamp(item.startDate),
      endDate: formatTimestamp(item.endDate),
      totalPrice: formatCurrency(item.totalPrice),
      location: item.pickUpLocation,
    };
  
    return revisedItem;
  });

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold">All Bookings</h1>

      {loading ? (
        <Loader positionStart />
      ) : (
          <DataTable headers={headers} data={revisedListing} itemsPerPage={10} />
      )}
    </DefaultLayout>
  );
}

export default Listings;
