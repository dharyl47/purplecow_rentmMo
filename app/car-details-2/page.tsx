"use client";

// React
import React from "react";

// Custom Components
import CarDetailsHeader from "../components/CarDetailsComponents/CarDetailsHeader";
import CarInformationCard from "../components/CarDetailsComponents/CarInformationCard";
import CarBookingCard from "../components/CarDetailsComponents/CarBookingCard";
import Navbar from "../../components/common/NavBar";
import CarCustomerReviewCard from "../components/CarDetailsComponents/CarCustomerReviewCard";

// Car useContext
import { useServiceCarContext } from "@/contexts/ServiceCarContext";

const CarDetailPage2 = () => {
  const { carDetailsData } = useServiceCarContext();

  return (
    <div>
      <div className="bg-black">
        <Navbar />
      </div>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-[80%] lg:px-8">
        <CarDetailsHeader data={carDetailsData} />

        <div className="grid gap-10 items-start lg:grid-cols-2 md:grid-cols-1 sm:lg:grid-cols-1 mt-10">
          <CarInformationCard data={carDetailsData} />
          <CarBookingCard data={carDetailsData} />
        </div>

        <div className="mt-10">
          <CarCustomerReviewCard />
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage2;
