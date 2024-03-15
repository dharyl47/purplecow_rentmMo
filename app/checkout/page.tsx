import React from "react";

// Components
import Navbar from "@/components/common/NavBar";
import PriceRecapCard from "../../components/checkout/PriceRecapCard";
import NavBarMain from "@/components/common/NavBarMain";

const Checkout = () => {
  return (
    <div>
      <div className="bg-black">
        <NavBarMain />
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-[80%] lg:px-8">
        <h1 className="text-4xl mt-5 font-bold">Checkout</h1>

        <div className="my-5">
          <PriceRecapCard />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
