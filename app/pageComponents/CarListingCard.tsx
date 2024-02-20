"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCity, FaPesoSign, FaStar } from "react-icons/fa6";

interface Car {
  brand: string;
  carRegistrationNumber: string;
  description: string;
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

const CarListingCard: React.FC<{
  car: Car;
  onCardClick: (car: Car) => void;
}> = ({ car, onCardClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const heartStyle = {
    fill: isFavorite ? "#C2A111" : "white",
    stroke: isFavorite ? "white" : "black",
    strokeWidth: "1",
    cursor: "pointer",
  };
  const router = useRouter();

  const viewDetailsHandler = (car: any) => {
    // Use encodeURIComponent to safely serialize the object as a query parameter
    const carObject = encodeURIComponent(JSON.stringify(car));

    // Navigate to the carDetails page with the car object as a query parameter
    router.push(`/carDetail?car=${carObject}`);
  };

  return (
    <div
      className="border mb-4 flex bg-white rounded-md shadow-md hover:shadow-lg relative carlist-cont"
      onClick={() => onCardClick(car)}
    >
      <div className="absolute top-5 right-3 div-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 34 34"
          style={heartStyle}
          width="25"
          height="25"
          onClick={handleFavoriteClick}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C16.09 3.81 17.76 3 19.5 3 22.58 3 25 5.42 25 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <div className="relative w-55 h-full overflow-hidden div-2">
        <Image
          src={"/assets/images/testImages/toyotaVios.jpg"}
          alt={car.brand}
          className="h-full"
          width={300}
          height={350}
        />
      </div>

      <div className="flex flex-col div-3 px-5 py-2">
        <h3 className="text-xl font-bold car-brand truncate">
          {car.brand} {car.model}
        </h3>

        <div className="flex flex-row items-center mt-2">
          <FaStar size={15} className="text-yellow-300" />
          <p className="text-sm ml-2">4.5 (99 reviews)</p>
        </div>
        <div className="flex flex-row items-center mt-2">
          <FaPesoSign size={15} />
          <p className="text-sm ml-2">{car.price} per day</p>
        </div>
        <div className="flex flex-row items-center mt-2">
          <FaCity size={15} />
          <p className="text-sm ml-2">{car.city}</p>
        </div>
      </div>
      <div className="p-5 ml-auto flex items-end ">
        <p
          className="text-sm text-black-500 underline cursor-pointer font-semibold"
          onClick={() => viewDetailsHandler(car)}
        >
          View more details
        </p>
      </div>
    </div>
  );
};

export default CarListingCard;
