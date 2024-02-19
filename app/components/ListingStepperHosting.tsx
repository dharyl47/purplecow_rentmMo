"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PersonalInfoForm from "../forms/PersonalInfoForm";
import ListingInfoForm from "../forms/ListingInfoForm";
import BillingInfoForm from "../forms/BillingInfoForm";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import { BsPersonFill, BsCreditCardFill, BsCarFrontFill } from "react-icons/bs";

import { Alert, LinearProgress } from "@mui/material";
import { useUser } from "../hooks/useUser";

export const initialInfoState = (user: any) => ({
  brand: "",
  carAvailability: {
    startDate: new Date(),
    endDate: new Date(),
    checked: false,
  },
  carRegistrationNumber: "",
  city: "",
  country: "",
  email: "",
  licensePlateNumber: "",
  mobileNumber: "",
  model: "",
  price: 0,
  state: "",
  street: "",
  vehiclePhotos: [],
  zipCode: "",
  lat: "",
  lon: "",
  street1: "",
  street2: "",
  county: "",
  description: "",
  cardNumber: "",
  cardExpiration: "",
  securityCode: "",
  reviews: {
    name: "",
    date: new Date(),
    starRating: "",
    feedback: "",
  },
  features: {
    automaticTransmission: false,
    allWheelDrive: false,
    androidAuto: false,
    appleCarPlay: false,
    auxInput: false,
    backUpCamera: false,
    bikeRack: false,
    converTible: false,
    gps: false,
    petFriendly: false,
    tollPass: false,
    usbCharger: false,
  },
  ownerId: user.id,
});

