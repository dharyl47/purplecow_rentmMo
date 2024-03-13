"use client";

// React
import React, { useState } from "react";
import Image from "next/image";

// Third Party Components
import { Modal } from "react-responsive-modal";

// Custom Components
import ProfileCardText from "./ProfileCardText";
import UpdateProfile from "../../app/forms/UpdateProfileForm";
//import ProfileCardText from './ProfileCardText';

// Styles And Images
import "react-responsive-modal/styles.css";
import avatar from "@/public/assets/logo/avatar-logo.png";
import badge from "@/public/assets/logo/icons8-verified-badge.png";
import phoneIcon from "@/public/assets/logo/icons8-phone.png";
import emailIcon from "@/public/assets/logo/icons8-email.png";
import professionIcon from "@/public/assets/logo/icons8-portfolio.png";
import languageIcon from "@/public/assets/logo/icons8-language.png";

// UseContext
// import { useUserContext } from "../context/UserContext";

// Hooks
// import { useUser } from "../hooks/useUser";
import { useAuth } from "@/contexts/AuthProvider";

const ProfileCard = () => {
  const [open, setOpen] = useState(false);
  // const [data, setData] = useState(initialUserProfile);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const { user } = useAuth();
  const userData: any = user;

  const reviews = "0 reviews";
  const userName = `${userData.firstName + " " + userData.lastName}`;
  const yearJoined = `${user?.createdAt?.split("-")[0]}`;
  const profession = userData.profession ? `${userData.profession}` : "Unknown"; //
  const email = `${userData.email}`;
  const location =
    userData.unitAddress || userData.city || userData.state || userData.country
      ? `${
          userData.unitAddress +
          ", " +
          userData.city +
          ", " +
          userData.state +
          ", " +
          userData.country
        }`
      : "No address provided";
  const language = userData.language ? `${userData.language}` : "Unknown"; //
  const phoneNumber = `${userData.phoneNumber}`;
  // const isLicensed = userData.isLicensed
  //   ? "Licensed to Drive"
  //   : "Not Licensed to Drive";
  // const isVerified = userData.isVerified ? "Verified" : "Not Verified";
  const badges = userData.badge ? userData.badge : "No Badge to Display";

  return (
    <>
      <div className="border border-black self-start flex flex-col w-full lg:w-fit h-fit  bg-white shadow-searchbox rounded-lg text-gray-900 pt-10 mt-10 2xl:hover:scale-[102%] transition-all">
        <div className="lg:hidden flex flex-col h-fit w-full sm:px-10 px-2 items-center mb-5">
          <h1 className="text-3xl font-bold text-center">{userName}</h1>
          <p className=" text-sm">Joined {yearJoined}</p>
        </div>
        <div className=" self-center overflow-hidden flex justify-center w-32 h-32 rounded-full shadow-xl">
          <Image
            className="object-cover select-none w-40"
            src={avatar}
            alt="logo"
          />
        </div>
        <button
          onClick={onOpenModal}
          className="self-center font-bold text-yellow300 hover:text-yellow transition-colors mt-4"
        >
          Update Profile
        </button>
        <div className="flex flex-col w-full lg:w-96 h-fit sm:px-10 px-2 py-5 gap-2 text-sm overflow-hidden">
          <ProfileCardText image={phoneIcon} text={phoneNumber} />
          <ProfileCardText image={emailIcon} text={email} />
          <ProfileCardText image={professionIcon} text={profession} />
          <ProfileCardText image={languageIcon} text={language} />
          {/* <ProfileCardText
            image={"@/public/assets/logo/icons8-house.png"}
            text={"Test"}
          /> */}
          {/* <ProfileCardText
            image="@/public/assets/logo/icons8-star.png"
            text={reviews}
          /> */}

          {/* <ProfileCardText
            image={"@/public/assets/logo/icons8-driver-license.png"}
            text={isLicensed}
          />
          <ProfileCardText
            image={"@/public/assets/logo/icons8-verified.png"}
            text={isVerified}
          /> */}

          <span className="self-center my-5 w-full h-[2px] bg-gray-500"></span>
          <div className="flex items-center justify-center w-full  gap-1">
            <Image className="w-8" src={badge} alt="badge" />
            <h1 className="font-bold no-select">Badges</h1>
          </div>
          <div className="flex items-center justify-center w-full mt-5">
            <h1>{badges}</h1>
          </div>
          <div className="text-xs text-center my-5">
            <p className="font-regular text-gray-700">
              {" "}
              <a
                href="#learn-more"
                className="font-semibold text-gray-900 hover:text-yellow-500"
              >
                Learn more
              </a>{" "}
              about how badges can help you be a RentMo rockstar and can help
              making RentMo more secure against fraudulent listers.
            </p>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <UpdateProfile onClose={onCloseModal} />
      </Modal>
    </>
  );
};

export default ProfileCard;
