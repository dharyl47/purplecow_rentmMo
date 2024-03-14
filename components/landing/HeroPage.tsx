"use client";

import React from "react";
import BgHomepage from "@/public/assets/images/Rent-mo-hero-bg.png";

// Components
import Navbar from "@/components/common/NavBar";
import SearchHero from "@/components/search/SearchHero";

import { useServiceCarContext } from "../../contexts/ServiceCarContext";
import { useRouter } from "next/navigation";

// Types
import { SearchFormData } from "@/types/searchCar";
import NavBarMain from "../common/NavBarMain/NavBar";

const HeroPage: React.FC = () => {
  const router = useRouter();

  const { setSearchLoading } = useServiceCarContext();

  const handleFindRide = async (searchFormData: SearchFormData) => {
    await setSearchLoading(true);
    const encodedSearch = encodeURIComponent(JSON.stringify(searchFormData));

    await router.push(`/search?data=${encodedSearch}`);
  };

  return (
    <div
      className="flex flex-col bg-cover pb-12 min-h-screen"
      style={{
        backgroundImage: `url(${BgHomepage.src})`,
        width: "100%",
        height: "100%"
      }}
    >
      {/* <NavBarMain /> */}
      <Navbar />
      <div className="container mx-auto flex flex-col items-center lg:pt-12 xl:pt-32 pt-6 ">
        <div className="w-11/12 2xl:w-full sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl 2xl:text-6xl text-center text-white font-dark900 leading-5 md:leading-10">
            Jump-Start Your Next
            <span className="text-yellow"> Adventure</span>
          </h1>
          <p className="mt-5 sm:mt-5 lg:w-full text-white font-normal text-center md:text-base lg:text-2xl text-base">
            Need a ride for your trip? Get the wheels you need in a matter of
            minutes right here!
          </p>
        </div>
        <SearchHero onFindRide={handleFindRide} />
      </div>
    </div>
  );
};

export default HeroPage;
