"use client";

// React
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Custom Components
import CarDetailsHeader from "../components/CarDetails/CarDetailsHeader";
import CarInformationCard from "../components/CarDetails/CarInformationCard";
import CarBookingCard from "../components/CarDetails/CarBookingCard";
import Navbar from "../../components/common/NavBar";
import CarCustomerReviewCard from "../components/CarDetails/CarCustomerReviewCard";


import { ICar } from "@/types/types";


const CarDetailPage2 = () => {
  const searchParams = useSearchParams();
  const carId = searchParams.get("id");
  const [carDetails, setCarDetails] = useState<ICar>({});


  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/listing/getOneListing?id=${carId}`); 

      setCarDetails(response.data.listings[0])
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div>
      <div className="bg-black">
        <Navbar />
      </div>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-[90%] lg:px-8">
        <CarDetailsHeader brand={carDetails.brand} model={carDetails.model} price={carDetails.price} />

        <div className="grid gap-10 items-start lg:grid-cols-2 md:grid-cols-1 sm:lg:grid-cols-1 mt-10">
          <CarInformationCard description={carDetails.description} features={carDetails.features} owner={carDetails.ownerId} lat={carDetails.lat} lon={carDetails.lon} />
          <CarBookingCard price={carDetails.price}  />
        </div>

        <div className="mt-10">
          <CarCustomerReviewCard  />
        </div>
      </div>
    </div>
  );
};


export default CarDetailPage2;
