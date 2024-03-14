'use client'

// Axios
import axios from "axios";

// Next
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Utils
import { formatCurrency, formatTimestamp } from "@/utils/utils";

// Components
import Modal from "@/components/common/Modal";
import Loader from "@/components/common/Loader";
import Dropdown from "@/components/Inputs/Dropdown";
import DataTable from "@/components/tables1/DataTables";
import DefaultLayout from "@/components/dashboard/Layout/DefaultLayout";

import { useAuth } from "@/contexts/AuthProvider";

// Options
const headers = [
  { title: "Renter's Name", key: "renter" },
  { title: "Status", key: "status" },
  { title: "Price", key: "totalPrice" },
  { title: "Car Brand", key: "brand" },
  { title: "Car Model", key: "model" },
  { title: "Trip Start", key: "startDate" },
  { title: "Trip End", key: "endDate" },
];

const options = [
  { value: 'pending', label: 'Pending', colorClass: 'bg-yellow-500 hover:bg-yellow-400' },
  { value: 'confirmed', label: 'Confirmed', colorClass: 'bg-green-500 hover:bg-green-400' },
  { value: 'cancelled', label: 'Cancelled', colorClass: 'bg-red-500 hover:bg-red-400' },
  { value: 'completed', label: 'Completed', colorClass: 'bg-blue-500 hover:bg-blue-400' },
];

const fetchData = async (setBookingData, setLoading) => {
  try {
    const response = await axios.get("/api/bookings");
    const data = response.data;
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

  const { user } = useAuth();
  const currentUser = user;

 const isGroup = 0;
 const [name, setName] = useState("");

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
    setLoading(true);

    try {
      await axios.put("/api/bookings/updateStatus", {_id: selectedBooking._id, status: updateStatus});
      await memoizedFetchData();
      setIsModalOpen(false);
      setLoading(false);

    } catch (error) {
      memoizedFetchData();
      setIsModalOpen(false);
    }  
    
if(updateStatus=="confirmed"){
    try {
  const res = await fetch("/api/chats", {
      method: "POST",
      body: JSON.stringify({
        currentUserId: currentUser._id,
        members: [selectedBooking.user],
        isGroup,
        name,
      }),
    });
    const chat = await res.json();
} catch (error) {

    }
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
                  onClick={() => setSelectedBooking(item)} 
                  options={options} 
                  onSelect={handleUpdateStatus} 
                  defaultSelected={dropdownDefault}  
                />
            </div>
          </React.Fragment>
        ),
        startDate: formatTimestamp(item.startDate),
        endDate: formatTimestamp(item.endDate),
        totalPrice: formatCurrency(item.totalPrice),
      };
    });

    setRevisedData(revisedListing)
  }, [bookingData])
  
  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold">My Bookings</h1>

      {loading ? (
        <Loader positionStart />
      ) : (
          <DataTable headers={headers} data={revisedData || []} itemsPerPage={10} />
      )}


      <Modal
        title="Update Status Confirmation"
        onAccept={handleAccept}
        onDecline={handleDecline}
        onClose={handleClose}
        triggerModal={isModalOpen}
      >
        <p>
          Are you sure you want to change the status? 
        </p>
      </Modal>
    </DefaultLayout>
  );
}

export default Listings;
