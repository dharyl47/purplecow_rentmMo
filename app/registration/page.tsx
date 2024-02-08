import React, { useState } from "react";
import BgHomepage from "../assets/images/Rent-mo-hero-bg.png";
import GButton from "./buttons/GButton";
import Image from "next/image";
import RentMoLOGO from "../assets/logo/RentMo-logo.svg";

function Registration() {
  return (
    <div
      className="bg-gradient-to-tl bg-cover bg-center w-full min-h-screen py-10 px-0 font-Messina-Sans overflow-x-hidden"
      style={{ backgroundImage: `url(${BgHomepage.src})` }}
    >
      <div className="flex flex-col items-center justify-center">
        <Image
          className="h-20 inline self-center no-select"
          src={RentMoLOGO}
          alt="logo"
        ></Image>
        <GButton />
      </div>
    </div>
  );
}

export default Registration;
