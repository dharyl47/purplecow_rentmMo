import React from "react";

// Components
import Navbar from "@/components/common/NavBar";
import TabComponent from "@/components/common/TabsComponent";

import BookedCarsSection from "@/components/trips/BookedCarsSection";
import BookedHistorySection from "@/components/trips/BookedHistorySection";

const tabs = [
  {
<<<<<<< HEAD
    title: "Booked Cars",
=======
    title: "Booked Cars ",
>>>>>>> d77d4495682bc7217352ad9399b1406738ec0c9b
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
