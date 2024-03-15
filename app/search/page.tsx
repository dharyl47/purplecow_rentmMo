"use client";

// React
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// React Icons
import { TbListTree } from "react-icons/tb";
import { FaMapMarkedAlt } from "react-icons/fa";

// Page Components
import Map from "../../components/search/MapListing";
import CarListingCard from "@/components/cards1/CarListingCard";
import HeroPageSearch from "../../components/landing/HeroPageSearch";

// Context Api
import { useAuth } from "@/contexts/AuthProvider";
import { useServiceCarContext } from "@/contexts/ServiceCarContext";

const CarListingPage = () => {
  const { user } = useAuth();
  const currentUser: any = user;

  const { data, searchListing, setSearchFormData } = useServiceCarContext();

  const getParams = useSearchParams();
  const encodedSearchData = getParams.get("data");

  // useStates
  const [showMap, setShowMap] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  const handleCardClick = (car: any) => {
    setSelectedVehicle(car);
    setShowMap(true);
  };
  const toggleMapVisible = () => {
    setShowMap(prevState => {
      return !prevState;
    });
  };

  useEffect(() => {
    if (encodedSearchData) {
      try {
        const parsedSearchData = JSON.parse(encodedSearchData);

        const search = {
          startDate: new Date(parsedSearchData.startDate),
          endDate: new Date(parsedSearchData.endDate),
          location: parsedSearchData.location,
          endTime: "",
          startTime: ""
        };

        const parsedDataWithUser = {
          ...parsedSearchData,
          userId: currentUser._id
        };

        searchListing(parsedDataWithUser);
        setSearchFormData(search);
      } catch (error) {
        console.error("Error parsing search data:", error);
      }
    }
  }, [encodedSearchData]);

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
        <div
          className={`hero-page-search-listing w-1/2 px-5 py-2 overflow-y-auto max-h-screen ${
            showMap && isMobile ? "hidden" : "" // Hide if showMap is true
          }`}
          style={{ height: "650px" }}
        >
          <h1 className="text-2xl my-2 font-bold mb-7">
            {data.length} Cars Available
          </h1>
          {data.length === 0 ? (
            <div className="h-full flex justify-center items-center">
              <p>Sorry, there are currently no cars available in this area.</p>
            </div>
          ) : (
            data.map((car: any) => (
              <CarListingCard
                key={car._id}
                car={car}
                onCardClick={handleCardClick}
              />
            ))
          )}
        </div>

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
