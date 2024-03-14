'use client'

import axios from "axios";
import React, { useState, useEffect } from "react";

import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/dashboard/Layout/DefaultLayout";
import DataTable from "@/components/tables1/DataTables";

import { formatTimestamp } from "@/utils/utils";

import { useAuth } from "@/contexts/AuthProvider";

const headers = [
  { title: "Model", key: "model" },
  { title: "Brand", key: "brand" },
  { title: "License Plate Number", key: "licensePlateNumber" },
  { title: "Price", key: "price" },
  { title: "Availability Start Date", key: "carAvailabilityStartDate" },
  { title: "Availability End Date", key: "carAvailabilityEndDate" },
];


function Listings() {
  const { user } = useAuth();
  const userData = user;

  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/listing/${userData._id}`);
        const data = response.data;

        setListingData(data.listings);
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
      <h1 className="text-3xl font-bold">My Listings</h1>

      {loading ? (
        <Loader positionStart />
      ) : (
          <DataTable headers={headers} data={revisedListing} itemsPerPage={10} />
      )}
    </DefaultLayout>
  );
}

export default Listings;
