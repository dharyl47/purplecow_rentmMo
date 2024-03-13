'use client'

// Next
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Utils
import { formatTimestamp } from "@/utils/utils";

// Components
import Modal from "@/components/common/Modal";
import Loader from "@/components/common/Loader";
import Dropdown from "@/components/Inputs/Dropdown";
import DataTable from "@/components/tables/DataTables";
import DefaultLayout from "@/components/dashboard/Layout/DefaultLayout";
import axios from "axios";



// Options
const headers = [
  { title: "Renter's Name", key: "renter" },
  { title: "Status", key: "status" },
  { title: "Price", key: "totalPrice" },
  { title: "Car Brand", key: "brand" },
  { title: "Car Model", key: "model" },
  { title: "Start Date", key: "startDate" },
  { title: "End Date", key: "endDate" },
];

const options = [
  { value: 'pending', label: 'Pending', colorClass: 'bg-yellow-500 hover:bg-yellow-400' },
  { value: 'confirmed', label: 'Confirmed', colorClass: 'bg-green-500 hover:bg-green-400' },
  { value: 'cancelled', label: 'Cancelled', colorClass: 'bg-red-500 hover:bg-red-400' },
  { value: 'completed', label: 'Completed', colorClass: 'bg-blue-500 hover:bg-blue-400' },
];

const fetchData = async (setBookingData, setLoading) => {
  try {
    const res = await fetch("http://localhost:3000/api/bookings");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    setLoading(false);
    setBookingData(data.bookings);
  } catch (error) {
    setLoading(false);
    console.error("Error fetching data:", error);
  }
};

function Listings() {
  // useStates
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState("");
  const [updateStatus, setUpdateStatus] = useState(null);

  const [bookingData, setBookingData] = useState(null);
  const [revisedData, setRevisedData] = useState([]);


  // Handles
  const findOptionByValue = (value) => {
    return options.find(option => option.value === value);
  };
  
  const handleUpdateStatus = (option) => {
    setUpdateStatus(option.value)
    setIsModalOpen(true);
    return false;
  };

  const handleAccept = async () => {
    try {
      await axios.put("/api/bookings/updateStatus", {_id: selectedBooking, status: updateStatus});
        
      await memoizedFetchData();
      setIsModalOpen(false);
    } catch (error) {
      memoizedFetchData();
      setIsModalOpen(false);
    }
  };

  const handleDecline = () => {
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };


  // Data Fetching
  const memoizedFetchData = useCallback(() => fetchData(setBookingData, setLoading), []);

  useEffect(() => {
    memoizedFetchData();
  }, [memoizedFetchData]);


  useEffect(() => {
    const revisedListing = bookingData?.map(item => {
      const dropdownDefault = findOptionByValue(item.status);
      return { 
        renter: (
          <React.Fragment key={item._id} >
            <div className="flex flex-row items-center gap-2 capitalize">
                <Image src="/assets/logo/avatar-logo.png" alt="Owner's Profile" width="35" height="35" />
                {item.user.firstName} {item.user.lastName}
            </div>
          </React.Fragment>
        ),
        model: item.car.model,
        brand: item.car.brand,
        status: (
          <React.Fragment key={item._id}>
            <div className="flex flex-row gap-3">
              <Dropdown 
                  onClick={() => setSelectedBooking(item._id)} 
                  options={options} 
                  onSelect={handleUpdateStatus} 
                  defaultSelected={dropdownDefault}  
                />
            </div>
          </React.Fragment>
        ),
        startDate: formatTimestamp(item.startDate),
        endDate: formatTimestamp(item.endDate),
        totalPrice: item.totalPrice,
      };
    });

    setRevisedData(revisedListing)
  }, [bookingData])
  
  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold">Bookings</h1>

      {loading ? (
        <Loader positionStart />
      ) : (
          <DataTable headers={headers} data={revisedData || []} itemsPerPage={10} />
      )}


      <Modal
        title="Update Status Confimation"
        onAccept={handleAccept}
        onDecline={handleDecline}
        onClose={handleClose}
        triggerModal={isModalOpen}
      >
        <p>
          Are you sure you want to proceed? This action cannot be changed once
          accepted.
        </p>
      </Modal>
    </DefaultLayout>
  );
}

export default Listings;
