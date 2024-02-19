"use client";

// React
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Custom Components
import CarDetailsHeader from "../components/CarDetailsComponents/CarDetailsHeader";
import CarInformationCard from "../components/CarDetailsComponents/CarInformationCard";
import CarBookingCard from "../components/CarDetailsComponents/CarBookingCard";
import Navbar from "../../components/common/NavBar";
import CarCustomerReviewCard from "../components/CarDetailsComponents/CarCustomerReviewCard";

// Interfaces
// interface CarAvailability {
//   startDate: string;
//   endDate: string;
//   checked: boolean;
// }

// interface features {
//   automaticTransmission: boolean;
//   allWheelDrive: boolean;
//   androidAuto: boolean;
//   appleCarPlay: boolean;
//   auxInput: boolean;
//   backUpCamera: boolean;
//   bikeRack: boolean;
//   converTible: boolean;
//   gps: boolean;
//   petFriendly: boolean;
//   tollPass: boolean;
//   usbCharger: boolean;
// }

// interface CarDetails {
//   _id: string;
//   brand: string;
//   carAvailability: CarAvailability;
//   features: features;
//   carRegistrationNumber: string;
//   description: string;
//   city: string;
//   country: string;
//   email: string;
//   licensePlateNumber: string;
//   mobileNumber: string;
//   model: string;
//   price: string;
//   state: string;
//   street: string;
//   vehiclePhotos: string[];
//   zipCode: string;
//   lat: string;
//   lon: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   ownerId: any;
// }

const CarDetailPage2 = () => {
  // const router = useRouter();
  const searchParams = useSearchParams();
  // const carParam = searchParams.get("car");
  // const [carDetails, setCarDetails] = useState<CarDetails | null>(null);

  // console.log(carParam);

  return (
    <div>
      <div className="bg-black">
        <Navbar />
      </div>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-[80%] lg:px-8">
        <CarDetailsHeader />

        <div className="grid gap-10 items-start lg:grid-cols-2 md:grid-cols-1 sm:lg:grid-cols-1 mt-10">
          <CarInformationCard />
          <CarBookingCard />
        </div>

        <div className="mt-10">
          <CarCustomerReviewCard />
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage2;
