'use client';
import React from "react";
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
  return (
    <div>
      <HeroPageSearch />
      <div className="flex">
        <div
          className="w-1/2 p-4 overflow-y-auto max-h-screen"
          style={{ height: "600px" }}
        >
          {data.map((car: any) => (
            <CarListing key={car.id} car={car} />
          ))}
        </div>
        <div className="w-1/2 p-4 relative">
          <Map />
          <button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 text-black flex items-center rounded-full bg-yellow-300"
            style={{ marginBottom: "30px" }}
          >
            <BiSearch className="h-6 w-6 mr-2" />
            Search this area
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarListingPage;