export default function ListingStepper() {
  const store = useUser();
  const user: any = store?.user || {};

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () =>
    (!isFirstStep && setIsComplete(true)) || setActiveStep((cur) => cur - 1);

  const [listingInfo, setListingInfo] = useState(() => initialInfoState(user));

  const featureChecker = [
    "automaticTransmission",
    "allWheelDrive",
    "androidAuto",
    "appleCarPlay",
    "auxInput",
    "backUpCamera",
    "bikeRack",
    "converTible",
    "gps",
    "petFriendly",
    "tollPass",
    "usbCharger",
  ];

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target;

    if (name === "startDate" || name === "endDate") {
      setListingInfo({
        ...listingInfo,
        carAvailability: {
          ...listingInfo.carAvailability,
          [name]: new Date(value), // Convert the string to a Date object
        },
      });
    } else if (name === "isAlways") {
      setListingInfo({
        ...listingInfo,
        carAvailability: {
          ...listingInfo.carAvailability,
          checked: checked,
        },
      });
    } else if (featureChecker.includes(name)) {
      setListingInfo({
        ...listingInfo,
        features: {
          ...listingInfo.features,
          [name]: checked,
        },
      });
    } else {
      setListingInfo({ ...listingInfo, [name]: value });
    }
  };

  const handleChangeUpdate = (
    x: any,
    y: any,
    c: any,
    s: any,
    ct: any,
    s1: any,
    s2: any,
    zc: any
  ) => {
    setListingInfo({
      ...listingInfo,
      lat: x,
      lon: y,
      city: c,
      state: s,
      country: ct,
      street: s1 ? s1 : s2,
      street1: s1,
      street2: s2,
      zipCode: zc,
    });
  };

  // const handleChangeUpdates = (b: any, m: any, lp: any, cr: any, dc: any) => {
  //   setListingInfo({
  //     ...listingInfo,
  //     brand: b,
  //     model: m,
  //     licensePlateNumber: lp,
  //     carRegistrationNumber: cr,
  //     description: dc,
  //   });
  // };

  const handleChangeLatAndLon = (lat: string, lon: string) => {
    setListingInfo({ ...listingInfo, lat, lon });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    console.log(listingInfo);

    if (!isLastStep) {
      handleNext();

      return;
    }

    try {
      setIsLoading(true);

      // Ensure the vehiclePhotos field matches the expected structure (array of strings)
      const formattedListingInfo = {
        ...listingInfo,
        vehiclePhotos: listingInfo.vehiclePhotos.map((photo: any) =>
          typeof photo === "string" ? photo : photo.name
        ),
      };

      const response = await axios.post("/api/listing", formattedListingInfo, {
        headers: {
          "Content-Type": "application/json", // Set proper content type for JSON
        },
      });

      window.location.href = "profile";
    } catch (error) {
      setIsLoading(false);
      setIsComplete(false);
      console.log(error);
    }
  };

  const renderStepContent = () => {
    return (
      <>
        <div className={`step-${activeStep}`}>
          {activeStep === 0 && (
            <div>
              <PersonalInfoForm
                handleChange={handleChange}
                handleChangeUpdate={handleChangeUpdate}
                personalInfo={listingInfo}
                handleChangeLatAndLon={handleChangeLatAndLon}
              />
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <ListingInfoForm
                handleChange={handleChange}
                // handleChangeUpdates={handleChangeUpdates}
                listingInfo={listingInfo}
              />
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <BillingInfoForm
                handleChange={handleChange}
                billingInfo={listingInfo}
              />
            </div>
          )}
        </div>
      </>
    );
  };

  useEffect(() => {
    if (Object.keys(user).length === 0 && user.constructor === Object) {
      window.location.href = "login";
    }
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        // onSubmit={handleSubmit}
        className="flex flex-col min-h-[720px] self-center w-full bg-gray-100 px-4 py-10 sm:p-12 shadow-searchbox rounded-lg mt-5 m-2 justify-between"
      >
        <div>
          <h1
            tabIndex={0}
            role="heading"
            aria-label="profile information"
            className="focus:outline-none text-3xl font-bold text-gray-900"
          >
            List Your Vehicle
          </h1>
          <p
            role="contentinfo"
            className=" focus:outline-none text-sm font-light leading-tight text-gray-600 mt-4"
          >
            Fill in the data for the listing. It will take a couple of minutes.{" "}
            <br />
          </p>
          <div className="w-full px-2 pt-5 flex flex-col ">
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
            >
              <Step
                onClick={() => setActiveStep(0)}
                className="flex items-center justify-center cursor-pointer"
              >
                <BsPersonFill className="h-5 w-5 rounded-full" />
              </Step>
              <Step
                onClick={() => setActiveStep(1)}
                className="flex items-center justify-center cursor-pointer"
              >
                <BsCarFrontFill className="h-5 w-5" />
              </Step>
              <Step
                onClick={() => setActiveStep(2)}
                className="flex items-center justify-center cursor-pointer"
              >
                <BsCreditCardFill className="h-5 w-5" />
              </Step>
            </Stepper>
            <div className="my-10 w-full text-center">
              <Typography className="font-semibold font-Messina-Sans text-center">
                {activeStep == 0 ? "Personal Information" : ""}
                {activeStep == 1 ? "Listing Information" : ""}
                {activeStep == 2 ? "Billing Information" : ""}
              </Typography>
            </div>
          </div>
        </div>
        {renderStepContent()}
        <div
          className={`w-full sm:mb-0 mb-2 transition-transform duration-1000 ${
            isComplete ? "hidden scale-y-0 " : "block scale-y-100 "
          }`}
        >
          <Alert severity="warning">
            Please fill the necessary information -{" "}
            <strong>Check all steps!</strong>
          </Alert>
        </div>
        {isLoading && <LinearProgress color="inherit" />}
        <div className="border-t-2 border-gray-200 h-full block items-end">
          <div className="flex pt-3">
            <button
              type="button"
              onClick={handlePrev}
              className="rounded-full px-4 py-2 bg-gray-200 ring-gray-400 disabled:hidden hover:shadow-md transition-shadow"
              disabled={isFirstStep}
            >
              {"Back"}
            </button>
            <div className="flex flex-auto" />
            <button
              hidden={activeStep == 2}
              type="button"
              onClick={handleNext}
              className="rounded-full px-4 py-2 bg-yellow-500 hover:shadow-md transition-shadow text-white"
            >
              Next
            </button>

            <button
              disabled={isLoading}
              hidden={activeStep < 2}
              type="submit"
              className="rounded-full px-4 py-2 bg-yellow-500 hover:shadow-md transition-shadow"
            >
              Finish
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
