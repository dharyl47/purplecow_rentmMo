'use client';
import React, { useState } from "react";
import CarListing from "../pageComponents/CarListingCard";
import Map from "../pageComponents/MapListing";
import HeroPageSearch from "../pageComponents/HeroPageSearch";
import { BiSearch } from "react-icons/bi";
import { useServiceCarContext } from "../context/ServiceCarContext";
const cars = [
  {
    id: 1,
    title: "Car 1",
    price: 20000,
    image: "/assets/images/testImages/toyotaVios.jpg",
    rating: 4.5,
    totalReviews: 100,
  },
  {
    id: 2,
    title: "Car 2",
    price: 25000,
    image: "/assets/images/testImages/toyotaVios.jpg",
    rating: 4.8,
    totalReviews: 200,
  },
  {
    id: 3,
    title: "Car 2",
    price: 25000,
    image: "/assets/images/testImages/toyotaVios.jpg",
    rating: 4.8,
    totalReviews: 200,
  },
  {
    id: 4,
    title: "Car 2",
    price: 25000,
    image: "/assets/images/testImages/toyotaVios.jpg",
    rating: 4.8,
    totalReviews: 200,
  },
  {
    id: 5,
    title: "Car 2",
    price: 25000,
    image: "/assets/images/testImages/toyotaVios.jpg",
    rating: 4.8,
    totalReviews: 200,
  },
  {
    id: 6,
    title: "Car 2",
    price: 25000,
    image: "/assets/images/testImages/toyotaVios.jpg",
    rating: 4.8,
    totalReviews: 200,
  },
  // Add more cars as needed
];

const CarListingPage = () => {
  const { data, fetchData } = useServiceCarContext();
const [selectedVehicle, setSelectedVehicle] = useState(null);
const handleCardClick = (car: any) => {
  // Call the handleMarkerClick function from MapListing.js
  console.log("dataSERVE ",car)
  setSelectedVehicle(car);
};
  interface ICar {
    id: number;
    title: string;
    price: number;
    image: string;
    rating: number;
    totalReviews: number;
    carAvailability: {
      startDate: Date;
      endDate: Date;
    };
  } 

  if (data && data.length && data[0].carAvailability && data[0].carAvailability.startDate && data[0].carAvailability.endDate && data[0].city) {
  return (
    <div>
      <HeroPageSearch />
      <div className="flex">
        <div
          className="w-1/2 p-4 overflow-y-auto max-h-screen"
          style={{ height: "600px" }}
        >
          {data.map((car: any) => (
            <CarListing key={car.id} car={car} onCardClick={handleCardClick} />
          ))}
        </div>
        <div className="w-1/2 p-4 relative">
          <Map carList={data} cardSelected={selectedVehicle} />
          <button
            className="absolute bottom-4 left-1/2 transform mt-2 -translate-x-1/2 px-4 py-2 text-black flex items-center rounded-full bg-yellow-300"
            style={{ marginBottom: "30px" }}
          >
            <BiSearch className="h-6 w-6 mr-2" />
            Search this area
          </button>
        </div>
      </div>
    </div>
  );
} else {
  return <div>Loading...</div>;
}
};

export default CarListingPage;
