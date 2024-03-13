import React from "react";
import Image from "next/image";

import RentMoLOGO from "@/public/assets/logo/RentMo-logo.svg";
import BgHomepage from "@/public/assets/images/Rent-mo-hero-bg.png";

import LoginForm from "@/components/auth/LoginForm";

function Login() {
  return (
    <div
      className="bg-gradient-to-tl bg-cover bg-center w-full min-h-screen py-10 px-0 font-Messina-Sans overflow-x-hidden"
      style={{ backgroundImage: `url(${BgHomepage.src})` }}
    >
      <div className="flex flex-col items-center justify-center">
        <a role="img" href="/">
          <Image
            className="inline self-center no-select"
            src={RentMoLOGO}
            alt="logo"
          />
        </a>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
