"use client";

import React from "react";

// Components
import Navbar from "@/components/common/NavBar";
import TabComponent from "@/components/common/TabsComponent";

import BookedCarsSection from "@/components/trips/BookedCarsSection";
import BookedHistorySection from "@/components/trips/BookedHistorySection";

import ProtectedRoutes from "@/utils/hoc/ProtectedRoutes";
import NavBarMain from "@/components/common/NavBarMain/NavBar";

const tabs = [
  {
    title: "Booked Cars ",
    content: <BookedCarsSection />
  },
  {
    title: "History",
    content: <BookedHistorySection />
  }
];

const Trips = () => {
  return (
    <div>
      <div className="bg-black">
        <NavBarMain />
      </div>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-[90%] lg:px-8">
        <TabComponent tabs={tabs} />
      </div>
    </div>
  );
};

export default ProtectedRoutes(Trips);
