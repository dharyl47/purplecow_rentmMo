"use client";

import { ICar } from "@/types/types";
// React
import React from "react";

// Icons
import { FaUser } from "react-icons/fa6";
import { FcCancel, FcCheckmark } from "react-icons/fc";

// Third Party Components
import MapGL from "react-map-gl";


interface CardInformation {
  description: string;
  features: string[];
  owner: {
    firstName: String;
    lastName: String;
    createdAt: String;
  };
}


const CarInformationCard: React.FC<CardInformation> = ({ description, features, owner }) => {

  const featuresName: { [key: string]: string } = {
    allWheelDrive: "All-wheel drive",
    androidAuto: "Android Auto",
    appleCarPlay: "Apple CarPlay",
    automaticTransmission: "Automatic Transmission",
    auxInput: "AUX input",
    backUpCamera: "Backup camera",
    bikeRack: "Bike rack",
    converTible: "Convertible",
    gps: "GPS",
    petFriendly: "Pet Friendly",
    tollPass: "Toll pass",
    usbCharger: "USB charger",
  };

  return (
    <div className="grid-item w-full  bg-white rounded-lg shadow-md border border-gray-200 py-10 lg:px-10 md:px-10 px-7">
      <h1 className="text-2xl font-bold mb-6 underline underline-offset-2">
        Description
      </h1>
      <p className="text-sm">
        {description}
      </p>

      <hr className="my-7" />

      <h1 className="text-2xl font-bold mb-6 underline underline-offset-2">
        Features
      </h1>

      <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        
        {features && Object?.entries(features).map(([featureKey, featureValue], index) => (
          <div className="flex flex-row items-center" key={index}>
            {featureValue ? (
              <FcCheckmark className="mr-2" />
            ) : (
              <FcCancel className="mr-2" />
            )}
            <p className="text-sm">{featuresName[featureKey]}</p>
          </div>
        ))}
      </div>

      <hr className="my-7" />

      <h1 className="text-2xl font-bold mb-6 underline underline-offset-2">
        Location
      </h1>

      <div>
        <MapGL
          initialViewState={{
            longitude: 125.601695,
            latitude: 7.069139,
            zoom: 11,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken="pk.eyJ1IjoiZGhhcnlsOTciLCJhIjoiY2w5NTluMDh2MXQ3YTNucW16cG9tbGU3dyJ9.z96hyUi9vkmIJDdBB6WjxA"
          attributionControl={false}
        ></MapGL>
      </div>

      <hr className="my-7" />

      <h1 className="text-2xl font-bold mb-6 underline underline-offset-2">
        Owner Info
      </h1>

      <div className="flex items-center mt-3 ml-2">
        <div className="rounded-md border border-black overflow-hidden h-16 w-16 object bg-gray-300">
          <FaUser className="text-white h-full w-full" />
        </div>
        <div className="ml-3">
          <h1 className="text-lg font-bold">{owner?.firstName + " " + owner?.lastName}</h1>
          <p className="text-xs text-gray-500">Joined {owner?.createdAt.split("-")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default CarInformationCard;
