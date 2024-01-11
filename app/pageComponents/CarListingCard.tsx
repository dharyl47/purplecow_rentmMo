"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Car {
  brand: string;
  carRegistrationNumber: string;
  city: string;
  country: string;
  email: string;
  licensePlateNumber: string;
  mobileNumber: string;
  model: string;
  price: string;
  state: string;
  street: string;
  zipCode: string;
  lat: string;
  lon: string;
}

const CarListingCard: React.FC<{ car: Car }> = ({ car }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const heartStyle = {
    fill: isFavorite ? "#C2A111" : "white",
    stroke: isFavorite ? "white" : "black",
    strokeWidth: "1",
  };

  return (
    <div className="border p-4 mb-4 flex bg-white rounded-md shadow-md hover:shadow-lg relative">
      <div className="absolute top-2 right-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 34 34"
          style={heartStyle}
          width="20"
          height="20"
          onClick={handleFavoriteClick}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C16.09 3.81 17.76 3 19.5 3 22.58 3 25 5.42 25 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <div className="relative w-55 h-300px mr-4 overflow-hidden">
        <Image
          src={"/assets/images/testImages/toyotaVios.jpg"}
          alt={car.brand}
          width={250}
          height={250}
        />
      </div>
      <div className="flex flex-col justify-start">
        <h3 className="text-s font-bold mb-2">{car.brand}</h3>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">&#9733;</span>
          <span className="text-s font-semibold">{4.5}</span>
          <span className="text-gray-600 ml-1">
            ({99} reviews)
          </span>
        </div>
        <p className="text-gray-600 text-s font-semibold mb-2">
          Php {car.price}/day
        </p>
      </div>
    </div>
  );
};

export default CarListingCard;
