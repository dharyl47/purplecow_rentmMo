"use client";

// React
import React, { useEffect, useState } from "react";

// Third Party Components
import axios from "axios";

// Utils
import { formatWeekDate } from "@/utils/utils";

// Context Api
import { useAuth } from "@/contexts/AuthProvider";

// Components
import StatusChip from "../common/StatusChip";

// Icons
import { TbArrowRightCircle } from "react-icons/tb";
import Loader from "../common/Loader";

const BookedCarsSection = () => {
  const { user } = useAuth();
  const userData: any = user;

  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/bookings/customer/${userData._id}`
      );
      const data = response.data;
      setMyBookings(data.myBookings);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Booked Cars</h1>
      {loading ? (
        <Loader positionStart />
      ) : myBookings.length === 0 ? (
        <p className="text-center text-lg mt-30">No booked trips</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {myBookings.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded shadow-md border border-gray-200"
            >
              <img
                src="/assets/images/testImages/toyotaVios.jpg"
                alt="Car Image"
                className="w-full h-40 object-cover rounded-t"
              />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-gray-800">
                    {item.car.brand} {item.car.model}
                  </h2>
                  <StatusChip type={item.status}>{item.status}</StatusChip>
                </div>
                <hr className="my-5" />
                <h1 className="text-lg font-bold mb-3">
                  Pickup Start And End Date
                </h1>
                <div className="flex items-center justify-evenly mb-10">
                  <div className="flex items-center">
                    <p className="">{formatWeekDate(item.startDate)}</p>
                  </div>
                  <div className="flex items-center">
                    <TbArrowRightCircle className="mx-5" size="26" />
                  </div>
                  <div className="flex items-center">
                    <p className="">{formatWeekDate(item.endDate)}</p>
                  </div>
                </div>
                <div className="mb-10">
                  <h1 className="text-lg font-bold mb-3">Pickup Location</h1>
                  <p>{item.pickUpLocation}</p>
                </div>
                <div className="flex items-center gap-5">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Message Host
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedCarsSection;
