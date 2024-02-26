// React
import React from "react";

// Icons
import { FaCalendarDays, FaLocationDot, FaUser } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";

const PriceRecapCard = () => {
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

      <div
        style={{ width: "50%" }}
        className=" bg-white rounded-lg shadow-md border border-gray-200 py-5 px-10 mt-5 mx-auto"
      >
        <h1 className="text-2xl font-semibold mb-6 underline underline-offset-2 text-center">
          Booking Details
        </h1>

        <div className="flex items-center justify-evenly mt-10">
          <div className="flex items-center">
            <FaCalendarDays size={30} />
            <div className="ml-3">
              <h1 className="text-lg font-bold">Start Trip</h1>
              <p className="text-sm text-gray-500">February 01, 2024</p>
            </div>
          </div>

          <div className="flex items-center">
            <FaCalendarDays size={30} />
            <div className="ml-3">
              <h1 className="text-lg font-bold">End Trip</h1>
              <p className="text-sm text-gray-500">February 10, 2024</p>
            </div>
          </div>
        </div>

        <div className="flex items-center mt-10">
          <FaLocationDot size={30} />
          <div className="ml-3">
            <h1 className="text-lg font-bold">Pickup & Return</h1>
            <p className="text-sm text-gray-500">
              J. P. Laurel Avenue (just fronting the Gaisano Mall), Bajada,
              Davao City, Davao Del Sur
            </p>
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
      </div>
    </div>
  );
};

export default PriceRecapCard;
