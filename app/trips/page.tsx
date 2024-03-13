import React from "react";

// Components
import Navbar from "@/components/common/NavBar";
import TabComponent from "@/components/common/TabsComponent";

import BookedCarsSection from "@/components/trips/BookedCarsSection";
import BookedHistorySection from "@/components/trips/BookedHistorySection";

const tabs = [
  {
<<<<<<< HEAD
    title: "Booked Cars ",
=======
    title: "Booked Cars",
>>>>>>> 105e59c (03-13-2024)
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
        <Navbar />
      </div>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-[90%] lg:px-8">
        <TabComponent tabs={tabs} />
      </div>
    </div>
  );
};

export default Trips;
