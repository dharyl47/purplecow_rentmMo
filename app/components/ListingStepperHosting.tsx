'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonalInfoForm from '../forms/PersonalInfoForm';
import ListingInfoForm from '../forms/ListingInfoForm';
import BillingInfoForm from '../forms/BillingInfoForm';
import { Stepper, Step, Typography } from '@material-tailwind/react';
import { BsPersonFill, BsCreditCardFill, BsCarFrontFill } from 'react-icons/bs';

import { Alert, LinearProgress } from '@mui/material';

export const initialInfoState = {
  brand: "",
  carAvailability: {
    startDate: new Date(),
    endDate: new Date(),
    checked: false
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
  reviews: {
		name: "",
		date: new Date(),
		starRating: "",
		feedback: ""
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
		usbCharger: false
	}
};
export default function ListingStepper() {
	const [activeStep, setActiveStep] = React.useState(0);
	const [isLastStep, setIsLastStep] = React.useState(false);
	const [isFirstStep, setIsFirstStep] = React.useState(false);
	const [isComplete, setIsComplete] = React.useState(true);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
	const handlePrev = () => (!isFirstStep && setIsComplete(true)) || setActiveStep((cur) => cur - 1);

	const [listingInfo, setListingInfo] = useState(initialInfoState);

	// const handleChange = (e: any) => {
  //   if (e.target.name === "startDate" || e.target.name === "endDate") {
  //    setListingInfo({
  //      ...listingInfo,
  //      carAvailability: {
  //        ...listingInfo.carAvailability,
  //        [e.target.name]: new Date(e.target.value), // Convert the string to a Date object
  //      },
  //    });
  //   } else {
  //     setListingInfo({ ...listingInfo, [e.target.name]: e.target.value });
  //   }
  // };
  const handleChange = (e: any) => {
    if (e.target.name === "startDate" || e.target.name === "endDate") {
      setListingInfo({
        ...listingInfo,
        carAvailability: {
          ...listingInfo.carAvailability,
          [e.target.name]: new Date(e.target.value), // Convert the string to a Date object
        },
      });
    } else if (e.target.name === "checked") {
      setListingInfo({
        ...listingInfo,
        carAvailability: {
          ...listingInfo.carAvailability,
          checked: e.target.checked,
        },
      });
    } else {
      setListingInfo({ ...listingInfo, [e.target.name]: e.target.value });
    }
  };



const handleChangeUpdate = (x: any, y: any, c: any, s: any, ct: any, s1: any, s2: any, zc: any,) => {
  setListingInfo({
    ...listingInfo,
    lat: x,
    lon: y,
    city: c,
    state: s,
    country: ct,
    street1: s1,
    street2: s2,
    zipCode: zc,
  });
};
const handleChangeUpdates = (b: any, m: any, lp: any, cr: any, dc: any) => {
    setListingInfo({
      ...listingInfo,
      brand: b,
      model: m,
      licensePlateNumber: lp,
      carRegistrationNumber: cr,
      description: dc,
    });
  };
  



	const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Ensure the vehiclePhotos field matches the expected structure (array of strings)
      const formattedListingInfo = {
        ...listingInfo,
        vehiclePhotos: listingInfo.vehiclePhotos.map((photo: any) =>
          typeof photo === "string" ? photo : photo.name
        ),
      };

      console.log(formattedListingInfo);

      const response = await axios.post("/api/listing", formattedListingInfo, {
        headers: {
          "Content-Type": "application/json", // Set proper content type for JSON
        },
      });

      console.log(response.data);
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
              />
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <ListingInfoForm
                handleChange={handleChange}
                handleChangeUpdates={handleChangeUpdates}
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
                className=" cursor-pointer"
              >
                <BsPersonFill className="h-5 w-5 rounded-full" />
              </Step>
              <Step
                onClick={() => setActiveStep(1)}
                className=" cursor-pointer"
              >
                <BsCarFrontFill className="h-5 w-5" />
              </Step>
              <Step
                onClick={() => setActiveStep(2)}
                className=" cursor-pointer"
              >
                <BsCreditCardFill className="h-5 w-5" />
              </Step>
            </Stepper>
            <div className="mt-5 w-max text-center">
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
