'use client';
import React, { useEffect, useState } from "react";
import CarListing from "../pageComponents/CarListingCard";
import Map from "../pageComponents/MapListing";
import HeroPageSearch from "../pageComponents/HeroPageSearch";
import { BiSearch } from "react-icons/bi";
import { useServiceCarContext } from "../context/ServiceCarContext";
import { TbListTree } from "react-icons/tb";
import { FaMapMarkedAlt } from "react-icons/fa";
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
  const [showMap, setShowMap] = useState(true); // State for toggling map visibility
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const handleCardClick = (car: any) => {
    // Call the handleMarkerClick function from MapListing.js
    console.log("dataSERVE ",car)
    setSelectedVehicle(car);
};
const toggleMapVisible = () => {
  setShowMap((prevState) => !prevState);
};

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 767);
  };
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
  }, []);

  return (
    <div>
      <HeroPageSearch />
      <div className="flex">
        <div className={`hero-page-search-listing w-1/2 p-4 overflow-y-auto max-h-screen ${
            showMap && isMobile ? "hidden" : "" // Hide if showMap is true
          }`} style={{ height: "600px" }}>
          {data.map((car: any) => (
            <CarListing key={car.id} car={car} onCardClick={handleCardClick} />
          ))}
        </div>
        <div className={`hero-page-search-map w-1/2 p-4 relative ${
            !showMap || !isMobile ? "" : "hidden" // Hide if showMap is false
          }`}>
          <Map carList={data} cardSelected={selectedVehicle} />
          <button
            className="search-this-area absolute bottom-4 left-1/2 transform mt-2 -translate-x-1/2 px-4 py-2 text-black flex items-center rounded-full bg-yellow-300"
            style={{ marginBottom: "30px" }}
          >
            <BiSearch className="h-6 w-6 mr-2" />
            Search this area
          </button>
        </div>
      </div>
      <button className="flex w-full justify-center fixed bottom-4 map-listing-mob-toggle items-center"
              onClick={toggleMapVisible} >
        <span className="text-yellow-300 bg-black rounded-full px-5 py-3 flex">
          {showMap ? (
            <>
              <TbListTree className="h-6 w-6 mr-2" />
              Show Listing
            </>
          ) : (
            <>
              <FaMapMarkedAlt className="h-5 w-5 mr-2" />
              Show Map
            </>
          )}
        </span>
      </button>
    </div>
  );
};

export default CarListingPage;
