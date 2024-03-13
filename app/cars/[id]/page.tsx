"use client";

import Navbar from "@/components/common/NavBar";
import axios from "axios";

import CarBookingCard from "@/components/carDetails/CarBookingCard";
import CarCustomerReviewCard from "@/components/carDetails/CarCustomerReviewCard";
import CarDetailsHeader from "@/components/carDetails/CarDetailsHeader";
import CarInformationCard from "@/components/carDetails/CarInformationCard";

import { ICar } from "@/types/types";

import { useEffect, useState } from "react";

export default function ViewCar({ params }: any) {
  const [carDetails, setCarDetails] = useState<ICar>({});

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/listing/getOne?id=${params.id}`);

      setCarDetails(response.data.listings[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="bg-black">
        <Navbar />
      </div>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-[90%] lg:px-8">
        <CarDetailsHeader
          brand={carDetails.brand}
          model={carDetails.model}
          price={carDetails.price}
        />

        <div className="grid gap-10 items-start lg:grid-cols-2 md:grid-cols-1 sm:lg:grid-cols-1 mt-10">
          <CarInformationCard
            description={carDetails.description}
            features={carDetails.features}
            owner={carDetails.ownerId}
            lat={carDetails.lat}
            lon={carDetails.lon}
          />
          <CarBookingCard price={carDetails.price} carId={carDetails._id} />
        </div>

        <div className="mt-10">
          <CarCustomerReviewCard />
        </div>
      </div>
    </div>
  );
}
