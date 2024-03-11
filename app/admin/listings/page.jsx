"use client";

import React, { Suspense } from "react";

// Components
import DefaultLayout from "@/components/admin/Layout/DefaultLayout";
import DataTable from "@/components/admin/common/Tables/DataTables";

import { formatTimestamp } from "@/utils/utils";
import ProtectedRoleRoutes from "@/utils/hoc/ProtectedRoleRoutes";

async function getAllListing() {
  const res = await fetch("http://localhost:3000/api/admin/listing/find");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


const Listings = async () => {
  const fetchListing = await getAllListing();

  const headers = [
    { title: "Owner", key: "owner" },
    { title: "Model", key: "model" },
    { title: "Brand", key: "brand" },
    { title: "License Plate Number", key: "licensePlateNumber" },
    { title: "Price", key: "price" },
    { title: "Availability Start Date", key: "carAvailabilityStartDate" },
    { title: "Availability End Date", key: "carAvailabilityEndDate" },
  ];

  const revisedListing = fetchListing.listing.map(item => {
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

      <Suspense fallback={<div>Loading...</div>}>
        <DataTable headers={headers} data={revisedListing} itemsPerPage={10} />
      </Suspense>
    </DefaultLayout>
  );
}

export default ProtectedRoleRoutes(Listings, ["admin"]);