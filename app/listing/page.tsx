import React from "react";

import Navbar from "../../components/common/NavBar";

import ListingStepper from "@/components/hosting/ListingStepperHosting";
// import StepsMainContainer from "@/components/steps/StepsMainContainer";

export default function page() {
  return (
    <>
      <div className="flex flex-col w-full h-fit pb-20 bg-cover bg-no-repeat font-Messina-Sans">
        <Navbar />
        <div className="absolute w-full h-72 bg-gradient-to-br from-gray-700 to-gray-900 -z-10"></div>
        <div className="xl:w-3/5 w-3/4 h-full flex items-center justify-center self-center">
          <ListingStepper />
        </div>
      </div>
    </>
  );
}
