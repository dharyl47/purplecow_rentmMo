"use client";

// React
import React, { useEffect, useState } from "react";

// Context
import { useServiceCarContext } from "../context/ServiceCarContext";

// React Icons
import { BiSearch } from "react-icons/bi";
import { TbListTree } from "react-icons/tb";
import { FaMapMarkedAlt } from "react-icons/fa";

// Page Components
import Map from "../pageComponents/MapListing";
import CarListing from "../pageComponents/CarListingCard";
import HeroPageSearch from "../pageComponents/HeroPageSearch";

const CarListingPage = () => {
  const { data, searchListing } = useServiceCarContext();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showMap, setShowMap] = useState(true); // State for toggling map visibility
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const handleCardClick = (car: any) => {
    // Call the handleMarkerClick function from MapListing.js
    setSelectedVehicle(car);
    setShowMap(true);
  };
  const toggleMapVisible = () => {
    setShowMap((prevState) => {
      return !prevState;
    });
  };

  useEffect(() => {
    // if (data.length === 0) {
    //   searchListing({
    //     location: "davao city",
    //     startDate: new Date(),
    //     endDate: new Date(),
    //   });
    // }

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
        <div
          className={`hero-page-search-listing w-1/2 p-2 overflow-y-auto max-h-screen ${
            showMap && isMobile ? "hidden" : "" // Hide if showMap is true
          }`}
          style={{ height: "650px" }}
        >
          {data.length === 0 ? (
            <div className="h-full flex justify-center items-center">
              <p>Sorry, there are currently no cars available in this area.</p>
            </div>
          ) : (
            data.map((car: any) => (
              <CarListing
                key={car.id}
                car={car}
                onCardClick={handleCardClick}
              />
            ))
          )}
        </div>

        {/* <div
          className={`hero-page-search-map w-1/2 p-2 relative ${
            !showMap || !isMobile ? "" : "hidden" // Hide if showMap is false
          }`}
        > */}
        <div
          className={`hero-page-search-map w-1/2 p-2 relative ${
            !showMap || !isMobile ? "" : "hidden" // Hide if showMap is false
          }`}
        >
          <Map
            carList={data}
            cardSelected={selectedVehicle}
            onCardClick={handleCardClick}
          />
          {/* <button
            className="search-this-area absolute bottom-4 left-1/2 transform mt-2 -translate-x-1/2 px-4 py-2 text-black flex items-center rounded-full bg-yellow-300"
            style={{ marginBottom: "30px" }}
          >
            <BiSearch className="h-6 w-6 mr-2" />
            Search this area
          </button> */}
        </div>
      </div>
      <button
        className="flex w-full justify-center fixed bottom-4 map-listing-mob-toggle items-center"
        onClick={toggleMapVisible}
      >
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
