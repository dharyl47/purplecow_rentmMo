'use client';

import axios from "axios";
import React, { useEffect, useState } from "react";

import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/dashboard/Layout/DefaultLayout";
import { formatTimestamp } from "@/utils/utils";
import DataTable from "@/components/Tables/DataTables";
import { DashboardActionButtons } from "@/components/common/Buttons";

const headers = [
  { title: "Owner", key: "owner" },
  { title: "Model", key: "model" },
  { title: "License Plate Number", key: "licensePlateNumber" },
  { title: "Price", key: "price" },
  { title: "Availability Start Date", key: "carAvailabilityStartDate" },
  { title: "Availability End Date", key: "carAvailabilityEndDate" },
  { title: "Actions", key: "actions" } 
];

function HostingRequests() {
  const [hostingRequests, setHostingRequests] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const res = await fetch("http://localhost:3000/api/admin/users/request");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      setHostingRequests(data.hostingRequest);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const hostingRequestsWithActions = hostingRequests?.map(request => {
    const revisedItem =  {
      ...request,
      carAvailabilityStartDate: "Anytime",
      carAvailabilityEndDate: "Anytime",
      owner: `${request.ownerId.firstName} ${request.ownerId.lastName}`,
      actions: [
        <div class="flex flex-row gap-3">
          <DashboardActionButtons onClick={() => handleAcceptClick(request)} type={"accept"}>Accept</DashboardActionButtons>
          <DashboardActionButtons onClick={() => handleRejectClick(request)}>Reject</DashboardActionButtons>
        </div>
      ] 
    }
  
    if (!request.carAvailability.checked) {
      revisedItem.carAvailabilityStartDate = formatTimestamp(item.carAvailability.startDate);
      revisedItem.carAvailabilityEndDate = formatTimestamp(item.carAvailability.endDate);
    } 
  
    return revisedItem;
  });
  
  const handleAcceptClick = async (request) => {
    try {
     await axios.post("/api/admin/users/request/accept", {
          requestId: request.ownerId._id
      });
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to search listings. Please try again.");
    }
  }
  
  const handleRejectClick =  async (request) => {
    const deleteID = request?._id;

    try {
      await axios.delete(`/api/listing`, {
        data: { id: deleteID }
      });


      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to search listings. Please try again.");
    }
  }

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold">Hosting Requests</h1>

      {loading ? (
        <Loader positionStart />
      ) : (
          <DataTable headers={headers} data={hostingRequestsWithActions} itemsPerPage={10} />
      )}
    </DefaultLayout>
  );
}

export default HostingRequests;
