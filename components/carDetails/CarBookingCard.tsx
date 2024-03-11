"use client";

// React
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
// import Image from "next/image";

// Third Party Components
import { ThemeProvider } from "@material-tailwind/react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { ICar } from "@/types/types";
import { calculateDateDifference } from "@/utils/utils";

// Images & Icons
// import GcashLogo from "@/public/assets/images/gcash.png";
// import { FaCcAmex, FaCcJcb, FaCcMastercard, FaCcVisa } from "react-icons/fa6";

const CarBookingCard: React.FC<ICar> = ({ price }: any) => {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [startTripDate, setStartTripDate] = useState<Date>(new Date());
  const [endTripDate, setEndTripDate] = useState<Date>(new Date());

  const handleCheckoutRide = () => {
    if (location && startTripDate && endTripDate && termsOfUse) {
      const data = {
        location,
        startTripDate,
        endTripDate
      };
      const bookingDetails = encodeURIComponent(JSON.stringify(data));

      router.push(`/checkout?bookingDetails=${bookingDetails}`);
    } else {
      alert(
        "Please fill in all required fields and agree to the terms of use."
      );
    }
  };

  const handleCheckboxChange = (event: any) => {
    setTermsOfUse(event.target.checked);
  };

  const handleStartTripDateChange = (date: Date | null) => {
    if (date) {
      setStartTripDate(date);
    }
  };

  const handleEndTripDateChange = (date: Date | null) => {
    if (date) {
      setEndTripDate(date);
    }
  };

  const computedValue = useMemo(() => {
    const daysDifference = calculateDateDifference(startTripDate, endTripDate);
    return daysDifference;
  }, [startTripDate, endTripDate]);

  return (
    <div className="grid-item w-full  bg-white rounded-lg shadow-md border border-gray-200 py-10 lg:px-10 md:px-10 px-7">
      {/* <h1 className="text-2xl font-bold mb-6 underline underline-offset-2">
        Book Information
      </h1> */}

      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col mb-6">
              <label className="mb-2 font-semibold" htmlFor="outlined-basic">
                Pickup & Return Location
              </label>
              <TextField
                id="outlined-basic"
                label="Pickup & Return Location"
                variant="outlined"
                onChange={event => setLocation(event.target.value)}
                size="small"
              />
            </div>

            <div className="flex flex-col mb-6">
              <label className="mb-2 font-semibold" htmlFor="startTrip">
                Start Trip
              </label>
              <DateTimePicker
                label="Start Trip"
                slotProps={{ textField: { size: "small" } }}
                className="w-full"
                onChange={handleStartTripDateChange}
                minDate={new Date()}
              />
            </div>
            <div className="flex flex-col mb-6">
              <label className="mb-2 font-semibold" htmlFor="endTrip">
                End Trip
              </label>
              <DateTimePicker
                label="End Trip"
                slotProps={{ textField: { size: "small" } }}
                className="w-full"
                onChange={handleEndTripDateChange}
                minDate={new Date()}
              />
            </div>
          </div>
        </LocalizationProvider>
      </ThemeProvider>

      <hr className="my-7" />

      <h1 className="text-2xl font-bold mb-6 underline underline-offset-2">
        Payment
      </h1>

      <div className="grid grid-cols-2 gap-4 box-with-shadow w-full">
        <div className="flex items-center">
          <div className="ml-2">
            <p className="font">
              ₱ {price} x {computedValue} day
            </p>
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <div className="ml-2">
            <p className="font-bold">₱ {price * computedValue}</p>
          </div>
        </div>
        <div className="flex items-center ">
          <div className="ml-2">
            <p className="font">Delivery Fee</p>
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <div className="ml-2">
            <p className="font-bold">₱ 200</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="ml-2">
            <p className="font">Platform Fee</p>
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <div className="ml-2">
            <p className="font-bold">₱ 50</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="ml-2">
            <p className="font-bold">Total</p>
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <div className="ml-2">
            <p className="font-bold">₱ {price * computedValue + 250}</p>
          </div>
        </div>
      </div>

      <hr className="my-7" />

      {/* <h1 className="text-2xl font-bold mb-6 underline underline-offset-2">
        Payment Method
      </h1> */}

      <div className="grid grid-cols-2 gap-4 box-with-shadow w-full">
        {/* <div className="flex items-center ml-2">
          <input type="radio" id="gcash" name="paymentMethod" value="gcash" />
          <label htmlFor="gcash" className="ml-2">
            Gcash
          </label>
        </div>
        <div className="flex items-center ml-auto">
          <Image
            src={GcashLogo}
            alt="Gcash Logo"
            width={100}
            height={100}
            className="ml-2"
          />
        </div>

        <div className="flex items-center ml-2">
          <input
            type="radio"
            id="creditCard"
            name="paymentMethod"
            value="creditCard"
          />
          <label htmlFor="creditCard" className="ml-2">
            Credit/Debit Card Payments
          </label>
        </div>
        <div className="flex items-center ml-auto">
          <FaCcVisa className="ml-2" />
          <FaCcMastercard className="ml-2" />
          <FaCcJcb className="ml-2" />
          <FaCcAmex className="ml-2" />
        </div> */}

        {/* <hr className="col-span-2 my-4 border-t" /> */}

        <div className="flex justify-center col-span-2">
          <button
            className="w-full bg-yellow-300 text-black rounded-lg py-3 px-6 font-bold hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300"
            onClick={handleCheckoutRide}
          >
            Book This Ride
          </button>
        </div>
        <div className="flex items-center justify-center col-span-2 mb-5">
          <input
            type="checkbox"
            id="termsCheckbox"
            name="termsCheckbox"
            checked={termsOfUse}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="termsCheckbox" className="ml-2 text-gray-600">
            By submitting this form, I agree to the Terms of Use
          </label>
        </div>
      </div>
    </div>
  );
};

export default CarBookingCard;
