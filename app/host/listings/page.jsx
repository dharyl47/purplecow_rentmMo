'use client'

import React, { useState, useEffect } from "react";

import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/dashboard/Layout/DefaultLayout";
import DataTable from "@/components/tables1/DataTables";

import { formatTimestamp } from "@/utils/utils";

const headers = [
  { title: "Owner", key: "owner" },
  { title: "Model", key: "model" },
  { title: "Brand", key: "brand" },
  { title: "License Plate Number", key: "licensePlateNumber" },
  { title: "Price", key: "price" },
  { title: "Availability Start Date", key: "carAvailabilityStartDate" },
  { title: "Availability End Date", key: "carAvailabilityEndDate" },
];


function Listings() {
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/api/admin/listing/find");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setListingData(data.listing);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);


  const revisedListing = listingData?.map(item => {
    const revisedItem = { 
      owner: item.ownerId,
      ...item 
    };
    
    if (item.carAvailability.checked) {
      revisedItem.carAvailabilityStartDate = `Anytime`;
      revisedItem.carAvailabilityEndDate = `Anytime`;
    } else {
      revisedItem.carAvailabilityStartDate = formatTimestamp(item.carAvailability.startDate);
      revisedItem.carAvailabilityEndDate = formatTimestamp(item.carAvailability.endDate);
    }
  
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
