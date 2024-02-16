// React
import React from "react";

// Icons
import { FaStar } from "react-icons/fa";
import { FaPesoSign } from "react-icons/fa6";
import { IoHeartOutline, IoShareSocialOutline } from "react-icons/io5";

const CarDetailsHeader = () => {
  return (
    <div className="w-full">
      <img
        src={"../assets/units/vios-car@2x.png"}
        className="object-cover w-full h-96 border bg-white rounded-lg mb-5"
        alt="logo"
      />

      <div className="flex lg:flex-row md:flex-row flex-col place-content-between items-center">
        <div className="mb-5 lg:mb-0 md:mb:0">
          <h1 className="text-4xl mt-5 font-bold">Evergreen Evolve E450</h1>
          <div className="flex flex-row items-center mt-2">
            <div className="flex flex-row items-center mt-2 mr-5">
              <FaPesoSign size={23} style={{ color: "#43A047" }} />
              <p className="text-lg ml-2">3,000 per day</p>
            </div>
            <div className="flex flex-row items-center mt-2">
              <FaStar size={23} className="text-yellow-500" />
              <p className="text-lg ml-2">4.5 (99 reviews)</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <button className="flex flex-row px-4 py-2 mr-5 border border-gray rounded shadow-md">
            <IoHeartOutline size={20} />
          </button>
          <button className="flex flex-row px-4 py-2 border border-gray rounded shadow-md">
            <IoShareSocialOutline size={20} />
            <p className="ml-2 text-sm">Share This Car</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsHeader;
