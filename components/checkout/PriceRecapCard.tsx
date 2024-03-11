"use client";

// React
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Icons
import { FaCalendarDays, FaLocationDot, FaUser } from "react-icons/fa6";
import Modal from "../common/Modal";

const PriceRecapCard = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();
  let bookingDetailsParam: any = searchParams.get("bookingDetails");
  bookingDetailsParam = JSON.parse(bookingDetailsParam);

  const formatDate = (timestamp: any) => {
    const date = new Date(timestamp);
    const options: any = { month: "long", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleCheckoutRide = () => {
    setIsModalOpen(true);
  };

  const handleAccept = () => {
    // console.log("Accepted");
    router.push(`/payment`);
  };

  const handleDecline = () => {
    console.log("Declined");
  };

  const handleClose = () => {
    console.log("Closed");
  };

  return (
    <div className="w-full py-10 lg:px-10 md:px-10 px-7">
      <img
        src={"/assets/units/vios-car@2x.png"}
        className="object-cover w-full h-full  bg-white rounded-lg mb-5"
        alt="logo"
      />

      <h1 className="text-4xl mt-5 font-bold text-center">
        Mercedes-Benz 2015
      </h1>
      <h1 className="text-lg font-thin text-center">John Doe</h1>

      <div className=" bg-white rounded-lg shadow-md border border-gray-200 py-5 px-10 mt-5 mx-auto">
        <h1 className="text-2xl font-semibold mb-6 underline  underline-offset-2 ">
          Booking Details
        </h1>

        <div className="flex flex-start  mt-10 gap-10">
          <div className="flex items-center">
            <FaCalendarDays size={30} />
            <div className="ml-3">
              <h1 className="text-lg font-bold">Start Trip</h1>
              <p className="text-sm text-gray-500">
                {formatDate(bookingDetailsParam.startTripDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <FaCalendarDays size={30} />
            <div className="ml-3">
              <h1 className="text-lg font-bold">End Trip</h1>
              <p className="text-sm text-gray-500">
                {formatDate(bookingDetailsParam.endTripDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <FaLocationDot size={30} />
            <div className="ml-3">
              <h1 className="text-lg font-bold">Pickup & Return</h1>
              <p className="text-sm text-gray-500">
                {bookingDetailsParam.location}
              </p>
            </div>
          </div>
        </div>

        <hr className="my-7" />

        <div className="grid grid-cols-2 gap-4 box-with-shadow w-full">
          <div className="flex items-center">
            <div className="ml-2">
              <p className="font">₱ 3,000 x 2 days</p>
            </div>
          </div>
          <div className="flex items-center ml-auto">
            <div className="ml-2">
              <p className="font-bold">₱ 6,000</p>
            </div>
          </div>
          <div className="flex items-center ">
            <div className="ml-2">
              <p className="font">Delivery Fee</p>
            </div>
          </div>
          <div className="flex items-center ml-auto">
            <div className="ml-2">
              <p className="font-bold">₱ 200</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-2">
              <p className="font">Platform Fee</p>
            </div>
          </div>
          <div className="flex items-center ml-auto">
            <div className="ml-2">
              <p className="font-bold">₱ 50</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-2">
              <p className="font-bold">Total</p>
            </div>
          </div>
          <div className="flex items-center ml-auto">
            <div className="ml-2">
              <p className="font-bold">₱ 6,250</p>
            </div>
          </div>
        </div>

        <hr className="my-7" />

        <div className="flex justify-center col-span-2">
          <button
            className="w-full bg-yellow-300 text-black rounded-lg py-3 px-6 font-bold hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300"
            onClick={handleCheckoutRide}
          >
            Proceed To Payment
          </button>
        </div>
      </div>
      <Modal
        title="Booking Confirmation"
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
    </div>
  );
};

export default PriceRecapCard;
