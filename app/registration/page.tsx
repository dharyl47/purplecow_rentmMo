import React from "react";

import Image from "next/image";

import RegisterForm from "@/components/auth/RegisterForm";

import RentMoLOGO from "@/public/assets/logo/RentMo-logo.svg";
import BgHomepage from "@/public/assets/images/Rent-mo-hero-bg.png";

function Registration() {
  return (
    <div
      className="bg-gradient-to-tl bg-cover bg-center w-full min-h-screen py-10 px-0 font-Messina-Sans overflow-x-hidden"
      style={{ backgroundImage: `url(${BgHomepage.src})` }}
    >
      <div className="flex flex-col items-center justify-center">
        <a role="img" href="/">
          <Image
            className="h-20 inline self-center no-select"
            src={RentMoLOGO}
            alt="logo"
          />
        </a>
        <RegisterForm />
      </div>
    </div>
  );
}

export default Registration;
